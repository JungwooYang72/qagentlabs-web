import Link from "next/link";
import { COMPANY, POLICY_EFFECTIVE_DATE } from "@/lib/company";

export type PolicySection = { title: string; paragraphs: string[] };

export function PolicyDocument({ title, intro, sections }: {
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return <article lang="ko" className="mx-auto w-full max-w-[900px] px-5 py-12 md:px-8 md:py-16">
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
    <p className="mt-4 text-sm text-muted-foreground">시행일: {POLICY_EFFECTIVE_DATE}</p>
    <p className="mt-6 leading-8 text-muted-foreground">{intro}</p>
    <nav aria-label="약관 및 정책" className="my-8 flex flex-wrap gap-x-6 gap-y-3 text-sm underline underline-offset-4"><Link href="/terms">이용약관</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/refund">취소·환불정책</Link></nav>
    <div className="border-y border-border py-5 text-sm leading-8 break-words">
      <p>운영자: {COMPANY.legalName} · 대표자: {COMPANY.representative}</p>
      <p>사업자등록번호: {COMPANY.registrationNumber} · 통신판매업 신고번호: {COMPANY.mailOrderRegistrationNumber}</p>
      <p>사업장: {COMPANY.address}</p>
      <p>고객센터: <a href={COMPANY.phoneHref} className="underline">{COMPANY.phone}</a> · <a href={"mailto:" + COMPANY.email} className="underline">{COMPANY.email}</a></p>
    </div>
    {sections.map(section => <section key={section.title} className="border-b border-border py-7">
      <h2 className="text-xl font-bold md:text-2xl">{section.title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-8 text-muted-foreground">{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
    </section>)}
  </article>;
}
