"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { CallbackRecord, CallbackAssignment } from "@/lib/machinecare-callback";
type Item = { record: CallbackRecord; assignment: CallbackAssignment | null; notification: { accepted: boolean; hqConfirmedAt?: string } | null };
export default function MachineCareRequests() {
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  const [token, setToken] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [operators, setOperators] = useState<{ hq: string; primary: string; backup: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [lookup, setLookup] = useState("");
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  async function call(method = "GET", body?: object) {
    request.current?.abort();
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setNotice("");
    try {
      const url = "/api/admin/machinecare/requests" + (method === "GET" && lookup ? "?id=" + encodeURIComponent(lookup.trim()) : "");
      const response = await fetch(url, { method, headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined, cache: "no-store", signal: controller.signal });
      const data = await response.json();
      if (controller.signal.aborted) return;
      if (!response.ok) { setItems([]); setOperators(null); throw new Error(typeof data.error === "string" ? data.error : "확인 실패"); }
      if (data.items) { setItems(data.items); setOperators(data.operators); }
      if (data.item) setItems(previous => [data.item, ...previous.filter(item => item.record.id !== data.item.record.id)]);
      if (method === "PATCH") setNotice("저장된 처리 결과를 확인했습니다. 방문 일정은 별도로 협의해 주세요.");
    } catch (error) { if (!controller.signal.aborted) setNotice(error instanceof Error ? error.message : "연결 확인이 필요합니다."); }
    finally { if (request.current === controller) setBusy(false); }
  }
  return <div className="container-custom max-w-4xl py-12 space-y-6">
    <h1 className="text-3xl font-bold">MachineCare 본부 접수 확인</h1>
    <p className="text-sm leading-7 text-muted-foreground">본부 전용입니다. 인증키는 이 화면의 메모리에만 유지합니다. 본부가 주담당(동생) 또는 보조담당(본부)에게 수동 배정하고 별도로 전달합니다. 기사별 웹 계정과 자동 알림은 제공하지 않습니다. 담당 기사 개인 전화번호는 공개하지 않습니다. 접수·담당 배정은 방문 예약 확정과 별개입니다.</p>
    <form className="space-y-4" onSubmit={event => { event.preventDefault(); void call(); }}>
      <label className="block text-sm">본부 관리자 인증키<input type="password" value={token} onChange={event => { request.current?.abort(); setBusy(false); setToken(event.target.value); setItems([]); setOperators(null); }} autoComplete="off" required className="mt-2 w-full rounded-md border border-border bg-background p-3" /></label>
      <label className="block text-sm">접수번호로 조회 (선택)<input value={lookup} onChange={event => setLookup(event.target.value)} className="mt-2 w-full rounded-md border border-border bg-background p-3" /></label>
      <div className="flex flex-wrap gap-3"><Button disabled={busy} type="submit">접수 조회</Button><Button disabled={busy || !token} type="button" variant="outline" onClick={() => void call("POST")}>시험 접수 저장·알림 확인</Button><Button type="button" variant="outline" onClick={() => { request.current?.abort(); setBusy(false); setToken(""); setItems([]); setOperators(null); }}>잠금</Button></div>
    </form>
    <p role="status" className="text-sm leading-7">{notice}</p>
    {operators && <div className="text-sm leading-7 break-all"><p>본부: {operators.hq}</p><p>주담당: {operators.primary}</p><p>보조담당: {operators.backup}</p><p>최대 100건을 표시합니다. 이전 접수는 접수번호로 조회해 주세요.</p></div>}
    <div className="space-y-5">{items.map(({ record, assignment, notification }) => <article key={record.id} className="rounded-xl border border-border p-5 space-y-4 text-sm leading-7 break-words">
      <h2 className="font-bold break-all">{record.verification ? "시험 접수 — 고객 연락·배정 금지" : "상담 요청"} · {record.id}</h2>
      <p>{new Date(record.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
      <dl>{[["이름", record.name], ["연락처", record.phone], ["지역", record.region], ["연락 가능한 시간", record.availableTime], ["증상 요약", record.summary]].map(([label, value]) => <div key={label} className="mb-3"><dt className="font-semibold">{label}</dt><dd className="whitespace-pre-wrap">{value}</dd></div>)}</dl>
      <p>본부 알림: {notification?.accepted ? "메일 서비스 발송 접수 확인 · 실제 수신은 본부에서 확인" : "발송 미확인 — 본부에서 접수함을 직접 확인하세요"}</p>
      {record.verification ? <div className="space-y-3"><label className="flex items-start gap-2"><input type="checkbox" checked={confirmed[record.id] ?? false} onChange={event => setConfirmed(previous => ({ ...previous, [record.id]: event.target.checked }))} className="mt-2" />시험 데이터가 본부 화면에 실제 저장·조회되고 본부 수신함의 알림도 직접 확인했습니다.</label><Button type="button" disabled={busy || !confirmed[record.id]} onClick={() => void call("PATCH", { id: record.id, action: "confirm-verification", confirmedReceiptAndNotification: true })}>본부 확인 기록</Button>{notification?.hqConfirmedAt && <p>본부 확인 기록됨 · 공개 접수 전 운영 환경 설정 필요</p>}</div>
      : <div className="space-y-3"><p className="break-all">배정: {assignment ? (assignment.role === "primary" ? "주담당(동생)" : "보조담당(본부)") : "본부 확인 대기 · 미배정"}</p><div className="flex flex-wrap gap-3"><Button type="button" disabled={busy} onClick={() => void call("PATCH", { id: record.id, role: "primary" })}>주담당에게 배정</Button><Button type="button" disabled={busy} variant="outline" onClick={() => void call("PATCH", { id: record.id, role: "backup" })}>보조담당에게 배정</Button></div></div>}
    </article>)}</div>
  </div>;
}
