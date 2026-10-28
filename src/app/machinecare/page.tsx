import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { callbackAvailable } from "@/lib/machinecare-callback-store";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Monitor, ClipboardCheck, BriefcaseBusiness, FolderSync, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChatLauncher } from "@/components/features/AIChatbot";
import { MACHINECARE_BASE_HOURS, MACHINECARE_INQUIRIES, MACHINECARE_CONTACT, MACHINECARE_VISIT_AREAS } from "@/lib/machinecare";

export const metadata: Metadata = {
  title: "출장 컴퓨터 점검·수리·기업 PC 관리 | QAgent MachineCare",
  description: "구리·남양주 등 경기 9개 시와 서울 동부 4개 구의 출장 컴퓨터 점검·수리 서비스를 운영합니다. 느려짐·부팅 오류·Windows 문제와 기업 PC 관리를 상담하고, 작업 범위·비용·일정을 협의해 방문합니다.",
  alternates: { canonical: "https://www.qagentlabs.com/machinecare" },
};

const features = [
  { icon: Monitor, title: "고객 PC에서 점검", status: "서비스 운영 중", text: "고객 Windows PC의 느려짐·부팅 오류·인터넷·저장장치·Windows 문제를 현장에서 점검합니다. 증상과 장비 상태에 맞는 조치 범위를 확인하고 비용을 안내합니다." },
  { icon: ClipboardCheck, title: "점검 결과 설명과 조치 상담", status: "서비스 운영 중", text: "점검에서 확인한 내용과 추가 확인이 필요한 부분을 설명하고, 필요한 조치와 비용을 안내합니다. 작업은 고객 동의를 확인한 뒤 진행합니다." },
  { icon: BriefcaseBusiness, title: "기업 PC 관리 상담", status: "상담 후 범위 확인", text: "업무용 PC의 반복 장애와 관리 목적을 확인합니다. 필요한 장비 수·점검 범위·일정·비용을 사전에 상담합니다." },
  { icon: FolderSync, title: "AI PC 호환성·초기 설정", status: "서비스 준비 중 · 실제 기종 검증 대기", text: "AI PC의 호환성 확인·초기 설정·AI 기능 동작 점검을 준비합니다. 실제 기종별 지원 완료 범위는 아직 공개하지 않습니다. AI PC의 기능 점검과 AI를 이용한 점검 보고서 해석은 별도 기능입니다." },
];
const faq = [
  ["누구를 위한 서비스인가요?", "PC 점검·수리 상담이 필요한 개인 고객과 기업 PC 관리 담당자를 위한 서비스입니다."],
  ["PC 점검은 어떻게 진행하나요?", "기사가 고객 Windows PC를 현장에서 점검하고 결과와 필요한 조치를 설명합니다. 홈페이지와 챗봇은 증상 상담과 문의 안내를 제공하며 실제 PC 점검은 방문 후 진행합니다."],
  ["지금 방문 점검을 신청할 수 있나요?", "네. 출장 PC 점검·수리 서비스를 운영하고 있습니다. 증상과 지역을 알려주시면 상세 주소·기사 일정·작업 범위·비용을 확인한 뒤 방문을 확정합니다."],
  ["기업 PC 관리는 어떻게 문의하나요?", "기업 PC 관리 문의에서 장비 수와 관리 목적, 지역을 알려주세요. 점검 범위·일정·비용은 사전에 상담합니다."],
  ["데이터 복구처럼 오래 걸리는 작업은 어떻게 하나요?", "현장 상태 확인 → 고객 동의 후 본사 입고 → 별도 확인·견적 → 작업·결과 확인·반환 순서로 안내합니다. 복구 성공·요금·완료 시각은 확정 전에 보장하지 않습니다. MachineCare가 접수부터 진행 상황 안내·결과 확인·반환까지 관리합니다. 작업 범위와 비용은 사전에 설명하고 고객 동의를 확인합니다."],
  ["AI PC도 지원하나요?", "호환성 확인·초기 설정·AI 기능 동작 점검을 준비하고 있습니다. 지원 완료로 공개한 기종·범위는 아직 없으며 실제 기기 검증 후 안내합니다. AI PC 기능 점검과 AI 보고서 해석은 별개입니다."],
];
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.qagentlabs.com/machinecare#service",
  name: "QAgent MachineCare 출장 PC 점검·수리",
  serviceType: "출장 컴퓨터 점검·수리 및 기업 PC 관리 상담",
  description: "개인·기업 고객의 Windows PC를 현장에서 점검하고 결과와 필요한 조치·비용을 설명합니다. 상담 후 방문 일정을 확정하고 고객 동의 후 작업합니다.",
  url: "https://www.qagentlabs.com/machinecare",
  provider: {
    "@type": "Organization",
    "@id": "https://www.qagentlabs.com/#organization",
    name: COMPANY.brand,
    legalName: COMPANY.legalName,
    url: "https://www.qagentlabs.com",
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "경기도", addressLocality: "구리시", streetAddress: "갈매중앙로 190, D동 4층 17호(갈매동, 휴밸나인 지식산업센터)" },
  },
  areaServed: [
    ...MACHINECARE_VISIT_AREAS.gyeonggi.map(name => ({ "@type": "AdministrativeArea", name: `경기도 ${name}` })),
    ...MACHINECARE_VISIT_AREAS.seoul.map(name => ({ "@type": "AdministrativeArea", name: `서울특별시 ${name}` })),
  ],
  availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://www.qagentlabs.com/contact?service=machinecare&inquiry=pc" },
};
export default async function MachineCarePage() {
  const acceptingCallbacks = await callbackAvailable();
  return <div lang="ko" className="w-full pb-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData).replace(/</g, "\\u003c") }} />
    <section className="border-b border-border bg-muted/30 py-14 md:py-24">
      <div className="container-custom max-w-5xl">
        <p className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-accent mb-6">출장 PC 점검·수리 서비스 운영 중</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">QAgent MachineCare</h1>
        <p className="text-xl md:text-3xl font-semibold mt-5">컴퓨터 점검부터 수리·결과 설명까지</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mt-5 break-keep">구리·남양주를 비롯한 경기 9개 시와 서울 동부 4개 구에서 개인·기업 고객의 출장 PC 점검·수리 서비스를 제공합니다. 증상을 상담하고, 현장 점검 결과와 필요한 조치·비용을 설명합니다.</p>
        <div className="flex flex-wrap gap-3 mt-8"><ChatLauncher /><Button size="lg" variant="outline" asChild><Link href="/contact?service=machinecare&inquiry=pc">출장 점검·수리 상담 신청</Link></Button><Button size="lg" variant="outline" asChild><Link href="/machinecare/guides">PC 문제 해결 안내</Link></Button></div>
        <p className="text-xs text-muted-foreground mt-5 leading-relaxed">기본 상담·방문 시간 09:00~18:00 · 상세 주소와 기사 일정, 작업 범위·비용을 협의한 뒤 방문을 확정합니다.</p>
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
      <h2 className="text-2xl md:text-3xl font-bold mb-4">현재 이용 가능한 서비스와 기종별 확인 항목</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">현장 PC 점검과 수리·조치 상담, 기업 PC 관리 상담을 제공합니다. AI PC의 기종별 기능 점검은 실제 기기 검증 후 지원 범위를 안내합니다.</p>
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
      <p className="mt-5 text-sm leading-7 text-muted-foreground">입고·반환 방법과 비용은 사전에 협의합니다. 복구 성공·요금·완료 시각은 확정 전에 보장하지 않습니다. MachineCare가 접수부터 진행 상황 안내·결과 확인·반환까지 관리합니다. 작업 범위와 비용은 사전에 설명하고 고객 동의를 확인합니다.</p>
    </section>
    <section id="inquiry" className="scroll-mt-24 border-y border-border bg-muted/20"><div className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">상담·문의하기</h2>
      <p className="text-sm leading-7 mb-3">출장 서비스 지역은 경기 {MACHINECARE_VISIT_AREAS.gyeonggi.join(", ")} 및 서울 {MACHINECARE_VISIT_AREAS.seoul.join(", ")}입니다. 기본 상담·방문 시간은 {MACHINECARE_BASE_HOURS}이며 운영 요일·휴무일은 아직 정해지지 않았습니다. 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.</p>
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
      <div id="partner" className="mt-10 border-t border-border pt-6 text-sm"><Link href="/contact?service=machinecare&inquiry=partner" className="text-accent underline">사업 제휴 문의</Link></div>
    </section>
  </div>;
}
