import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import content from "@/content/machinecare-visit.json";
import { COMPANY } from "@/lib/company";
import { MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";
import { MACHINECARE_BASE_HOURS, MACHINECARE_VISIT_AREAS } from "@/lib/machinecare";

export const metadata: Metadata = {
  title: "출장 컴퓨터 점검·수리 | 서비스 지역·비용·방문 안내",
  description: "구리·남양주 등 경기 9개 시와 서울 동부 4개 구의 출장 PC 점검·수리 안내. 예약 전에 결제할 금액을 확인하고, 추가 수리는 최종 결제 총액에 동의하신 뒤 진행합니다.",
  alternates: { canonical: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/visit` },
};

export default function MachineCareVisitPage() {
  return <div lang="ko" className="container-custom max-w-4xl py-12 md:py-20">
    <nav aria-label="현재 위치" className="text-sm text-muted-foreground mb-8"><Link href="/machinecare" className="underline">MachineCare</Link><span aria-hidden="true"> / </span>출장 상담 안내</nav>
    <header><p className="text-sm font-semibold text-accent">출장 PC 점검·수리 서비스 운영 중 · 상담 후 방문 확정</p><h1 className="mt-3 text-3xl md:text-4xl font-bold leading-snug tracking-tight break-keep">{content.title}</h1><p className="mt-6 text-base md:text-lg leading-8 break-keep">{content.answer}</p></header>
    <section aria-labelledby="visit-payment" className="mt-8 rounded-xl border border-border bg-muted/30 p-5 sm:p-7">
      <h2 id="visit-payment" className="text-2xl font-bold">예약 전 출장·수리 요금 확인</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
        <li>방문 예약을 확정하기 전에 적용 지역과 시간, PC 대수, 포함되는 진단·기본 조치 범위, 출장비·부가세 포함 여부를 안내합니다. 추가 수리를 맡기지 않을 때 결제할 금액도 이때 확인할 수 있습니다.</li>
        <li>추가 수리가 필요하면 작업 범위와 기존 방문 요금을 반영한 <strong>최종 결제 총액</strong>을 먼저 안내하고, 고객이 승인한 뒤 작업합니다.</li>
        <li>부품 교체나 데이터 복구는 상태를 확인한 뒤 작업 범위와 최종 결제 총액을 안내하고 고객의 승인을 받습니다.</li>
      </ul>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        <Button size="lg" className="px-3! sm:px-5!" asChild><Link href={MACHINECARE_PC_INQUIRY}>출장 점검·수리 상담 신청</Link></Button>
        <a href={`tel:${COMPANY.phone}`} className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">대표번호 {COMPANY.phone}</a>
      </div>
    </section>
    <section className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">출장 서비스 지역</h2><p className="mt-4 leading-8 break-keep"><strong>경기:</strong> {MACHINECARE_VISIT_AREAS.gyeonggi.join(", ")}</p><p className="mt-2 leading-8 break-keep"><strong>서울:</strong> {MACHINECARE_VISIT_AREAS.seoul.join(", ")}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">해당 시·구에서도 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.</p></section>
    <section className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">기본 상담·방문 시간</h2><p className="mt-4 text-lg font-semibold">{MACHINECARE_BASE_HOURS}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">운영 요일·휴무일은 아직 정해지지 않았습니다. 방문 시간은 상세 주소와 기사 일정을 확인해 협의합니다.</p></section>
    {content.sections.map(([title, items]) => <section key={title as string} className="mt-10 border-t border-border pt-7"><h2 className="text-2xl font-bold">{title}</h2><ul className="mt-4 list-disc space-y-3 pl-6 leading-8">{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></section>)}
    <section className="mt-10" aria-labelledby="visit-questions"><h2 id="visit-questions" className="text-2xl font-bold">자주 묻는 질문</h2><div className="mt-5 space-y-3">{content.faq.map(([question, answer]) => <details key={question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold leading-7">{question}</summary><p className="mt-3 text-muted-foreground leading-8">{answer}</p></details>)}</div></section>
    <aside className="mt-10 rounded-xl border border-border bg-muted/30 p-6"><h2 className="text-xl font-bold">상담 목적을 선택해 주세요</h2><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href={MACHINECARE_PC_INQUIRY} className="text-accent underline">PC 점검·수리 상담</Link><Link href="/contact?service=machinecare&inquiry=business" className="text-accent underline">기업 PC 관리 문의</Link><Link href="/machinecare/guides" className="text-accent underline">먼저 증상별 안내 읽기</Link></div></aside>
  </div>;
}
