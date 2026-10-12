"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CALLBACK_RETENTION_DAYS, parseCallbackInput, type CallbackInput } from "@/lib/machinecare-callback";
import { MACHINECARE_DRAFT_KEY } from "@/lib/machinecare";
const fields = [
  ["name", "이름", "text", 80, "name"], ["phone", "연락처", "tel", 24, "tel"],
  ["region", "지역", "text", 100, "address-level2"], ["availableTime", "연락 가능한 시간", "text", 150, "off"],
] as const;
export default function MachineCareCallbackForm({ fallback }: { fallback: React.ReactNode }) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [draft, setDraft] = useState<CallbackInput | null>(null);
  const [requestId, setRequestId] = useState("");
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/machinecare/callback", { cache: "no-store", signal: controller.signal })
      .then(r => r.ok ? r.json() : null).then(data => setAvailable(data?.available === true))
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!available) return;
    try {
      const value = sessionStorage.getItem(MACHINECARE_DRAFT_KEY);
      if (value && summaryRef.current) summaryRef.current.value = value.slice(0, 2000);
      sessionStorage.removeItem(MACHINECARE_DRAFT_KEY);
    } catch { /* Manual entry remains available. */ }
  }, [available]);
  if (available === null) return <p role="status" className="text-sm">상담 요청 접수 상태를 확인하고 있습니다.</p>;
  if (!available) return <>{fallback}</>;
  async function submit() {
    if (!draft || sending) return;
    setSending(true); setError("");
    try {
      const response = await fetch("/api/machinecare/callback", { method: "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...draft, requestId, consent: true }),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true || typeof data.requestId !== "string") throw new Error("unconfirmed");
      setReceipt(data.requestId);
    } catch { setError("접수 저장을 확인하지 못했습니다. 입력 내용은 유지됩니다. 다시 시도하거나 이메일로 문의해 주세요."); }
    finally { setSending(false); }
  }
  if (receipt) return <div role="status" className="space-y-4 text-sm leading-7">
    <p className="font-semibold">상담 요청이 저장되었습니다. 본부에서 확인 후 담당자를 배정합니다.</p>
    <p className="break-all">접수번호: {receipt}</p>
    <p>접수만으로 방문이 예약되지는 않습니다. 담당 기사와 통화해 증상·방문 가능 여부·비용·일정을 확인한 뒤 방문을 확정합니다. 즉시 연락이나 24시간 상담을 약속하지 않습니다.</p>
  </div>;
  return <div className="space-y-5">
    <p className="text-sm leading-7 text-muted-foreground">현장 운영 준비 중입니다. 이름·연락처·지역·연락 가능한 시간·증상 요약을 확인한 뒤 상담을 요청해 주세요. 본부에서 접수를 확인하고 담당자를 수동 배정합니다.</p>
    <form ref={formRef} hidden={draft !== null} className="space-y-5" onSubmit={event => {
      event.preventDefault(); const data = new FormData(event.currentTarget);
      const input = parseCallbackInput(Object.fromEntries(data));
      if (!input) { setError("입력 정보와 연락처 형식을 확인해 주세요."); return; }
      setDraft(input); setRequestId(crypto.randomUUID()); setError("");
    }}>
      {fields.map(([name, label, type, maxLength, autoComplete]) => <label key={name} className="block text-sm font-medium">{label}
        <input name={name} type={type} required maxLength={maxLength} autoComplete={autoComplete} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" />
      </label>)}
      <label className="block text-sm font-medium">증상 요약
        <textarea ref={summaryRef} name="summary" required maxLength={2000} rows={6} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" />
        <span className="mt-2 block text-xs font-normal leading-6 text-muted-foreground">보낼 내용만 검토해 주세요. 비밀번호·개인 문서는 입력하지 마세요. 전체 대화는 자동 첨부하지 않습니다.</span>
      </label>
      <div className="rounded-lg border border-border p-4 text-sm leading-7 text-muted-foreground">
        이름·연락처·지역·연락 가능한 시간·증상 요약을 본부 접수 확인, 담당자 배정과 상담 연락에 사용합니다.
        접수일로부터 {CALLBACK_RETENTION_DAYS}일 보관 후 자동 삭제합니다. 동의를 거부할 수 있으며, 거부하면 콜백 접수를 이용할 수 없습니다. <Link href="/privacy" className="underline">개인정보 처리 안내</Link>
        <label className="mt-3 flex items-start gap-2 text-foreground"><input type="checkbox" name="consent" required className="mt-1" />위 정보의 수집·이용에 동의합니다.</label>
      </div>
      <Button type="submit">입력 내용 확인</Button>
    </form>
    {draft && <div className="rounded-lg border border-border p-5 space-y-4">
      <h3 className="font-semibold">제출할 내용을 확인해 주세요</h3>
      <dl className="space-y-3 text-sm leading-7 break-words">{[...fields.map(([key, label]) => [label, draft[key]]), ["증상 요약", draft.summary]].map(([label, value]) => <div key={label}><dt className="font-semibold">{label}</dt><dd className="whitespace-pre-wrap">{value}</dd></div>)}</dl>
      <p className="text-sm leading-7 text-muted-foreground">아래 최종 제출을 누를 때만 전송됩니다. 방문 예약이 확정되는 것은 아닙니다.</p>
      <div className="flex flex-wrap gap-3"><Button type="button" disabled={sending} onClick={() => void submit()}>{sending ? "저장 확인 중…" : "상담 요청 최종 제출"}</Button><Button type="button" variant="outline" disabled={sending} onClick={() => { setDraft(null); setError(""); }}>수정하기</Button></div>
    </div>}
    <p role="status" className="text-sm leading-7 text-red-600">{error}</p>
    <Button type="button" variant="outline" disabled={sending} onClick={() => { setDraft(null); setError("작성을 취소했습니다. 요청을 제출하지 않았습니다."); formRef.current?.reset(); if (summaryRef.current) summaryRef.current.value = ""; }}>작성 취소</Button>
  </div>;
}
