import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MACHINECARE_GUIDES, MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN, getMachineCareGuide } from "@/lib/machinecare-guides";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return MACHINECARE_GUIDES.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getMachineCareGuide(slug);
  if (!guide) return {};
  const canonical = `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical },
    openGraph: { type: "article", locale: "ko_KR", title: guide.title, description: guide.description, url: canonical, modifiedTime: guide.updatedAt },
  };
}

export default async function MachineCareGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getMachineCareGuide(slug);
  if (!guide) notFound();
  const canonical = `${MACHINECARE_PUBLIC_ORIGIN}/machinecare/guides/${guide.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: "ko-KR",
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "QAgentLabs", url: MACHINECARE_PUBLIC_ORIGIN },
    publisher: { "@type": "Organization", name: "QAgentLabs", url: MACHINECARE_PUBLIC_ORIGIN },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    citation: guide.sources.map((source) => source.url),
  };
  return <div lang="ko" className="container-custom max-w-4xl py-10 md:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <nav aria-label="현재 위치" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground mb-8"><Link href="/machinecare" className="underline">MachineCare</Link><span aria-hidden="true">/</span><Link href="/machinecare/guides" className="underline">PC 문제 해결 안내</Link><span aria-hidden="true">/</span><span>{guide.category}</span></nav>
    <article>
      <header>
        <p className="text-sm font-semibold text-accent">{guide.category}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-snug tracking-tight break-keep">{guide.title}</h1>
        <p className="mt-5 text-sm text-muted-foreground">{guide.author} · 공식 안내 확인 <time dateTime={guide.updatedAt}>{guide.updatedAt}</time></p>
        <p className="mt-7 border-l-4 border-accent bg-muted/40 p-5 text-base md:text-lg leading-8 break-keep">{guide.answer}</p>
      </header>
      <section className="mt-10" aria-labelledby="first-checks"><h2 id="first-checks" className="text-2xl font-bold">먼저 확인할 것</h2><ol className="mt-5 list-decimal space-y-4 pl-6 leading-8">{guide.checks.map((item) => <li key={item} className="pl-1">{item}</li>)}</ol></section>
      <section className="mt-10 rounded-xl border border-border bg-muted/30 p-6" aria-labelledby="when-to-ask"><h2 id="when-to-ask" className="text-xl font-bold">점검 상담이 필요한 경우</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7">{guide.stop.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="mt-10" aria-labelledby="prepare"><h2 id="prepare" className="text-2xl font-bold">문의 전 준비할 내용</h2><ul className="mt-5 list-disc space-y-2 pl-6 leading-8">{guide.prepare.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="mt-10" aria-labelledby="questions"><h2 id="questions" className="text-2xl font-bold">자주 묻는 질문</h2><div className="mt-5 space-y-3">{guide.faq.map((item) => <details key={item.question} className="rounded-xl border border-border p-5"><summary className="cursor-pointer font-semibold leading-7">{item.question}</summary><p className="mt-3 leading-8 text-muted-foreground">{item.answer}</p></details>)}</div></section>
      <section className="mt-10 border-t border-border pt-7" aria-labelledby="sources"><h2 id="sources" className="text-lg font-bold">공식 근거와 확인 범위</h2><ul className="mt-4 space-y-3 text-sm leading-7">{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline break-words">{source.title}</a></li>)}</ul><p className="mt-4 text-sm leading-7 text-muted-foreground">기존 MachineCare BIOS 현장 자료와 공식 안내를 고객용으로 정리했습니다. 화면과 지원 조건은 PC 모델·Windows·BIOS 버전에 따라 달라질 수 있습니다. 이 글은 고객 수리 성공 사례나 개별 장비의 진단 결과가 아닙니다.</p></section>
    </article>
    <aside className="mt-10 rounded-xl border border-border p-6 md:p-8"><h2 className="text-xl font-bold">증상을 정리한 뒤 상담해 주세요</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">MachineCare는 현장 운영 준비 중입니다. 방문 가능 여부·비용·일정은 담당자와 협의 후 확정합니다. 문의에 비밀번호·복구 키·고객 개인 문서 원본을 넣지 마세요.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link href={MACHINECARE_PC_INQUIRY} className="text-accent underline">PC 점검 상담 문의</Link><Link href="/machinecare/visit" className="text-accent underline">출장 상담 진행 방식</Link></div></aside>
    <nav aria-label="함께 읽을 안내" className="mt-10 border-t border-border pt-7"><h2 className="text-lg font-bold">함께 읽을 안내</h2><ul className="mt-4 space-y-3 text-sm leading-7">{guide.related.map((relatedSlug) => { const related = getMachineCareGuide(relatedSlug); return related ? <li key={related.slug}><Link href={`/machinecare/guides/${related.slug}`} className="text-accent underline">{related.title}</Link></li> : null; })}</ul><Link href="/machinecare/guides" className="inline-block mt-6 text-sm underline">전체 안내 목록으로</Link></nav>
  </div>;
}
