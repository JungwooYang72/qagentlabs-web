import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowRight, CheckCircle2, Play, Settings, Smartphone, Sparkles } from "lucide-react";
import { DRIVER_HUB_APPLY_URL, DRIVER_HUB_CAFE_URL, DRIVER_HUB_PLAY_URL, DRIVER_HUB_PLANS } from "@/lib/driver-hub";

const improvements = [
  "콜 판정과 화면 반응 속도 개선",
  "콜 선택·확인·수락 연결 보완",
  "확인·수락 버튼 선택 정확도 개선",
  "종료된 콜의 마커·오버레이 표시 정리 보완",
];
const applicationSteps = [
  { title: "사용할 앱과 요금 확인", text: "카카오T·티맵·콜마너 중 필요한 앱과 이용료를 확인합니다." },
  { title: "신청폼 작성", text: "이름, 휴대폰 번호, 기기 승인 코드(콜ID), 사용할 앱을 입력합니다." },
  { title: "입금 안내에 따라 입금", text: "계좌와 송금 방법은 신청폼에서 확인합니다." },
  { title: "입금 확인 후 이용권 처리", text: "관리자가 입금을 확인한 뒤 신청 기기의 이용권을 처리합니다." },
];
const faqs = [
  { question: "설치하려면 유료 이용 신청부터 해야 하나요?", answer: "Google Play에서 직접 설치하고 앱에서 안내하는 권한을 설정하면 무료 이용기간에 사용할 수 있습니다. 설치를 위해 별도의 가입이나 유료 신청폼 작성이 필요하지 않습니다. 무료 이용은 2026년 10월 15일까지이며, 유료 전환은 10월 16일 낮 12시부터입니다." },
  { question: "앱 두 개는 어떤 조합으로 선택하나요?", answer: "카카오T·티맵·콜마너 중 원하는 두 앱을 선택합니다. 앱 세 개 이용은 세 앱 모두이며, 세 지원 앱에 같은 요금과 전환 일정이 적용됩니다." },
  { question: "10월 첫 이용료와 11월 이용료는 어떻게 다른가요?", answer: "10월 첫 이용료는 2026년 10월 16일 낮 12시부터 10월 31일까지에만 적용되는 정상 월요금의 50%입니다. 11월 한 달 이용분부터 정상 월요금이 적용되고, 이용기간은 매달 말일까지입니다. 모든 금액은 부가세 포함 최종 결제금액입니다." },
  { question: "신청폼만 작성하면 결제가 완료되나요?", answer: "신청만으로 결제가 완료되지는 않습니다. 신청폼의 입금 안내에 따라 입금하고, 관리자 입금 확인 후 신청 기기의 이용권이 처리됩니다." },
  { question: "휴대폰을 바꾸거나 앱을 재설치하면 어떻게 하나요?", answer: "관리자에게 비공개로 문의해 주세요. 개인정보와 기기 승인 코드(콜ID)는 카페 댓글에 남기지 말고 신청폼에 입력해 주세요." },
];

function ApplyButton() {
  return (
    <Button size="lg" className="!bg-yellow-400 hover:!bg-yellow-300 !text-slate-950 font-bold min-h-12 h-auto py-3 !px-4 w-full sm:w-auto text-sm sm:text-base" asChild>
      <a href={DRIVER_HUB_APPLY_URL} target="_blank" rel="noopener noreferrer">유료 이용 신청 <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" /></a>
    </Button>
  );
}
function InstallButton() {
  return (
    <Button size="lg" className="!bg-blue-600 hover:!bg-blue-500 !text-white font-bold min-h-12 h-auto py-3 !px-4 w-full sm:w-auto text-sm sm:text-base" asChild>
      <a href={DRIVER_HUB_PLAY_URL} target="_blank" rel="noopener noreferrer"><Play className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />Google Play 설치·업데이트</a>
    </Button>
  );
}
function CafeButton() {
  return (
    <Button size="lg" variant="outline" className="border-slate-600 !text-slate-200 hover:!text-white min-h-12 h-auto py-3 !px-4 w-full sm:w-auto text-sm sm:text-base" asChild>
      <a href={DRIVER_HUB_CAFE_URL} target="_blank" rel="noopener noreferrer">설치·사용법 / 카페</a>
    </Button>
  );
}

