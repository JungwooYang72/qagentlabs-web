import type { Metadata } from "next";
import Link from "next/link";
import { MACHINECARE_GUIDES, MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";

export const metadata: Metadata = {
  title: "PC 문제 해결 안내 | MachineCare",
  description: "느려짐·부팅 오류·인터넷 연결·저장장치·TPM·BitLocker 문제를 먼저 확인하고 PC 점검 상담을 준비하는 MachineCare 고객 안내입니다.",
  alternates: { canonical: `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/guides` },
};

export default function MachineCareGuidesPage() {
  const categories = [...new Set(MACHINECARE_GUIDES.map((guide) => guide.category))];
  return <div lang="ko" className="w-full pb-20">
    <header className="border-b border-border bg-muted/30 py-12 md:py-20">
      <div className="container-custom max-w-5xl">
        <nav aria-label="현재 위치" className="text-sm text-muted-foreground mb-6"><Link href="/machinecare" className="underline">MachineCare</Link><span aria-hidden="true"> / </span>PC 문제 해결 안내</nav>
        <p className="text-sm font-semibold text-accent">문제 확인부터 상담 준비까지</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-tight">PC에 문제가 생겼나요?</h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg leading-8 text-muted-foreground break-keep">증상에 맞는 안내를 읽고 먼저 확인할 내용과 점검이 필요한 상황을 살펴보세요. 어떤 화면에서 문제가 생기는지 정리하면 상담에도 도움이 됩니다.</p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">공식 안내를 바탕으로 정리한 일반 정보입니다. PC 모델·Windows 버전에 따라 화면과 절차가 다를 수 있으며, 이 페이지가 장비의 실제 점검을 대신하지는 않습니다.</p>
      </div>
    </header>
    <div className="container-custom max-w-5xl py-10 md:py-14">
      <nav aria-label="증상별 분류" className="flex flex-wrap gap-3 mb-10">{categories.map((category, index) => <a key={category} href={`#category-${index}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">{category}</a>)}</nav>
      {categories.map((category, index) => <section key={category} id={`category-${index}`} className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold mb-5">{category}</h2>
        <div className="grid gap-4 sm:grid-cols-2">{MACHINECARE_GUIDES.filter((guide) => guide.category === category).map((guide) => <Link key={guide.slug} href={`/machinecare/guides/${guide.slug}`} className="block min-w-0 rounded-xl border border-border p-6 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent">
          <h3 className="text-lg font-semibold leading-7 break-keep">{guide.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.description}</p><span className="mt-4 inline-block text-sm font-semibold text-accent">안내 읽기 →</span>
        </Link>)}</div>
      </section>)}
      <aside className="rounded-xl border border-border bg-muted/30 p-6 md:p-8">
        <h2 className="text-xl font-bold">직접 확인하기 어렵다면 상담을 준비하세요</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">MachineCare는 출장 PC 점검·수리 서비스를 운영하고 있습니다. 증상과 지역을 남기면 담당자가 확인 후 방문 가능 여부·비용·일정을 협의합니다. 문의 접수만으로 방문이 확정되지는 않습니다.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href={MACHINECARE_PC_INQUIRY} className="text-accent underline">PC 점검 상담 문의</Link><Link href="/machinecare/visit" className="text-accent underline">출장 지역·비용·진행 방식 확인</Link></div>
      </aside>
    </div>
  </div>;
}
