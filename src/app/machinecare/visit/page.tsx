import type { Metadata } from "next";
import Link from "next/link";
import content from "@/content/machinecare-visit.json";
import { MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";
import { MACHINECARE_BASE_HOURS, MACHINECARE_VISIT_AREAS } from "@/lib/machinecare";

export const metadata: Metadata = {
  title: "출장 PC 점검 상담 | 지역·비용·진행 방식",
  description: "경기 9개 시와 서울 4개 구의 초기 방문 상담 지역 및 기본 상담·방문 시간 09:00~18:00 안내. 상세 주소·기사 일정·비용은 상담 후 확인합니다.",
  alternates: { canonical: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/visit` },
};

export default function MachineCareVisitPage() {
  return <div lang="ko" className="container-custom max-w-4xl py-12 md:py-20">
    <nav aria-label="현재 위치" className="text-sm text-muted-foreground mb-8"><Link href="/machinecare" className="underline">MachineCare</Link><span aria-hidden="true"> / </span>출장 상담 안내</nav>
    <header><p className="text-sm font-semibold text-accent">현장 운영 준비 중 · 상담 후 가능 범위 확인</p><h1 className="mt-3 text-3xl md:text-4xl font-bold leading-snug tracking-tight break-keep">{content.title}</h1><p className="mt-6 text-base md:text-lg leading-8 break-keep">{content.answer}</p></header>
    <section className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">초기 방문 상담 지역</h2><p className="mt-4 leading-8 break-keep"><strong>경기:</strong> {MACHINECARE_VISIT_AREAS.gyeonggi.join(", ")}</p><p className="mt-2 leading-8 break-keep"><strong>서울:</strong> {MACHINECARE_VISIT_AREAS.seoul.join(", ")}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">해당 시·구에서도 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.</p></section>
    <section className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">기본 상담·방문 시간</h2><p className="mt-4 text-lg font-semibold">{MACHINECARE_BASE_HOURS}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">운영 요일·휴무일은 아직 정해지지 않았습니다. 방문 시간은 상세 주소와 기사 일정을 확인해 협의합니다.</p></section>
    {content.sections.map(([title, items]) => <section key={title as string} className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">{title}</h2><ul className="mt-4 list-disc space-y-3 pl-6 leading-8">{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></section>)}
    <section className="mt-10" aria-labelledby="visit-questions"><h2 id="visit-questions" className="text-2xl font-bold">자주 묻는 질문</h2><div className="mt-5 space-y-3">{content.faq.map(([question, answer]) => <details key={question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold leading-7">{question}</summary><p className="mt-3 text-muted-foreground leading-8">{answer}</p></details>)}</div></section>
    <aside className="mt-10 rounded-xl border border-border bg-muted/30 p-6"><h2 className="text-xl font-bold">상담 목적을 선택해 주세요</h2><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href={MACHINECARE_PC_INQUIRY} className="text-accent underline">PC 점검·수리 상담</Link><Link href="/contact?service=machinecare&inquiry=business" className="text-accent underline">기업 PC 관리 문의</Link><Link href="/machinecare/guides" className="text-accent underline">먼저 증상별 안내 읽기</Link></div><p className="mt-5 text-sm leading-7 text-muted-foreground">운영 안내 갱신일: 2026-10-23. 운영 요일·휴무일과 요금은 확정 전이며 비용은 작업 범위를 정해 사전에 상담합니다.</p></aside>
  </div>;
}
