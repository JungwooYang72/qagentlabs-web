"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MACHINECARE_DRAFT_KEY, MACHINECARE_INQUIRIES, MACHINECARE_CONTACT, type MachineCareInquiry } from "@/lib/machinecare";

type Service = "company" | "machinecare";
type Message = { sender: "ai" | "user"; text: string };
const greetings = {
  company: "안녕하세요! QAgent Labs입니다. 회사 서비스와 업무 자동화에 대해 무엇을 도와드릴까요?",
  machinecare: "QAgent MachineCare는 현장 운영 준비 중 · 서비스 도입 및 제휴 상담 단계입니다. 아래에서 PC 증상, 기업 PC 관리, 수리점·기사 도입/제휴를 선택해 주세요. 홈페이지에서 실제 PC 진단이나 수리를 실행하지 않습니다.",
};

export function ChatLauncher() {
  return <Button size="lg" onClick={() => window.dispatchEvent(new Event("qagent-open-chat"))}>상담 도우미 열기</Button>;
}

function ChatPanel({ service, isOpen, close, reset }: { service: Service; isOpen: boolean; close: () => void; reset: () => void }) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { if (isOpen) panel.current?.focus(); }, [isOpen]);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([{ sender: "ai", text: greetings[service] }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inquiry, setInquiry] = useState<MachineCareInquiry | null>(null);
  const [review, setReview] = useState(false);
  const [summary, setSummary] = useState("");
  const request = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  async function send(text = input, selected = inquiry) {
    if (!text.trim() || loading || (service === "machinecare" && !selected)) return;
    const next: Message[] = [...messages, { sender: "user", text: text.trim() }];
    setMessages(next); setInput(""); setLoading(true);
    const controller = new AbortController(); request.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service, inquiry: selected,
          messages: next.map(m => ({ role: m.sender === "ai" ? "assistant" : "user", content: m.text })),
        }), signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string") throw new Error("response");
      setMessages(previous => [...previous, { sender: "ai", text: data.reply }]);
    } catch {
      if (!controller.signal.aborted) setMessages(previous => [...previous, { sender: "ai", text: "상담 연결을 완료하지 못했습니다. 잠시 후 다시 시도하거나 회사 문의를 이용해 주세요." }]);
    } finally { if (!controller.signal.aborted) setLoading(false); }
  }

  return (
    <section ref={panel} tabIndex={-1} onKeyDown={event => { if (event.key === "Escape") close(); }} role="dialog" aria-label={service === "machinecare" ? "MachineCare 상담" : "QAgent Labs 회사 상담"} className="flex flex-col w-[min(370px,calc(100vw-24px))] h-[min(640px,calc(100dvh-100px))] min-h-0 overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl">
      <div className="flex items-center justify-between gap-2 bg-slate-900 p-4 text-white">
        <h2 className="text-sm font-bold">{service === "machinecare" ? "MachineCare 상담" : "QAgent Labs 회사 상담"}</h2>
        <div className="flex gap-3 text-xs"><button onClick={reset} disabled={loading} className="underline">새 상담</button><button onClick={close} aria-label="상담 닫기" className="text-xl leading-none">×</button></div>
      </div>
      <p className="border-b border-border px-4 py-3 text-xs text-muted-foreground">현재: {service === "machinecare" ? "MachineCare 전용" : "회사 전체 서비스"} 안내. 페이지를 바꾸면 새 상담 맥락으로 전환되며 이전 서비스의 대화는 전달하지 않습니다.</p>
      <div ref={log} role="log" aria-live="polite" aria-label="상담 대화" className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-3 p-4">
        {messages.map((m, i) => <div key={i} className={"rounded-xl p-3 text-sm leading-relaxed whitespace-pre-wrap break-words " + (m.sender === "user" ? "ml-6 bg-accent text-accent-foreground" : "mr-4 bg-muted text-foreground")}>{m.text}</div>)}
        {loading && <p role="status" className="text-xs text-muted-foreground">답변 준비 중…</p>}
      </div>
      {service === "machinecare" && !inquiry && <div className="grid gap-2 px-4 pb-3" aria-label="상담 시작 선택">
        {(Object.entries(MACHINECARE_INQUIRIES) as [MachineCareInquiry, string][]).map(([key, label]) => <button key={key} disabled={loading} className="rounded-lg border border-border px-3 py-2 text-left text-xs hover:bg-muted" onClick={() => { setInquiry(key); void send(label, key); }}>{key === "pc" ? "PC 증상 상담" : label}</button>)}
      </div>}
      {review ? <div className="border-t border-border p-4 space-y-3">
        <label htmlFor="machinecare-summary" className="block text-xs font-semibold">문의에 전달할 상담 메모를 확인·수정하세요</label>
        <textarea id="machinecare-summary" value={summary} onChange={e => setSummary(e.target.value)} maxLength={1200} rows={3} className="w-full resize-y rounded-md border border-border bg-background p-2 text-sm" />
        <p className="text-xs text-muted-foreground">대화 전체·연락처를 자동 전송하지 않습니다. 이메일 문의 안내에서 내용을 검토하고 메일 앱에서 직접 전송합니다. 현재 콜백 접수는 준비 중입니다.</p>
        <div className="flex flex-wrap gap-2"><Button size="sm" onClick={() => {
          try { sessionStorage.setItem(MACHINECARE_DRAFT_KEY, summary); } catch { /* Contact remains available without browser storage. */ }
          router.push("/contact?service=machinecare&inquiry=" + (inquiry ?? "pc"));
        }}>검토한 메모로 문의하기</Button><Button size="sm" variant="outline" onClick={() => setReview(false)}>취소</Button></div>
      </div> : <>
        <form onSubmit={e => { e.preventDefault(); void send(); }} className="border-t border-border p-3 flex gap-2">
          <input aria-label="상담 질문" value={input} maxLength={2000} onChange={e => setInput(e.target.value)} placeholder={service === "machinecare" && !inquiry ? "먼저 상담 구분을 선택해 주세요" : "질문을 입력하세요"} disabled={loading || (service === "machinecare" && !inquiry)} className="min-w-0 flex-1 rounded-lg border border-border bg-background p-2 text-sm" />
          <Button type="submit" size="sm" disabled={loading || !input.trim()}>전송</Button>
        </form>
        <div className="px-4 pb-4 text-xs flex flex-wrap gap-3">
          {service === "machinecare" ? <button className="text-accent underline" onClick={() => { setSummary(messages.filter(m => m.sender === "user").at(-1)?.text.slice(0, 1000) ?? ""); setReview(true); }}>상담 메모 확인 후 문의</button> : <a className="text-accent underline" href="/contact">회사 문의</a>}
          {service === "machinecare" && <a href={"mailto:" + MACHINECARE_CONTACT.email} className="text-accent underline">이메일 문의</a>}
        </div>
      </>}
    </section>
  );
}

export default function AIChatbot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [generation, setGeneration] = useState(0);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("qagent-open-chat", onOpen);
    return () => window.removeEventListener("qagent-open-chat", onOpen);
  }, []);
  if (pathname !== "/" && pathname !== "/machinecare") return null;
  const service: Service = pathname === "/machinecare" ? "machinecare" : "company";
  return <div data-chat-widget className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-[100]">
    <div hidden={!open}><ChatPanel key={service + generation} service={service} isOpen={open} close={() => setOpen(false)} reset={() => setGeneration(n => n + 1)} /></div>
    {!open && <button onClick={() => setOpen(true)} aria-label="상담 도우미 열기" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-xl">💬 {service === "machinecare" ? "MachineCare 상담" : "무엇이든 물어보세요!"}</button>}
  </div>;
}
