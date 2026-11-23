import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/company";
import { MACHINECARE_FREE } from "@/lib/machinecare-free";
import { MACHINECARE_PC_INQUIRY, MACHINECARE_PUBLIC_ORIGIN } from "@/lib/machinecare-guides";

export const metadata: Metadata = {
  title: "MachineCare 무료 PC 점검 고객용 사용설명서",
  description: "Windows 11 x64용 MachineCare 무료 고객판의 실행 순서, 결과 읽는 법, HTML 결과 파일 저장과 상담 방법을 안내합니다.",
  alternates: { canonical: `${MACHINECARE_PUBLIC_ORIGIN}${MACHINECARE_FREE.manualPath}` },
};

export default function MachineCareManualPage() {
  return (
    <article lang="ko" className="container-custom max-w-4xl py-8 md:py-16">
      <nav aria-label="현재 위치" className="mb-5 text-sm text-muted-foreground">
        <Link href="/machinecare" className="underline underline-offset-4">MachineCare</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">고객용 사용설명서</span>
      </nav>

      <header>
        <Link href="/" aria-label={`${COMPANY.brand} 홈페이지`} className="inline-flex items-center text-2xl font-bold tracking-tight">
          QAgent<span className="text-accent">Labs</span>
        </Link>
        <h1 className="mt-3 break-keep text-3xl font-bold tracking-tight md:text-4xl">MachineCare 고객용 사용설명서</h1>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          {MACHINECARE_FREE.platform} · {MACHINECARE_FREE.version} · 설치 없이 실행
        </p>
      </header>

      <section aria-labelledby="manual-start" className="mt-6 rounded-xl border border-border bg-muted/30 p-5 sm:p-7">
        <h2 id="manual-start" className="text-2xl font-bold">처음 실행하기</h2>
        <ol className="mt-4 list-decimal space-y-3 break-keep pl-5 leading-relaxed">
          <li><strong>ZIP 전체 압축 풀기</strong>. 압축을 푼 폴더에 실행 파일과 함께 풀린 파일을 모두 두세요.</li>
          <li>그 폴더에서 <code className="inline-block max-w-full break-all text-sm font-semibold">{MACHINECARE_FREE.executable}</code>를 두 번 클릭합니다.</li>
          <li><strong>내 PC 점검 시작</strong>을 누릅니다. 일부 항목을 읽는 데 시간이 걸릴 수 있습니다.</li>
        </ol>
        <p className="mt-4 break-keep leading-relaxed text-muted-foreground">일반 Windows 사용자 계정에서 회원가입 없이 이용할 수 있습니다.</p>
        <div className="mt-5 flex flex-col sm:items-start">
          <Button size="lg" className="h-auto! min-h-11 px-3! py-2 text-center leading-snug sm:px-5!" asChild>
            <a href={MACHINECARE_FREE.path} download={MACHINECARE_FREE.filename} aria-describedby="manual-download-details">Windows용 무료 PC 점검 다운로드</a>
          </Button>
        </div>
        <p id="manual-download-details" className="mt-2 text-sm text-muted-foreground">ZIP · {MACHINECARE_FREE.size}</p>
      </section>

      <section aria-labelledby="manual-results" className="mt-9 border-t border-border pt-7">
        <h2 id="manual-results" className="text-2xl font-bold">점검 결과 읽기</h2>
        <p className="mt-3 break-keep leading-relaxed">각 항목의 <strong>측정값 → 쉬운 설명 → 직접 할 수 있는 조치</strong> 순서로 읽으세요. CPU·메모리·Windows 정보, 디스크 모델·여유 공간·장치가 제공하는 저장장치 상태, 그래픽카드·드라이버, 메인보드·BIOS, 지원되는 배터리 잔량, 장치 오류와 최근 7일 주요 시스템 오류를 확인할 수 있습니다.</p>
        <dl className="mt-4 space-y-4 rounded-xl border border-border p-5 leading-relaxed">
          <div>
            <dt className="font-semibold">확인됨</dt>
            <dd className="mt-1 break-keep">해당 값을 읽는 데 성공했다는 뜻입니다. 저장장치에 표시되는 <span lang="en">Healthy</span>는 Windows가 보고한 상태입니다.</dd>
          </div>
          <div>
            <dt className="font-semibold">확인 불가</dt>
            <dd className="mt-1 break-keep">장치가 그 값을 제공하지 않거나, 권한 또는 Windows의 정보 제공 방식 때문에 읽지 못한 항목입니다. 해당 값은 미확인 상태이며, 실제 증상과 다른 점검 항목을 함께 확인해 주세요.</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="manual-save" className="mt-9 border-t border-border pt-7">
        <h2 id="manual-save" className="text-2xl font-bold">결과 저장과 공유</h2>
        <p className="mt-3 break-keep leading-relaxed"><strong>결과 파일 저장</strong>을 누르면 기존 파일을 유지한 채 새 HTML 보고서를 저장합니다. 기본 점검은 인터넷 연결 없이 PC 안에서 진행됩니다. 보고서를 공유하기 전에 장치 정보와 오류 발생 시간을 비롯해 포함된 내용을 확인하세요.</p>
      </section>

      <section aria-labelledby="manual-contact" className="mt-9 rounded-xl border border-border bg-muted/30 p-5 sm:p-7">
        <h2 id="manual-contact" className="text-2xl font-bold">상담 문의</h2>
        <p className="mt-3 break-keep leading-relaxed">프로그램의 <strong>상담 문의</strong>를 누르면 인터넷을 통해 기본 브라우저에서 MachineCare 안내 페이지가 열립니다. 보고서 공유는 내용을 확인한 뒤 직접 하실 수 있습니다. PC가 부팅되지 않거나 방문이 필요하면 아래 상담 링크를 이용해 주세요.</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Button size="lg" variant="outline" asChild><Link href={MACHINECARE_PC_INQUIRY}>PC 점검·수리 상담</Link></Button>
          <Link href="/machinecare/visit" className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">출장·수리 요금 보기</Link>
        </div>
        <address className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 [overflow-wrap:anywhere] not-italic leading-relaxed">
          <strong>{COMPANY.brand}</strong>
          <a href={COMPANY.phoneHref} className="text-accent underline underline-offset-4">{COMPANY.phone}</a>
          <a href={`mailto:${COMPANY.email}`} className="text-accent underline underline-offset-4">{COMPANY.email}</a>
        </address>
      </section>

      <section aria-labelledby="manual-app-settings" className="mt-9 border-t border-border pt-7">
        <h2 id="manual-app-settings" className="text-2xl font-bold">화면 글자 크기와 종료</h2>
        <p className="mt-3 break-keep leading-relaxed">프로그램에서 글자 크기를 100%, 125%, 150%, 200%로 바꿀 수 있습니다. 창이 작으면 하단 영역을 스크롤해 상담·종료 버튼을 찾으세요. 점검 도중 <strong>종료</strong>를 누르면 진행 중인 조회를 정리한 뒤 창을 닫습니다.</p>
      </section>

      <section aria-labelledby="manual-requirements" className="mt-9 border-t border-border pt-7">
        <h2 id="manual-requirements" className="text-2xl font-bold">실행 환경</h2>
        <p className="mt-3 break-keep leading-relaxed">Windows 11 x64용 패키지에 실행에 필요한 .NET 10.0.12 런타임이 들어 있습니다. 이 버전은 코드 서명 전이며, 보안 프로그램이 파일을 탐지하면 실행을 중단하고 파일명과 탐지 내용을 상담팀에 알려주세요.</p>
      </section>
    </article>
  );
}
