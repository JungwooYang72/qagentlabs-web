import type { Metadata } from "next";
import { callbackAvailable } from "@/lib/machinecare-callback-store";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Monitor, ClipboardCheck, BriefcaseBusiness, FolderSync, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChatLauncher } from "@/components/features/AIChatbot";
import { MACHINECARE_BASE_HOURS, MACHINECARE_INQUIRIES, MACHINECARE_CONTACT, MACHINECARE_VISIT_AREAS } from "@/lib/machinecare";

export const metadata: Metadata = {
  title: "QAgent MachineCare | PC 점검·수리·기업 PC 관리 상담",
  description: "PC 증상·기업 PC 관리 상담과 점검 결과 설명, 장시간 작업의 본사 입고 절차를 안내합니다. AI PC 호환성 확인·초기 설정·기능 점검은 준비 중입니다.",
  alternates: { canonical: "https://www.qagentlabs.com/machinecare" },
};

const features = [
  { icon: Monitor, title: "고객 PC에서 점검", status: "현장 운영 준비 중", text: "고객 Windows PC의 상태를 현장에서 확인하는 서비스입니다. 지금은 증상을 정리하고 점검·수리 상담이 가능한 범위를 안내합니다." },
  { icon: ClipboardCheck, title: "점검 결과 설명과 조치 상담", status: "현장 운영 준비 중", text: "점검에서 확인한 내용과 추가 확인이 필요한 부분을 설명하고 조치 범위를 상담하는 서비스를 준비합니다. 홈페이지에서는 점검 보고서를 조회할 수 없습니다." },
  { icon: BriefcaseBusiness, title: "기업 PC 관리 상담", status: "상담 후 범위 확인", text: "업무용 PC의 반복 장애와 관리 목적을 확인합니다. 필요한 장비 수·점검 범위·일정·비용을 사전에 상담합니다." },
  { icon: FolderSync, title: "AI PC 호환성·초기 설정", status: "서비스 준비 중 · 실제 기종 검증 대기", text: "AI PC의 호환성 확인·초기 설정·AI 기능 동작 점검을 준비합니다. 실제 기종별 지원 완료 범위는 아직 공개하지 않습니다. AI PC의 기능 점검과 AI를 이용한 점검 보고서 해석은 별도 기능입니다." },
];
const faq = [
  ["누구를 위한 서비스인가요?", "PC 점검·수리 상담이 필요한 개인 고객과 기업 PC 관리 담당자를 위한 서비스입니다."],
  ["프로그램은 어느 PC를 점검하나요?", "프로그램을 실행한 고객 Windows PC를 점검합니다. 기사 폰은 승인·업무·결과 확인용으로 연결하는 계획입니다. 홈페이지나 챗봇 대화만으로 고객 PC를 진단하지 않습니다."],
  ["현재 도입 단계는 어디까지인가요?", "현장 운영 준비 중입니다. PC 증상과 기업 PC 관리를 상담하고 제공 가능한 점검·조치 범위와 일정을 확인합니다."],
  ["기업 PC 관리는 어떻게 문의하나요?", "기업 PC 관리 문의에서 장비 수와 관리 목적, 지역을 알려주세요. 점검 범위·일정·비용은 사전에 상담합니다."],
  ["데이터 복구처럼 오래 걸리는 작업은 어떻게 하나요?", "현장 상태 확인 → 고객 동의 후 본사 입고 → 별도 확인·견적 → 작업·결과 확인·반환 순서로 안내합니다. 복구 성공·요금·완료 시각은 확정 전에 보장하지 않습니다. 외부 전문업체 의뢰가 필요하면 고객에게 설명하고 동의를 확인합니다."],
  ["AI PC도 지원하나요?", "호환성 확인·초기 설정·AI 기능 동작 점검을 준비하고 있습니다. 지원 완료로 공개한 기종·범위는 아직 없으며 실제 기기 검증 후 안내합니다. AI PC 기능 점검과 AI 보고서 해석은 별개입니다."],
];
export default async function MachineCarePage() {
  const acceptingCallbacks = await callbackAvailable();
  return <div lang="ko" className="w-full pb-20">
    <section className="border-b border-border bg-muted/30 py-14 md:py-24">
      <div className="container-custom max-w-5xl">
        <p className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-accent mb-6">현장 운영 준비 중 · PC 증상 및 기업 PC 관리 상담</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">QAgent MachineCare</h1>
        <p className="text-xl md:text-3xl font-semibold mt-5">PC 점검부터 결과 설명과 조치 상담까지</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mt-5 break-keep">개인·기업 고객의 PC 증상을 상담하고, 점검 결과 설명과 필요한 조치·본사 입고를 안내하는 서비스를 준비하고 있습니다.</p>
        <div className="flex flex-wrap gap-3 mt-8"><ChatLauncher /><Button size="lg" variant="outline" asChild><a href="#inquiry">문의 구분 확인</a></Button><Button size="lg" variant="outline" asChild><Link href="/machinecare/guides">PC 문제 해결 안내</Link></Button></div>
        <p className="text-xs text-muted-foreground mt-5 leading-relaxed">현재 프로그램 다운로드·기사 로그인·보고서 조회는 공개하지 않습니다. 상담 후 제공 가능한 범위와 일정을 확인합니다.</p>
      </div>
    </section>
    <section className="section-padding container-custom max-w-5xl">
      <aside className="mb-12 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-bold">PC에 문제가 생겼나요?</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">느려짐·부팅 오류·인터넷·저장장치·Windows 설치 문제에서 먼저 확인할 내용을 읽고 상담을 준비하세요.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href="/machinecare/guides" className="text-accent underline">증상별 안내 10개 보기</Link><Link href="/machinecare/visit" className="text-accent underline">출장 지역·비용·진행 방식 확인</Link></div>
      </aside>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">이런 고객을 위한 상담입니다</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{["PC 점검·수리 상담이 필요한 고객", "기업 PC 관리 담당자"].map(text => <Card key={text} className="bg-muted/40"><CardContent className="!pt-6 text-sm leading-relaxed font-medium">{text}</CardContent></Card>)}</div>
    </section>
    <section className="border-y border-border bg-muted/20"><div className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">상담 가능한 범위와 준비 중인 서비스</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">현재는 상담을 통해 필요한 점검 범위를 확인합니다. 현장 점검·보고서·업무 관리 서비스는 운영을 준비하고 있습니다.</p>
      <div className="grid md:grid-cols-2 gap-6">{features.map(({ icon: Icon, ...item }) => <Card key={item.title}><CardHeader><Icon className="text-accent h-7 w-7 mb-4" aria-hidden="true" /><p className="text-xs font-semibold text-accent !mb-2">{item.status}</p><CardTitle className="text-lg leading-normal">{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground leading-relaxed break-keep">{item.text}</p></CardContent></Card>)}</div>
    </div></section>
    <section className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">상담 이후의 진행 흐름</h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{["챗봇에서 증상 정리", "내용 확인 후 상담 요청", "본부 확인·담당자 배정 및 통화", "협의 후 방문 확정·현장 점검"].map((text, i) => <li key={text} className="rounded-xl border border-border p-5"><span className="text-accent text-sm font-bold">{i + 1}</span><p className="mt-3 text-sm font-semibold leading-relaxed">{text}</p></li>)}</ol>
      <p className="mt-5 text-sm text-muted-foreground leading-relaxed">문의 접수만으로 방문이 예약되지 않습니다. 담당자가 확인 후 연락하고, 통화로 증상·상세 주소·기사 일정·비용을 협의한 뒤 방문을 확정합니다. 즉시 연락이나 24시간 전화상담을 약속하지 않습니다.</p>
    </section>
    <section className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold">장시간 작업은 본사 입고 후 확인합니다</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">데이터 복구 등 오래 걸리는 작업은 현장에서 상태와 증상을 확인한 뒤 고객 동의를 받아 본사 입고로 안내합니다. 일반적인 단시간 현장 조치의 가능 여부는 상담 후 확인합니다.</p>
      <ol className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{["현장 상태 확인", "고객 동의 후 본사 입고", "별도 확인·견적 후 작업", "결과 확인·반환"].map((text, i) => <li key={text} className="rounded-xl border border-border p-5 text-sm leading-7"><span className="font-bold text-accent">{i + 1}</span><p className="mt-2 font-semibold">{text}</p></li>)}</ol>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">입고·반환 방법과 비용은 사전에 협의합니다. 복구 성공·요금·완료 시각은 확정 전에 보장하지 않습니다. 외부 전문업체 의뢰가 필요한 경우에는 고객에게 설명하고 동의를 확인합니다.</p>
    </section>
    <section id="inquiry" className="scroll-mt-24 border-y border-border bg-muted/20"><div className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">상담·문의하기</h2>
      <p className="text-sm leading-7 mb-3">초기 방문 상담 지역은 경기 {MACHINECARE_VISIT_AREAS.gyeonggi.join(", ")} 및 서울 {MACHINECARE_VISIT_AREAS.seoul.join(", ")}입니다. 기본 상담·방문 시간은 {MACHINECARE_BASE_HOURS}이며 운영 요일·휴무일은 아직 정해지지 않았습니다. 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">{acceptingCallbacks ? "연락처·지역·연락 가능한 시간·증상 요약을 확인한 뒤 상담을 요청해 주세요." : "문의 목적을 선택해 안내에 따라 연락해 주세요. 온라인 저장 접수가 불가하면 이메일 문의를 이용할 수 있습니다."}</p>
      <div className="grid md:grid-cols-2 gap-5">{Object.entries(MACHINECARE_INQUIRIES).filter(([key]) => key !== "partner").map(([key, label]) => <Link key={key} href={"/contact?service=machinecare&inquiry=" + key} className="rounded-xl border border-border bg-background p-5 font-semibold text-sm leading-relaxed hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">{label}<ArrowRight className="h-4 w-4 mt-4 text-accent" aria-hidden="true" /></Link>)}</div>
      <div className="mt-8 rounded-xl border border-border bg-background p-5 text-sm leading-relaxed">
        <p className="font-semibold">QAgentLabs · {MACHINECARE_CONTACT.person}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3"><a href={"mailto:" + MACHINECARE_CONTACT.email} className="text-accent underline break-all">{MACHINECARE_CONTACT.email}</a></div>
        <p className="text-xs text-muted-foreground mt-3">{acceptingCallbacks ? "챗봇에서 증상을 정리한 뒤 상담 요청을 남겨주세요. 개인 전화번호는 공개하지 않으며 담당자가 확인 후 연락합니다." : "챗봇에서 증상을 정리한 뒤 이메일로 문의해 주세요. 콜백 접수는 준비 중입니다."}</p>
      </div>
    </div></section>
    <section className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">자주 묻는 질문</h2>
      <div className="space-y-3">{faq.map(([question, answer]) => <details key={question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold text-sm leading-relaxed">{question}</summary><p className="mt-4 text-sm text-muted-foreground leading-relaxed">{answer}</p></details>)}</div>
      <aside className="mt-10 rounded-xl border border-dashed border-border bg-muted/40 p-6">
        <h2 className="font-semibold">후속 검토 계획</h2><p className="text-sm text-muted-foreground leading-relaxed mt-3">휴대폰 점검·업무 자동화·보안 서비스로의 확대를 검토합니다. 현재 이용 가능한 기능이나 확정된 출시 일정은 아닙니다.</p>
      </aside>
      <div id="partner" className="mt-10 border-t border-border pt-6 text-sm"><Link href="/contact?service=machinecare&inquiry=partner" className="text-accent underline">사업 제휴 문의</Link></div>
    </section>
  </div>;
}