export default function DriverHubPage() {
  return (
    <div lang="ko" className="flex flex-col w-full bg-slate-950 text-slate-100 pb-12 font-sans">
      <section aria-labelledby="driver-hub-title" className="relative overflow-hidden pt-10 pb-12 md:pt-20 md:pb-20 border-b border-slate-900 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="container-custom relative max-w-5xl text-center">
          <p className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-950/50 px-4 py-1.5 text-xs text-blue-300 font-semibold mb-5"><Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />449 · Google Play 정식 출시</p>
          <h1 id="driver-hub-title" className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">QAgent <span className="text-blue-500">Driver Hub</span></h1>
          <p className="text-lg md:text-xl font-bold text-slate-200 mt-4">카카오T · 티맵 · 콜마너</p>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-3 leading-relaxed break-keep">콜 정보를 분석해 설정한 조건에 맞는 콜을 표시하고, 기사님의 직접 선택·확인·수락을 돕습니다.</p>
          <div className="max-w-2xl mx-auto mt-6 rounded-2xl border border-blue-500/25 bg-blue-950/25 p-4 text-sm leading-relaxed">
            <p className="text-slate-200">무료 이용 <strong className="text-white">2026년 10월 15일까지</strong></p>
            <p className="text-slate-200 mt-1">유료 전환 <strong className="text-yellow-300">10월 16일 낮 12시부터</strong></p>
            <p className="text-slate-400 text-xs mt-2">한국시간 기준 · 세 지원 앱 모두 동일하게 적용</p>
          </div>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mt-6 justify-center"><InstallButton /><ApplyButton /><CafeButton /></div>
          <p className="text-xs text-slate-400 mt-4 break-keep">처음 이용: Google Play 설치 → 권한 설정 → 무료 이용</p>
          <nav aria-label="Driver Hub 페이지 안내" className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 text-sm text-blue-300"><a href="#updates" className="hover:underline">449 개선사항</a><a href="#pricing" className="hover:underline">이용료·일정</a><a href="#installation" className="hover:underline">설치 안내</a><a href="#contact-form" className="hover:underline">신청 방법</a></nav>
        </div>
      </section>

      <section aria-labelledby="features-title" className="section-padding container-custom border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 id="features-title" className="text-2xl md:text-3xl font-extrabold text-white mb-8">현재 제공 기능과 사용 방식</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: CheckCircle2, title: "콜 정보 분석·조건 표시", text: "카카오T·티맵·콜마너의 콜 정보를 분석하고, 설정한 조건에 맞는 콜을 화면에 표시합니다." },
              { icon: Smartphone, title: "마커·큰 오버레이", text: "표시된 마커와 큰 오버레이를 기사님이 직접 눌러 각 화면의 콜 선택·확인·수락 단계를 진행합니다." },
              { icon: Settings, title: "판정 상태 확인", text: "앱의 최근 판정 상태에서 콜 화면의 정보 인식과 표시 상태를 확인할 수 있습니다." },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title} className="bg-slate-900/40 border-slate-800 rounded-2xl">
                <CardHeader><Icon className="h-6 w-6 text-blue-400 mb-3" aria-hidden="true" /><CardTitle className="text-lg text-white">{title}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-slate-400 leading-relaxed break-keep">{text}</p></CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 md:p-6 text-sm leading-relaxed text-slate-300 break-keep">
            <p>Driver Hub는 콜 정보를 분석해 설정한 조건에 맞는 콜을 표시합니다. 표시된 마커·큰 오버레이는 기사님이 직접 누르는 버튼이며, 각 화면의 콜 선택·확인·수락 단계를 직접 진행합니다.</p>
            <p className="mt-3 text-slate-400">최종 콜 선택과 수락은 기사님이 직접 결정하고 진행합니다. 실제 배정이나 수입을 보장하지 않습니다.</p>
          </div>
        </div>
      </section>

      <section id="updates" aria-labelledby="updates-title" className="scroll-mt-24 section-padding container-custom border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold mb-3">QAgent Driver Hub 449</p>
          <h2 id="updates-title" className="text-2xl md:text-3xl font-extrabold text-white">449 개선사항</h2>
          <p className="text-slate-400 text-sm mt-3">Google Play에 출시된 버전입니다.</p>
          <ul className="grid sm:grid-cols-2 gap-4 mt-8">{improvements.map(text => <li key={text} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-sm leading-relaxed"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" /><span>{text}</span></li>)}</ul>
        </div>
      </section>

      <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 section-padding container-custom border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-400 text-xs font-bold tracking-widest mb-3">PRICING</p>
          <h2 id="pricing-title" className="text-2xl md:text-3xl font-extrabold text-white">Driver Hub 이용료</h2>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed break-keep">모든 금액은 <strong className="text-white">부가세 포함 최종 결제금액</strong>입니다. Driver Hub 이용료이며, 각 플랫폼 자체 이용료와는 별개입니다.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {DRIVER_HUB_PLANS.map(plan => (
              <Card key={plan.apps} className="bg-slate-900/50 border-slate-700 rounded-2xl">
                <CardHeader className="p-5 pb-4"><CardTitle className="text-white text-xl">앱 {plan.apps}개 이용</CardTitle><p className="text-sm text-slate-400 mt-2">{plan.selection}</p></CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-1 gap-4 p-5 pt-0 items-center">
                  <div><p className="text-xs text-slate-400 mb-2">정상 월요금</p><p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap">{plan.monthly}</p></div>
                  <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-2 sm:p-3"><p className="text-xs text-yellow-200 mb-2">10월 첫 이용료</p><p className="text-lg sm:text-2xl font-bold text-yellow-300 whitespace-nowrap">{plan.october}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-5 text-sm text-slate-300 leading-relaxed space-y-2 break-keep"><p>카카오T·티맵·콜마너 중 필요한 앱을 선택합니다. 2개 이용은 원하는 두 앱, 3개 이용은 세 앱 모두입니다.</p><p>10월 첫 이용료는 아래 첫 이용기간에만 적용되는 정상 월요금의 <strong className="text-yellow-300">50%</strong>입니다.</p></div>
          <div className="mt-8 rounded-2xl border border-blue-500/25 bg-blue-950/20 p-5 md:p-7">
            <h3 className="text-lg font-bold text-white mb-5">이용 일정 <span className="text-xs font-normal text-slate-400">한국시간 기준</span></h3>
            <dl className="text-sm space-y-4">
              <div className="grid sm:grid-cols-[8rem_1fr] gap-1"><dt className="text-slate-400">무료 이용</dt><dd className="text-white font-semibold">2026년 10월 15일까지</dd></div>
              <div className="grid sm:grid-cols-[8rem_1fr] gap-1"><dt className="text-slate-400">유료 전환</dt><dd className="text-yellow-300 font-semibold">2026년 10월 16일 낮 12시부터</dd></div>
              <div className="grid sm:grid-cols-[8rem_1fr] gap-1"><dt className="text-slate-400">첫 이용기간</dt><dd className="text-slate-200 break-keep">2026년 10월 16일 낮 12시~10월 31일</dd></div>
              <div className="grid sm:grid-cols-[8rem_1fr] gap-1"><dt className="text-slate-400">정상 월요금</dt><dd className="text-slate-200">2026년 11월 한 달 이용분부터 적용</dd></div>
              <div className="grid sm:grid-cols-[8rem_1fr] gap-1"><dt className="text-slate-400">이용기간</dt><dd className="text-slate-200">매달 말일까지</dd></div>
            </dl>
            <p className="text-xs text-slate-400 mt-5">세 지원 앱 모두 같은 일정과 요금 기준이 적용됩니다.</p>
          </div>
          <div className="mt-7 flex flex-col sm:items-start gap-3"><ApplyButton /><p className="text-xs text-slate-400 break-keep">요금 확인 → 유료 신청폼 작성 → 입금 안내 확인</p></div>
        </div>
      </section>

      <section id="installation" aria-labelledby="installation-title" className="scroll-mt-24 section-padding container-custom border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 id="installation-title" className="text-2xl md:text-3xl font-extrabold text-white">처음 이용하는 기사님</h2>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed break-keep">Google Play에서 직접 설치·업데이트합니다. 설치를 위한 별도 가입이나 신청폼 작성은 필요하지 않습니다.</p>
          <ol className="grid md:grid-cols-3 gap-5 mt-8">{[
            { title: "Google Play 설치", text: "휴대폰에서 Google Play의 Driver Hub 앱을 설치합니다." },
            { title: "권한 설정", text: "앱 안내에 따라 접근성 및 다른 앱 위에 표시(오버레이) 권한을 설정합니다." },
            { title: "무료 이용", text: "설정 후 2026년 10월 15일까지 무료로 이용합니다. 유료 전환은 10월 16일 낮 12시부터입니다." },
          ].map((step, i) => <li key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-300 font-bold mb-4">{i + 1}</span><h3 className="font-bold text-white">{step.title}</h3><p className="text-sm text-slate-400 mt-3 leading-relaxed break-keep">{step.text}</p></li>)}</ol>
          <div className="grid sm:flex gap-3 mt-7"><InstallButton /><CafeButton /></div>
        </div>
      </section>

      <section id="contact-form" aria-labelledby="apply-title" className="scroll-mt-24 section-padding container-custom border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 id="apply-title" className="text-2xl md:text-3xl font-extrabold text-white">유료 이용 신청 방법</h2>
          <p className="text-sm text-slate-400 mt-4 break-keep">사용할 앱과 요금을 확인한 뒤, 공개 신청폼에서 신청합니다.</p>
          <ol className="grid sm:grid-cols-2 gap-5 mt-8">{applicationSteps.map((step, i) => <li key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"><p className="text-blue-300 text-sm font-bold mb-3">STEP {i + 1}</p><h3 className="text-white font-bold">{step.title}</h3><p className="text-slate-400 text-sm leading-relaxed mt-3 break-keep">{step.text}</p></li>)}</ol>
          <div className="mt-6 rounded-2xl border border-blue-500/25 bg-blue-950/20 p-5 md:p-7">
            <h3 className="font-bold text-white mb-3">신청 정보와 기기 승인 코드</h3>
            <p className="text-sm text-slate-300 leading-relaxed break-keep">이름 · 휴대폰 번호 · 기기 승인 코드(콜ID) · 사용할 앱</p>
            <p className="text-sm text-slate-300 leading-relaxed mt-3 break-keep">Driver Hub 앱 설정에서 <strong className="text-white">‘기기 승인 코드 복사’</strong>를 누른 뒤 신청폼에 붙여넣어 주세요.</p>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-slate-400 leading-relaxed break-keep list-disc pl-5"><li>신청만으로 결제가 완료되지는 않습니다.</li><li>계좌와 송금 방법은 신청폼에서 확인합니다.</li><li>휴대폰 변경이나 앱 재설치 시 관리자에게 비공개로 문의합니다.</li><li>개인정보와 기기 승인 코드는 카페 댓글 대신 신청폼에 입력합니다.</li></ul>
          <div className="mt-7 grid sm:flex gap-3"><ApplyButton /><CafeButton /></div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section-padding container-custom">
        <div className="max-w-5xl mx-auto"><h2 id="faq-title" className="text-2xl md:text-3xl font-extrabold text-white mb-8">자주 묻는 질문</h2><div className="space-y-3">{faqs.map(faq => <details key={faq.question} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"><summary className="cursor-pointer text-sm font-semibold text-slate-200 leading-relaxed">{faq.question}</summary><p className="text-sm text-slate-400 mt-4 leading-relaxed break-keep">{faq.answer}</p></details>)}</div></div>
      </section>
    </div>
  );
}
