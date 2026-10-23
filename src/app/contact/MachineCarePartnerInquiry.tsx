"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CALLBACK_RETENTION_DAYS, parsePartnerInput, type PartnerInput } from "@/lib/machinecare-callback";
import { MACHINECARE_CONTACT } from "@/lib/machinecare";

const fieldLabels = {
  companyName: "업체명", contactName: "담당자", phone: "연락처", location: "소재지",
  cooperationField: "협력 분야", scope: "공급 품목·수리 범위", logistics: "배송·입고 가능 여부",
} as const;
const cooperationLabels = {
  parts: "PC·노트북 부품 공급", repair: "노트북 전문 수리", both: "두 분야 모두",
} as const;

export default function MachineCarePartnerInquiry() {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [draft, setDraft] = useState<PartnerInput | null>(null);
  const [requestId, setRequestId] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/machinecare/callback", { cache: "no-store", signal: controller.signal })
      .then(response => response.ok ? response.json() : null).then(data => setAvailable(data?.available === true))
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, []);

  async function submit() {
    if (!draft || sending) return;
    setSending(true); setNotice("");
    try {
      const response = await fetch("/api/machinecare/callback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, requestId, consent: true }) });
      const data = await response.json();
      if (!response.ok || data.success !== true || typeof data.requestId !== "string") throw new Error("unconfirmed");
      setReceipt(data.requestId);
    } catch { setNotice("협력 문의 저장을 확인하지 못했습니다. 입력 내용은 유지됩니다. 다시 시도하거나 이메일로 문의해 주세요."); }
    finally { setSending(false); }
  }

  if (receipt) return <div role="status" className="space-y-4 text-sm leading-7"><p className="font-semibold">협력업체 문의가 저장되었습니다. 본부에서 내용을 확인한 뒤 연락드립니다.</p><p className="break-all">접수번호: {receipt}</p><p>거래 조건은 개별 협의하며 주문량·독점 거래·수익을 보장하지 않습니다.</p></div>;
  if (available === null) return <p role="status" className="text-sm">협력 문의 접수 상태를 확인하고 있습니다.</p>;

  const emailBody = draft ? ["[MachineCare 부품 공급·노트북 전문 수리 협력 문의]", ...Object.entries(fieldLabels).map(([key, label]) => `${label}: ${key === "cooperationField" ? cooperationLabels[draft.cooperationField] : draft[key as keyof PartnerInput]}`)].join("\n") : "";
  const emailHref = `mailto:${MACHINECARE_CONTACT.email}?subject=${encodeURIComponent("MachineCare 협력업체 문의")}&body=${encodeURIComponent(emailBody)}`;
  return <div className="space-y-5">
    <p className="text-sm leading-7 text-muted-foreground">PC·노트북 부품 공급 또는 노트북 전문 수리 협력을 문의해 주세요. 고객 방문 상담 지역은 협력업체 모집 자격 기준이 아닙니다. 업체 소재지와 배송·입고 가능 여부를 확인해 개별 협의합니다. 주문량·독점 거래·수익을 보장하지 않습니다.</p>
    {!available && <p className="text-sm leading-7 text-muted-foreground">온라인 저장 접수는 현재 이용할 수 없습니다. 내용을 검토한 뒤 이메일 앱에서 직접 전송해 주세요.</p>}
    <form hidden={draft !== null} className="space-y-5" onSubmit={event => {
      event.preventDefault();
      const input = parsePartnerInput({ ...Object.fromEntries(new FormData(event.currentTarget)), inquiryType: "partner" });
      if (!input) { setNotice("필수 정보와 연락처 형식을 확인해 주세요."); return; }
      setDraft(input); setRequestId(crypto.randomUUID()); setNotice("");
    }}>
      <label className="block text-sm font-medium">업체명<input name="companyName" required maxLength={120} autoComplete="organization" className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm font-medium">담당자<input name="contactName" required maxLength={80} autoComplete="name" className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm font-medium">연락처<input name="phone" type="tel" required maxLength={24} autoComplete="tel" className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm font-medium">소재지<input name="location" required maxLength={150} autoComplete="address-level2" className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm font-medium">협력 분야<select name="cooperationField" required defaultValue="" className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3"><option value="" disabled>분야를 선택해 주세요</option>{Object.entries(cooperationLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label className="block text-sm font-medium">공급 품목·수리 범위<textarea name="scope" required maxLength={2000} rows={5} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm font-medium">배송·입고 가능 여부<textarea name="logistics" required maxLength={500} rows={3} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" /></label>
      <div className="rounded-lg border border-border p-4 text-sm leading-7 text-muted-foreground">업체명·담당자·연락처·소재지·협력 분야·공급 품목 또는 수리 범위·배송 및 입고 가능 여부를 본부 접수 확인과 협력 상담에 사용합니다. {available ? `온라인 접수 기록은 접수일로부터 ${CALLBACK_RETENTION_DAYS}일 보관 후 삭제합니다.` : "이메일 문의는 메일 앱에서 직접 전송하며 이 사이트에 접수 기록을 저장하지 않습니다."} 동의를 거부할 수 있으며, 거부하면 이 양식을 이용할 수 없습니다. <Link href="/privacy" className="underline">개인정보 처리 안내</Link><label className="mt-3 flex items-start gap-2 text-foreground"><input type="checkbox" required className="mt-1" />위 정보의 수집·이용에 동의합니다.</label></div>
      <Button type="submit">입력 내용 확인</Button>
    </form>
    {draft && <div className="rounded-lg border border-border p-5 space-y-4"><h3 className="font-semibold">제출할 협력 문의를 확인해 주세요</h3><dl className="space-y-3 text-sm leading-7 break-words">{Object.entries(fieldLabels).map(([key, label]) => <div key={key}><dt className="font-semibold">{label}</dt><dd className="whitespace-pre-wrap">{key === "cooperationField" ? cooperationLabels[draft.cooperationField] : draft[key as keyof PartnerInput]}</dd></div>)}</dl><p className="text-sm leading-7 text-muted-foreground">거래 조건은 개별 협의하며 주문량·독점 거래·수익을 보장하지 않습니다.</p><div className="flex flex-wrap gap-3">{available ? <Button type="button" disabled={sending} onClick={() => void submit()}>{sending ? "저장 확인 중…" : "협력 문의 최종 제출"}</Button> : <Button asChild><a href={emailHref} onClick={() => setNotice("메일 앱에서 내용을 확인한 뒤 직접 전송해 주세요. 이 버튼만으로 접수되지는 않습니다.")}>검토한 내용으로 이메일 작성</a></Button>}<Button type="button" variant="outline" disabled={sending} onClick={() => { setDraft(null); setNotice(""); }}>수정하기</Button></div></div>}
    <p role="status" className="text-sm leading-7">{notice}</p>
  </div>;
}
