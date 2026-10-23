"use client";
import { useEffect, useRef, useState } from "react";
import MachineCareCallbackForm from "./MachineCareCallbackForm";
import { Button } from "@/components/ui/Button";
import { MACHINECARE_CONTACT, MACHINECARE_DRAFT_KEY, MACHINECARE_INQUIRIES, type MachineCareInquiry } from "@/lib/machinecare";

function EmailInquiry({ initialInquiry }: { initialInquiry: MachineCareInquiry }) {
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const draft = sessionStorage.getItem(MACHINECARE_DRAFT_KEY);
      if (summaryRef.current && draft) summaryRef.current.value = draft.slice(0, 2000);
      sessionStorage.removeItem(MACHINECARE_DRAFT_KEY);
    } catch { /* Email also works without browser storage. */ }
  }, []);
  return <div className="space-y-5">
    <p className="font-semibold text-sm">{MACHINECARE_INQUIRIES[initialInquiry]}</p>
    <p className="text-sm leading-7 text-muted-foreground">현재 온라인 접수 보관·담당자 확인 경로를 점검 중입니다. 전화상담·콜백 요청 접수는 아직 제공하지 않습니다. 챗봇에서 증상을 정리한 뒤 아래 이메일로 문의해 주세요.</p>
    <label className="block text-sm font-medium">이메일에 포함할 상담 메모 (선택)
      <textarea ref={summaryRef} maxLength={2000} rows={6} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background p-3" />
      <span className="mt-2 block text-xs font-normal leading-6 text-muted-foreground">보낼 내용만 직접 검토·수정해 주세요. 대화 전체·연락처를 자동 전송하지 않습니다. 비밀번호나 개인 문서는 입력하지 마세요.</span>
    </label>
    <div className="flex flex-wrap gap-3">
      <Button asChild><a href={"mailto:" + MACHINECARE_CONTACT.email} onClick={event => {
        const subject = "MachineCare · " + MACHINECARE_INQUIRIES[initialInquiry];
        const body = "[문의 경로: QAgentLabs /machinecare]\n[문의 구분: " + MACHINECARE_INQUIRIES[initialInquiry] + "]\n\n" + (summaryRef.current?.value ?? "");
        event.currentTarget.href = "mailto:" + MACHINECARE_CONTACT.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        setNotice("메일 앱에서 내용을 확인한 뒤 직접 전송해 주세요. 이 버튼만으로 문의가 접수되지는 않습니다.");
      }}>검토한 메모로 이메일 작성</a></Button>
      <Button type="button" variant="outline" onClick={() => { if (summaryRef.current) summaryRef.current.value = ""; setNotice("작성을 취소했습니다. 문의를 전송하지 않았습니다."); }}>작성 취소</Button>
    </div>
    <p role="status" aria-live="polite" className="text-sm leading-6">{notice}</p>
    <p className="text-sm leading-7 break-all"><a className="underline text-accent" href={"mailto:" + MACHINECARE_CONTACT.email}>{MACHINECARE_CONTACT.email}</a><br />메일 앱이 열리지 않으면 주소를 복사해 사용 중인 이메일에서 보내주세요.</p>
    <p className="text-sm leading-7 text-muted-foreground">문의만으로 방문이 예약되지 않습니다. 담당 기사가 내용을 확인하고 통화로 증상·상세 주소·기사 일정·비용을 협의한 뒤 방문을 확정합니다. 즉시 연락이나 24시간 상담을 약속하지 않습니다.</p>
  </div>;
}

export default function MachineCareInquiry({ initialInquiry }: { initialInquiry: MachineCareInquiry }) {
  return <MachineCareCallbackForm fallback={<EmailInquiry initialInquiry={initialInquiry} />} />;
}
