import type { Metadata } from "next";
import Link from "next/link";
import content from "@/content/machinecare-visit.json";
import { MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";

export const metadata: Metadata = {
  title: "출장 PC 점검 상담 | 지역·비용·진행 방식",
  description: "서울 동부와 경기 일부를 중심으로 준비하는 MachineCare 출장 상담 안내. 실제 방문 가능 여부·비용·일정은 담당자와 협의 후 확정합니다.",
  alternates: { canonical: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/visit` },
};

export default function MachineCareVisitPage() {
  return <div lang="ko" className="container-custom max-w-4xl py-12 md:py-20">
    <nav aria-label="현재 위치" className="text-sm text-muted-foreground mb-8"><Link href="/machinecare" className="underline">MachineCare</Link><span aria-hidden="true"> / </span>출장 상담 안내</nav>
    <header><p className="text-sm font-semibold text-accent">현장 운영 준비 중 · 상담 후 가능 범위 확인</p><h1 className="mt-3 text-3xl md:text-4xl font-bold leading-snug tracking-tight break-keep">{content.title}</h1><p className="mt-6 text-base md:text-lg leading-8 break-keep">{content.answer}</p></header>
    {content.sections.map(([title, items]) => <section key={title as string} className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">{title}</h2><ul className="mt-4 list-disc space-y-3 pl-6 leading-8">{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></section>)}
    <section className="mt-10" aria-labelledby="visit-questions"><h2 id="visit-questions" className="text-2xl font-bold">자주 묻는 질문</h2><div className="mt-5 space-y-3">{content.faq.map(([question, answer]) => <details key={question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold leading-7">{question}</summary><p className="mt-3 text-muted-foreground leading-8">{answer}</p></details>)}</div></section>
    <aside className="mt-10 rounded-xl border border-border bg-muted/30 p-6"><h2 className="text-xl font-bold">상담 목적을 선택해 주세요</h2><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href={MACHINECARE_PC_INQUIRY} className="text-accent underline">PC 점검·수리 상담</Link><Link href="/contact?service=machinecare&inquiry=business" className="text-accent underline">기업 PC 관리 문의</Link><Link href="/machinecare/guides" className="text-accent underline">먼저 증상별 안내 읽기</Link></div><p className="mt-5 text-sm leading-7 text-muted-foreground">안내 확인일: 2026-10-22. 세부 지역·운영 시간·요금이 확정되면 이 페이지를 갱신합니다.</p></aside>
  </div>;
}
