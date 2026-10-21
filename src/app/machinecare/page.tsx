import type { Metadata } from "next";
import { callbackAvailable } from "@/lib/machinecare-callback-store";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Monitor, ClipboardCheck, BriefcaseBusiness, FolderSync, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChatLauncher } from "@/components/features/AIChatbot";
import { MACHINECARE_INQUIRIES, MACHINECARE_CONTACT } from "@/lib/machinecare";

export const metadata: Metadata = {
  title: "QAgent MachineCare | PC 점검·현장 업무 관리 상담",
  description: "PC 점검부터 현장 업무 기록까지. QAgent MachineCare는 현장 운영 준비 중이며 PC 증상, 기업 PC 관리, 수리점·기사 도입 및 제휴를 상담합니다.",
  alternates: { canonical: "https://www.qagentlabs.com/machinecare" },
};

const features = [
  { icon: Monitor, title: "고객 PC에서 점검", status: "현장 운영 준비 중", text: "고객 Windows PC의 상태를 현장에서 확인하는 서비스입니다. 지금은 증상을 정리하고 점검·수리 상담이 가능한 범위를 안내합니다." },
  { icon: ClipboardCheck, title: "점검 결과와 보고서 정리", status: "현장 운영 준비 중", text: "현장에서 확인한 점검 결과를 이해하기 쉽게 정리하는 서비스를 준비합니다. 현재 홈페이지에서 점검 보고서를 조회할 수는 없습니다." },
  { icon: BriefcaseBusiness, title: "기사 업무 기록", status: "현장 운영 준비 중", text: "담당 기사가 점검 내용과 처리 결과를 기록하는 업무 흐름을 준비합니다. 상담 요청은 본부가 확인하고 담당자를 수동 배정합니다." },
  { icon: FolderSync, title: "회사 자료 회수와 관리", status: "현장 운영 준비 중", text: "현장 점검 자료를 회사에서 확인하고 관리하는 서비스를 준비합니다. 기업 PC 관리와 수리점 도입 상담으로 필요한 범위를 확인할 수 있습니다." },
];
const faq = [
  ["누구를 위한 서비스인가요?", "PC 점검·수리 상담이 필요한 고객, 기업 PC 관리 담당자, 서비스 도입을 검토하는 수리점·현장 기사를 위한 사업입니다."],
  ["프로그램은 어느 PC를 점검하나요?", "프로그램을 실행한 고객 Windows PC를 점검합니다. 기사 폰은 승인·업무·결과 확인용으로 연결하는 계획입니다. 홈페이지나 챗봇 대화만으로 고객 PC를 진단하지 않습니다."],
  ["현재 도입 단계는 어디까지인가요?", "현장 운영 준비 중입니다. PC 증상 정리, 기업 PC 관리, 수리점 도입·제휴를 상담합니다. 실제 방문 가능 여부·비용·일정은 담당 기사와 통화한 뒤 확인합니다."],
  ["기업이나 수리점은 어떻게 문의하나요?", "아래에서 기업 PC 관리 또는 수리점·기사 도입/제휴 문의를 선택해 주세요. 목적과 대략적인 규모·지역을 확인한 뒤 제공 가능한 범위와 일정을 상담합니다."],
];
export default async function MachineCarePage() {
  const acceptingCallbacks = await callbackAvailable();
  return <div lang="ko" className="w-full pb-20">
    <section className="border-b border-border bg-muted/30 py-14 md:py-24">
      <div className="container-custom max-w-5xl">
        <p className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold text-accent mb-6">현장 운영 준비 중 · 서비스 도입 및 제휴 상담</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">QAgent MachineCare</h1>
        <p className="text-xl md:text-3xl font-semibold mt-5">PC 점검부터 현장 업무 기록까지</p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mt-5 break-keep">현장 기사와 수리점의 PC 점검·보고서·업무 관리를 연결하는 플랫폼을 준비하고 있습니다.</p>
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
      <h2 className="text-2xl md:text-3xl font-bold mb-8">이런 분들과 함께 준비합니다</h2>
      <div className="grid md:grid-cols-3 gap-5">{["PC 점검·수리 상담이 필요한 고객", "기업 PC 관리 담당자", "도입을 검토하는 수리점·현장 기사"].map(text => <Card key={text} className="bg-muted/40"><CardContent className="!pt-6 text-sm leading-relaxed font-medium">{text}</CardContent></Card>)}</div>
    </section>
    <section className="border-y border-border bg-muted/20"><div className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">상담 가능한 범위와 준비 중인 서비스</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">현재는 상담을 통해 필요한 점검 범위를 확인합니다. 현장 점검·보고서·업무 관리 서비스는 운영을 준비하고 있습니다.</p>
      <div className="grid md:grid-cols-2 gap-6">{features.map(({ icon: Icon, ...item }) => <Card key={item.title}><CardHeader><Icon className="text-accent h-7 w-7 mb-4" aria-hidden="true" /><p className="text-xs font-semibold text-accent !mb-2">{item.status}</p><CardTitle className="text-lg leading-normal">{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground leading-relaxed break-keep">{item.text}</p></CardContent></Card>)}</div>
    </div></section>
    <section className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">상담 이후의 진행 흐름</h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{["챗봇에서 증상 정리", "내용 확인 후 상담 요청", "본부 확인·담당자 배정 및 통화", "협의 후 방문 확정·현장 점검"].map((text, i) => <li key={text} className="rounded-xl border border-border p-5"><span className="text-accent text-sm font-bold">{i + 1}</span><p className="mt-3 text-sm font-semibold leading-relaxed">{text}</p></li>)}</ol>
      <p className="mt-5 text-sm text-muted-foreground leading-relaxed">문의 접수만으로 방문이 예약되지 않습니다. 담당자가 확인 후 연락하고, 통화로 가능 범위·비용·일정을 협의한 뒤 방문을 확정하는 흐름을 준비합니다. 즉시 연락이나 24시간 전화상담을 약속하지 않습니다.</p>
    </section>
    <section id="inquiry" className="scroll-mt-24 border-y border-border bg-muted/20"><div className="section-padding container-custom max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">상담·문의하기</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">{acceptingCallbacks ? "문의 목적을 선택하고 연락처·지역·연락 가능한 시간·증상 요약을 확인한 뒤 제출해 주세요. 본부에서 확인 후 담당자를 배정합니다." : "문의 목적을 선택해 이메일 문의 안내로 이동합니다. 콜백 접수는 준비 중입니다."} 기사 모집은 현재 진행하지 않습니다.</p>
      <div className="grid md:grid-cols-3 gap-5">{Object.entries(MACHINECARE_INQUIRIES).map(([key, label]) => <Link key={key} href={"/contact?service=machinecare&inquiry=" + key} className="rounded-xl border border-border bg-background p-5 font-semibold text-sm leading-relaxed hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">{label}<ArrowRight className="h-4 w-4 mt-4 text-accent" aria-hidden="true" /></Link>)}</div>
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
    </section>
  </div>;
}
