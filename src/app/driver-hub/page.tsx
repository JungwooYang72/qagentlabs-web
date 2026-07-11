"use client";
 
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import ContactForm from "@/app/contact/ContactForm";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  MapPin,
  Play,
  Settings,
  HelpCircle,
  Shield,
  Smartphone,
  Navigation,
  Sparkles,
  Download,
  Copy
} from "lucide-react";

// ==========================================


type ChatMessage = {
  sender: "ai" | "user";
  text: string;
};

// 시뮬레이터 가상 데이터 목록
const SIMULATED_LOCATIONS = [
  {
    location: "서울 강남역 인근",
    score: 87,
    recommendations: ["신논현역 방향 (수요 증가)", "서초대로 변 대기 (광역콜 다수)", "역삼역 방향 이동 (먹자골목 연계)"],
    escapeTip: "강남대로는 대기 기사가 많으므로 이면도로 샛길이나 테헤란로 빌딩가 근처 배후 수요를 공략하세요."
  },
  {
    location: "경기 성남 분당 정자동",
    score: 74,
    recommendations: ["미금역 상권 이동 (20% 가량 수요 높음)", "정자역 백궁광장 인근 대기", "판교역 이동 (신분당선 연계 복귀 용이)"],
    escapeTip: "판교 IC 진입로 부근이나 동판교 테크노밸리 내부가 퇴근/야간 광역콜 발생 빈도가 양호합니다."
  },
  {
    location: "인천 송도 센트럴파크 주변",
    score: 62,
    recommendations: ["송도컨벤시아 인근 상업지구", "해양경찰청 청사 인근 먹자골목", "캠퍼스타운역 방향 복귀 준비"],
    escapeTip: "송도는 23시 이후 관외 탈출 콜이 드물어지므로, 인천1호선 전철을 이용한 원인재/부평 복귀 전략을 병행하십시오."
  },
  {
    location: "서울 마포 합정역 인근",
    score: 81,
    recommendations: ["홍대입구 삼거리 방향", "망원역 이면도로 상권", "상수역 인근 카페거리"],
    escapeTip: "강변북로 진입이 용이한 합정오거리 부근에서 대기하면 일산, 파주, 김포 방면 광역콜을 수신하기 좋습니다."
  },
  {
    location: "경기 수원 인계동 수원시청 주변",
    score: 89,
    recommendations: ["나혜석거리 초입 대기", "수원역 상업지구 이동 (버스 노선 확보)", "영통역 중심 상권 연계"],
    escapeTip: "인계동 중심 상권은 콜 수요가 늦은 시간까지 유지되지만, 기사 공급 또한 집중되므로 가급적 외곽 광역 버스 정류장 근처에서 대기하십시오."
  }
];

export default function DriverHubPage() {
  // 1. FAQ 아코디언 상태
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 2. 전략보고서 시뮬레이터 상태
  const [simIndex, setSimIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // 3. 챗봇 상태
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "안녕하세요! QAgent Driver Hub AI 도우미입니다. 대기 전략이나 오지 복귀, 콜 수락 기준 등에 대해 물어보세요. (예: '지금 위치에서 어디로 갈까요?')"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // 시뮬레이터 새로고침 핸들러
  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setSimIndex((prev) => (prev + 1) % SIMULATED_LOCATIONS.length);
      setIsSimulating(false);
    }, 800);
  };

  // 챗봇 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // 챗봇 질문 전송
  const handleSendChat = async (textToSend?: string) => {
    const messageText = textToSend || chatInput;
    if (!messageText.trim() || chatLoading) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: messageText }]);
    if (!textToSend) setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "driver", // 드라이버 모드 명시
          messages: [
            ...chatMessages.map((m) => ({
              role: m.sender === "ai" ? "assistant" : "user",
              content: m.text
            })),
            { role: "user", content: messageText }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`상담 지연 (${response.status})`);
      }

      const data = await response.json();
      const reply = data.reply || "답변을 가져오지 못했습니다. 다시 시도해 주세요.";
      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: "일시적으로 AI 도우미 응답에 지연이 발생하고 있습니다. 잠시 후 다시 입력해 주세요." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // 챗봇 예시 질문 클릭 핸들러
  const handleQuickQuestion = (question: string) => {
    void handleSendChat(question);
  };

  const currentSim = SIMULATED_LOCATIONS[simIndex];

  return (
    <div className="flex flex-col w-full bg-slate-950 text-slate-100 pb-20 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-28 md:pt-36 md:pb-40 border-b border-slate-900 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="container-custom relative z-10 flex flex-col items-center text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-950/50 px-4 py-1.5 text-xs text-blue-400 font-semibold mb-6 shadow-sm uppercase tracking-widest backdrop-blur-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Beta Release
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            QAgent <span className="text-blue-500">Driver Hub</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-300 max-w-2xl mt-2 break-keep">
            대리기사 콜판정·이동전략 보조 AI
          </p>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mt-4 leading-relaxed break-keep">
            티맵/카카오 대리기사 앱의 콜 정보를 기반으로 좋은 콜과 일반 콜을 색상 신호로 구분하고, 현재 위치 기준 주변 이동 전략을 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto justify-center">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 !text-slate-950 font-black px-8 h-14 text-base shadow-lg shadow-yellow-400/10 border-0" asChild>
              <a href="#contact-form" className="text-slate-950 !text-slate-950">
                베타 신청하기
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:text-white font-bold px-8 h-14 text-base" asChild>
              <a href="#contact-form" className="text-slate-200 hover:text-white">
                사용 문의하기
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">핵심 기능 안내</h2>
            <p className="text-slate-400 max-w-2xl mx-auto break-keep text-sm md:text-base">
              현장 대리기사님들이 더 빠르게 판단하고 덜 걸을 수 있도록, 스마트폰 오버레이와 데이터 보고서가 실시간으로 보조합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <Card className="bg-slate-900/40 border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all flex flex-col h-full rounded-2xl overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                  <Play className="h-5 w-5 transform rotate-90" />
                </div>
                <CardTitle className="text-xl text-white font-bold">콜 등급 신호 표시</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed mb-6 break-keep">
                  카카오/티맵 콜 목록 및 수락 팝업 화면에서 콜 화면의 정보를 기기 안에서 분석하여 적합도를 즉시 직관적인 색상 신호로 알려줍니다.
                </p>
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
                    <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 relative"></span>
                    <span className="text-sm font-semibold text-emerald-400">초록</span>
                    <span className="text-xs text-slate-400">아주 좋은 콜</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full bg-lime-400"></span>
                    <span className="text-sm font-semibold text-lime-300">연두</span>
                    <span className="text-xs text-slate-400">좋은 콜</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full bg-orange-500"></span>
                    <span className="text-sm font-semibold text-orange-400">주황</span>
                    <span className="text-xs text-slate-400">괜찮은 콜</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full bg-yellow-500"></span>
                    <span className="text-sm font-semibold text-yellow-400">노랑</span>
                    <span className="text-xs text-slate-400">일반적인 콜</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full bg-slate-500"></span>
                    <span className="text-sm font-semibold text-slate-300">회색</span>
                    <span className="text-xs text-slate-400">단가가 낮거나 판단이 어려운 콜</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3.5 w-3.5 rounded-full border border-slate-600 bg-transparent"></span>
                    <span className="text-sm font-semibold text-slate-500">표시 없음</span>
                    <span className="text-xs text-slate-400">오지·장거리 픽업 등 권하지 않는 콜</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-slate-900/40 border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all flex flex-col h-full rounded-2xl overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl text-white font-bold">최근 판정 상태 진단</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed mb-6 break-keep">
                  앱이 콜 화면의 주요 정보를 제대로 인식했는지 투명하게 노출합니다. 팝업이 감지되었는지, 리스트 형태에서 감지되었는지 실시간으로 모니터링하여 동작 이상 여부를 자가진단할 수 있습니다.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>[감지] 카카오대리 리스트형 콜 화면 인식 완료</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>[판정] 요금 25,000원 / 목적지 인천 서구 검단 (일반 등급 판정)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>[로그] 팝업 알림 오버레이 활성화 성공</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3: Strategic Report Simulator */}
            <Card className="bg-slate-900/40 border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all flex flex-col h-full rounded-2xl overflow-hidden md:col-span-2">
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400">
                      <Navigation className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl text-white font-bold">위치 기반 전략보고서 (데모 시뮬레이터)</CardTitle>
                  </div>
                  <Button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                    시뮬레이션 새로고침
                  </Button>
                </div>
                <CardDescription className="text-xs text-yellow-500 font-medium mt-1">
                  ⚠️ 데모 화면입니다. 실제 앱의 전략보고서는 현재 위치, 시간대, 요일, 기본 수요 룰을 기준으로 생성되며 실제 수익, 배차, 콜 수신을 보장하지 않습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-2 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed mb-6 break-keep">
                  기사님이 서 계신 현재 위치를 바탕으로 반경 500m 이내 콜 가능성 점수와 주변 10km 범위의 주요 상권 이동 후보지 TOP 3를 추천하여 불필요한 도보 대기 시간을 아껴줍니다.
                </p>

                <div className="grid sm:grid-cols-12 gap-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80">
                  <div className="sm:col-span-5 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>현재 추정 위치</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-3">{currentSim.location}</div>
                    
                    <div className="text-xs text-slate-400 mb-1">콜 가능성 점수</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-purple-400">{currentSim.score}</span>
                      <span className="text-sm text-slate-400">/ 100점</span>
                    </div>
                  </div>

                  <div className="sm:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-2 font-semibold">이동 추천 TOP 3 후보</div>
                      <ol className="space-y-1.5">
                        {currentSim.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold">{i + 1}</span>
                            <span className="text-slate-200">{rec}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-400 italic">
                      <span className="text-purple-400 font-semibold block not-italic mb-1">오지 탈출 보조 팁</span>
                      "{currentSim.escapeTip}"
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-slate-900/40 border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all flex flex-col h-full rounded-2xl overflow-hidden md:col-span-2">
              <CardHeader className="p-6 pb-2">
                <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 text-pink-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl text-white font-bold">베타 피드백 & 신호 보정</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed mb-4 break-keep">
                  티맵대리 및 카카오대리 앱의 폰트나 레이아웃 패치로 인해 신호 미노출 또는 잘못된 콜 판정이 나타날 때, 기사님들의 오류 제보를 반영해 판정 기준을 개선합니다.
                </p>
                <div className="flex justify-end">
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 font-semibold flex items-center gap-1" asChild>
                    <a href="#contact-form" className="text-blue-400 hover:text-blue-300">
                      오류 제보 및 피드백 제출하기 <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Pricing Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-950/30 px-3.5 py-1 text-xs text-blue-400 font-semibold mb-4 tracking-wider">
              PRICING PLANS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">베타 요금 안내</h2>
            <p className="text-slate-400 break-keep max-w-xl mx-auto text-sm">
              초기 베타 참여자분들을 위한 한정 혜택과 투명한 가격 정책을 안내해 드립니다.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            {/* Price Card (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-b from-slate-900/60 to-slate-900/40 border-2 border-blue-500/40 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                Best Offer
              </div>
              <div>
                <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Standard Option</div>
                <h3 className="text-2xl font-black text-white mb-4">Basic</h3>
                
                <div className="flex items-baseline gap-1.5 border-b border-slate-800 pb-5 mb-5">
                  <span className="text-3xl font-extrabold text-white">월 10,000원</span>
                </div>

                <div className="bg-blue-950/40 border border-blue-500/10 rounded-xl px-4 py-2.5 mb-6 text-center">
                  <span className="text-xs font-bold text-blue-400">🎁 초기 베타 테스터 첫 1개월 무료 혜택</span>
                </div>

                <div className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">포함 서비스 기능</div>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>콜 등급 색상 신호 (초록 / 연두 / 주황 / 노랑 / 회색 / 표시 없음)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>실시간 수락 팝업 및 리스트 판정 상태 확인</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>현재 위치 기반 500m 이내 콜 가능성 점수</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>반경 10km 이동 추천 TOP 3 및 오지 탈출 보조</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>대리기사 전용 AI 상담 도우미 베타 이용</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>티맵/카카오 콜판정 피드백에 따른 실시간 신호 보정</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Details & Account (7 cols) */}
            <div className="md:col-span-7 bg-slate-900/20 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-white">결제 및 서비스 가이드</h3>
                
                <ul className="space-y-3.5 text-sm text-slate-400 leading-relaxed break-keep">
                  <li className="flex gap-2.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <p>🎁 초기 베타 테스터는 <strong>APK 설치 승인일(다운로드 링크 지급일)로부터 1개월간</strong> 무료로 이용합니다. (신청일 기준이 아닙니다. 무료 기간 종료 후 Basic 월 10,000원으로 전환됩니다.)</p>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <p>무료 기간이 종료된 이후에는 Basic 요금제로 전환되어 <strong>월 10,000원 선입금 방식</strong>으로 운영됩니다.</p>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <p>현재는 계좌이체 선입금을 중심으로 결제를 처리하며, 카드결제 및 자동 정기결제 방식은 추후 검토 예정입니다.</p>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <p>더 상세한 고급 보고서, 기사 맞춤 개인화 추천, 챗봇 고도화 등의 추가 업그레이드 기능은 향후 버전 배포 시 안내드릴 예정입니다.</p>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-xs text-slate-400 font-semibold mb-2">💰 입금 계좌 정보 (계좌번호 터치 시 전체 선택)</div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-inner">
                    <div>
                      <div className="font-mono text-base font-bold text-blue-400 select-all tracking-wider">기업은행 492-075699-04-010</div>
                      <div className="text-xs text-slate-400 mt-1">예금주: <span className="text-slate-300 font-semibold">양*우(큐에이전트랩스)</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-4 text-xs text-slate-400 space-y-2 leading-relaxed break-keep">
                  <div className="text-yellow-500 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    안내 및 이용 주의사항
                  </div>
                  <div>- 입금하시기 전, 상단의 버튼을 통해 베타 신청 또는 문의 등록을 반드시 먼저 완료해 주세요.</div>
                  <div>- 결제 승인 및 이용 권한 부여 안내는 기사님의 연락처를 통해 개별 연락으로 신속히 도와드립니다.</div>
                  <div>- 본 베타 서비스는 실제 수익이나 배차를 보장하지 않으며, 최종 주행 판단 책임은 전적으로 기사 본인에게 있습니다.</div>
                  <div>- 본 서비스는 약관 위반 소지가 있는 자동수락 및 자동클릭 매크로성 기능을 절대 제공하지 않습니다.</div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-5 border-t border-slate-900/60">
                <Button className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 !text-slate-950 font-black px-6 py-3 text-xs md:text-sm h-auto flex-1 shadow-lg border-0" asChild>
                  <a href="#contact-form" className="text-slate-950 !text-slate-950">
                    베타 신청하기
                  </a>
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-200 hover:text-white font-bold px-6 py-3 text-xs md:text-sm h-auto flex-1" asChild>
                  <a href="#contact-form" className="text-slate-200 hover:text-white">
                    결제 문의하기
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning/Disclaimer Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-900 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

          <div className="flex gap-4 items-start mb-6">
            <div className="bg-yellow-500/10 p-2.5 rounded-lg border border-yellow-500/20 shrink-0 text-yellow-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">이용 전 반드시 숙지할 주의사항</h2>
              <p className="text-sm text-yellow-500 font-medium mt-1">대리기사님들을 위한 정직하고 안전한 가이드라인</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-400 leading-relaxed break-keep">
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">1.</span>
                <p>본 서비스는 베타 테스트 버전이며, <strong>실제 수익 증가나 배차 빈도를 절대 보장하지 않습니다.</strong></p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">2.</span>
                <p><strong>자동수락(매크로)이나 자동클릭 기능을 제공하지 않습니다.</strong> 콜 목록 감지와 신호 판단 보조 역할만 수행합니다.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">3.</span>
                <p>플랫폼 서비스 이용 약관이나 보안 정책을 위반/우회하기 위한 부정한 목적의 기능이 포함되어 있지 않습니다.</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">4.</span>
                <p>최종 운행 판단 및 수락 클릭 행동은 전적으로 <strong>기사 본인의 책임과 주관</strong>에 따릅니다.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">5.</span>
                <p>콜 정보 오버레이 감지를 위해 스마트폰 내 <strong>접근성 권한 및 다른 앱 위에 표시 권한</strong> 허용이 요구됩니다.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-500 font-bold shrink-0">6.</span>
                <p>전략보고서의 콜 가능성 점수는 실시간 기후, 요일, 시간대 기반의 <strong>초기 추정 수치</strong>이며 향후 정교화 예정입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Flow Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">서비스 이용 절차</h2>
            <p className="text-slate-400 break-keep max-w-xl mx-auto text-sm">
              베타 승인 후 앱 설치부터 실제 운행 적용 및 피드백 제보까지의 6단계 프로세스입니다.
            </p>
          </div>

          <div className="relative pl-8 space-y-8 md:space-y-12">
            <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-slate-800"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">1</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">앱 다운로드 및 설치</h4>
                <p className="text-slate-400 text-sm break-keep">베타 테스터에 당첨되신 후 안내받으신 다운로드 파일(APK)을 안드로이드 폰에 설치합니다.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">2</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">스마트폰 오버레이 및 접근성 권한 켜기</h4>
                <p className="text-slate-400 text-sm break-keep">콜 리스트 정보 수신을 위해 앱에서 요청하는 필수 권한들을 스마트폰 설정에서 켭니다.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">3</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">기본 동작 테스트</h4>
                <p className="text-slate-400 text-sm break-keep">앱 내에 마련된 'TEST 신호 확인' 버튼을 클릭해 가상의 신호등 오버레이가 알맞게 표출되는지 테스트합니다.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">4</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">운행 현장 실제 콜 판정 확인</h4>
                <p className="text-slate-400 text-sm break-keep">티맵대리 혹은 카카오대리 기사용 화면에 띄워지는 콜 목록에서 6단계 등급 신호(초록, 연두, 주황, 노랑, 회색, 표시 없음)를 확인합니다.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">5</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">전략보고서 활용 및 대기지 추천 확인</h4>
                <p className="text-slate-400 text-sm break-keep">콜이 잘 뜨지 않을 때 전략보고서를 켜서 주변 상권으로의 이동 여부와 이동 점수를 활용합니다.</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative z-10 flex gap-4 items-start">
              <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-400">6</div>
              <div>
                <h4 className="font-bold text-lg text-white mb-1">오류 및 개선사항 피드백 전송</h4>
                <p className="text-slate-400 text-sm break-keep">오류가 발생하거나 개선 의견이 있을 경우 피드백 제출 폼으로 스크린샷과 상황을 제보해 기능 보정을 돕습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APK Download & Guide Section */}
      <section id="download" className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">APK 다운로드 및 설치 안내</h2>
            <p className="text-slate-400 break-keep max-w-xl mx-auto text-sm">
              QAgent Driver Hub APK는 무료 베타 신청 승인 후 개별 안내됩니다.<br />
              무단 배포를 막고 현장 피드백을 정확히 받기 위해 신청자 확인 후 다운로드 링크와 설치 가이드를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            {/* Download Card */}
            <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mb-3">
                  <Download className="w-4 h-4" />
                  <span>무료 베타 승인 후 제공</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">QAgent Driver Hub</h3>
                
                <ul className="space-y-3.5 text-xs text-slate-400 border-b border-slate-800 pb-5 mb-5 font-mono">
                  <li className="flex justify-between">
                    <span>버전</span>
                    <span className="text-slate-200">베타 승인 후 안내</span>
                  </li>
                  <li className="flex justify-between">
                    <span>업데이트 날짜</span>
                    <span className="text-slate-200">베타 운영 중</span>
                  </li>
                  <li className="flex justify-between">
                    <span>파일 크기</span>
                    <span className="text-slate-200">승인 후 안내</span>
                  </li>
                  <li className="flex justify-between">
                    <span>상태</span>
                    <span className="text-amber-500 font-bold">베타 승인 후 제공</span>
                  </li>
                </ul>

                <div className="text-xs font-semibold text-slate-300 mb-2">기사 주안점</div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-6 break-keep">
                  - 카카오 대리 / 티맵 대리 콜 목록 신호등 분석<br/>
                  - 리스트형 및 수락 팝업 신호 분석 연동<br/>
                  - 실시간 500m 반경 콜 가능성 지표 제공 (데모)
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  disabled 
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 text-slate-500 border border-slate-700 font-bold h-12 text-sm cursor-not-allowed"
                >
                  베타 신청 후 다운로드 안내 받기
                </button>
                <a 
                  href="#contact-form" 
                  className="w-full flex items-center justify-center rounded-xl bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold h-10 text-xs transition-colors"
                >
                  베타 테스터 신청하기
                </a>
              </div>
            </div>

            {/* Quick Installation Reference */}
            <div className="md:col-span-7 bg-slate-900/10 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">이용 및 설치 흐름</h3>
                <ul className="space-y-3 text-xs md:text-sm text-slate-400 leading-relaxed break-keep">
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">1</span>
                    <p><strong>무료 베타 신청:</strong> 하단 신청 폼을 통해 신청서를 제출합니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">2</span>
                    <p><strong>QAgentLabs 확인 및 개별 연락:</strong> 심사를 거쳐 기사님께 개별 승인 전화를 드립니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">3</span>
                    <p><strong>APK 다운로드 링크 수신:</strong> 다운로드 경로와 개별 비밀번호를 전송받습니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">4</span>
                    <p><strong>Android 보안 설정 확인:</strong> '출처를 알 수 없는 앱 설치 ＞ 이 출처 허용'을 켭니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">5</span>
                    <p><strong>접근성 권한 허용:</strong> 콜 텍스트 식별을 위해 스마트폰 접근성 설정을 활성화합니다. (자동 조작 기능 무관)</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">6</span>
                    <p><strong>오버레이 권한 허용:</strong> 다른 앱 위에 표시 권한을 허용하여 신호등 창을 띄웁니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">7</span>
                    <p><strong>카카오/티맵 콜 화면에서 신호등 확인:</strong> 기사용 앱에서 6단계 불빛과 표시 없음 상태가 정상 작동하는지 주행 확인합니다.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">8</span>
                    <p><strong>피드백 제보:</strong> 콜 판정이 이상하거나 신호가 안 뜨는 경우 캡처와 함께 하단 폼으로 의견을 전달합니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal ContactForm Section */}
      <section id="contact-form" className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">무료 베타 신청 및 문의</h2>
            
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 mb-8 text-xs text-slate-400 space-y-3 leading-relaxed break-keep">
              <div className="font-semibold text-slate-300 text-sm mb-1">📋 유형별 안내 사항</div>
              <div>• <strong>무료 베타 신청:</strong> 무료 베타 신청서를 남겨주시면 확인 후 APK 설치 안내를 개별 연락드립니다. (자동수락/자동클릭은 제공하지 않습니다)</div>
              <div>• <strong>오류/피드백 제보:</strong> 오류 화면 캡처, 콜 화면에서 신호가 뜨지 않은 상황, 판정이 이상했던 내용을 남겨주시면 개선에 참고하겠습니다. (캡처 파일은 회신 안내 후 전달받겠습니다)</div>
              <div>• <strong>일반 문의사항:</strong> 지원 기종, 설치 방법, 카카오·티맵 지원 범위, 권한 설정 관련 문의를 남겨주세요.</div>
            </div>

            <div className="text-slate-200 text-left">
              <ContactForm source="driver-hub" defaultInquiryType="beta-apply" />
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Share Script Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-900/30 border border-slate-900 p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-3">오픈채팅/문자 배포용 홍보문</h3>
            <p className="text-xs text-slate-400 mb-6 break-keep">
              주변 동료 대리기사님들께 Driver Hub 무료 베타 소식을 널리 공유해 보세요!
            </p>
            
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all relative group max-w-xl mx-auto">
              {`대리기사 콜 판단 신호등 앱 QAgent Driver Hub 무료 베타테스터를 모집합니다.

카카오·티맵 콜 화면 위에 초록·연두·주황·노랑·회색·표시 없음의 6단계 신호를 표시해 콜 판단을 돕는 보조 앱입니다.

자동수락이나 자동클릭은 없으며, 기사님의 최종 판단을 돕는 참고 정보입니다.

무료 베타 기간 동안 사용해보시고 6단계 불빛 위치나 콜판정 오류를 알려주실 기사님을 찾습니다.

신청 링크: https://qagentlabs.com/driver-hub`}
            </div>

            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => {
                  const textToCopy = `대리기사 콜 판단 신호등 앱 QAgent Driver Hub 무료 베타테스터를 모집합니다.

카카오·티맵 콜 화면 위에 초록·연두·주황·노랑·회색·표시 없음의 6단계 신호를 표시해 콜 판단을 돕는 보조 앱입니다.

자동수락이나 자동클릭은 없으며, 기사님의 최종 판단을 돕는 참고 정보입니다.

무료 베타 기간 동안 사용해보시고 6단계 불빛 위치나 콜판정 오류를 알려주실 기사님을 찾습니다.

신청 링크: https://qagentlabs.com/driver-hub`;
                  void navigator.clipboard.writeText(textToCopy);
                  alert("홍보문이 클립보드에 복사되었습니다. 원하는 곳에 붙여넣기(Ctrl+V) 하세요!");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 text-xs font-semibold transition-all border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5" />
                홍보문 텍스트 복사하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Hub Custom Chatbot Section */}
      <section className="section-padding container-custom bg-slate-950 border-b border-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 flex items-center justify-center gap-2">
              <Bot className="w-7 h-7 text-blue-500" />
              대리기사 전용 AI 상담 도우미
            </h2>
            <p className="text-xs text-yellow-500 font-semibold max-w-xl mx-auto leading-relaxed break-keep">
              ⚠️ 대리기사 전용 챗봇은 베타 기능입니다. 운행 판단을 보조하기 위한 참고 답변을 제공하며, 실제 배차나 수익을 보장하지 않습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 bg-slate-900/30 border border-slate-850 p-6 rounded-2xl">
            {/* Quick Questions (4 cols) */}
            <div className="md:col-span-4 flex flex-col justify-start space-y-3">
              <div className="text-sm font-bold text-slate-300 mb-1 pl-1">자주 묻는 예시 질문</div>
              <button
                onClick={() => handleQuickQuestion("지금 위치에서 어디로 이동하는 게 좋을까요?")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 p-3 rounded-xl transition-all leading-normal break-keep"
              >
                📍 지금 위치에서 어디로 이동할까요?
              </button>
              <button
                onClick={() => handleQuickQuestion("외진 지역으로 들어가는 콜을 받았는데 어떻게 대처해야 하나요?")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 p-3 rounded-xl transition-all leading-normal break-keep"
              >
                ⛰ 오지 콜을 받았는데 어디로 빠져나가야 하나요?
              </button>
              <button
                onClick={() => handleQuickQuestion("카카오대리 콜 카드가 한참 동안 뜨지 않을 때 대기 방법이 궁금합니다.")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 p-3 rounded-xl transition-all leading-normal break-keep"
              >
                ⏱ 카카오 콜이 안 뜰 때 어떻게 대기하면 좋을까요?
              </button>
              <button
                onClick={() => handleQuickQuestion("고객이 운행 중에 목적지를 다른 먼 곳으로 바꾸자고 합니다.")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 p-3 rounded-xl transition-all leading-normal break-keep"
              >
                🚗 고객이 목적지를 바꾸자고 하면 어떻게 대응하나요?
              </button>
              <button
                onClick={() => handleQuickQuestion("콜을 부득이하게 취소하고 싶은데 콜센터에 어떻게 얘기해야 불이익이 적나요?")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 p-3 rounded-xl transition-all leading-normal break-keep"
              >
                📞 콜센터에 취소 사유를 어떻게 말하면 좋을까요?
              </button>
            </div>

            {/* Chat Body (8 cols) */}
            <div className="md:col-span-8 flex flex-col h-[400px] bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed break-keep ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white align-self-end self-end rounded-tr-none"
                        : "bg-slate-900 text-slate-200 self-start rounded-tl-none border border-slate-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {chatLoading && (
                  <div className="text-xs text-slate-500 self-start italic pl-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-ping"></span>
                    AI 도우미가 답변을 분석하고 있습니다...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 border-t border-slate-900 bg-slate-900/20 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      void handleSendChat();
                    }
                  }}
                  placeholder="대기 및 운행에 관해 궁금한 점을 적어보세요..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-700"
                  disabled={chatLoading}
                />
                <Button
                  onClick={() => void handleSendChat()}
                  disabled={chatLoading || !chatInput.trim()}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm px-4 py-2 shrink-0 h-auto"
                >
                  전송
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding container-custom bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">자주 묻는 질문 (FAQ)</h2>
            <p className="text-slate-400 break-keep max-w-xl mx-auto text-sm">
              QAgent Driver Hub에 관해 기사님들이 많이 여쭤보시는 핵심 질문들을 모았습니다.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 자동으로 콜을 수락하나요?</span>
                {openFaqIndex === 0 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 0 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. <strong>아닙니다.</strong> QAgent Driver Hub는 콜 판단을 보조하는 색상 신호와 대기지 추천을 담은 전략보고서를 기사님께 제공해 드릴 뿐, 대리 기사 전용 앱의 콜 카드를 강제로 클릭하거나 자동으로 수락하는 매크로 기능을 일절 포함하지 않습니다. 최종 수락은 기사님이 직접 화면을 조작하여 실행하셔야 합니다.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 수익을 확실히 보장해 주나요?</span>
                {openFaqIndex === 1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 1 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. <strong>아닙니다.</strong> 전략보고서 상에 표출되는 콜 가능성 점수나 이동 추천 정보는 날씨, 요일, 시간대, 해당 권역의 역사적 콜 발생 룰을 기반으로 하는 통계적 초기 추정 수치입니다. 실제 배차 빈도, 특정 시간의 콜 수신 여부 또는 실제 매출 금액을 보장해 드리지 않으므로, 운행 판단 시에는 기사님 본인의 운행 경험을 연계하여 보조 지표로만 참고해 주시기 바랍니다.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 어떤 대리기사 앱에서 작동하나요?</span>
                {openFaqIndex === 2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 2 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. 베타 서비스 단계에서는 안드로이드 OS 환경의 <strong>티맵 대리기사 앱 및 카카오 T 대리기사용 앱</strong>을 중심으로 감지 테스트를 진행하고 있습니다. 향후 기사님들의 피드백을 통해 타 플랫폼이나 추가적인 운행 환경 지원을 넓혀나갈 로드맵을 지니고 있습니다.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 왜 스마트폰의 접근성 권한이 필요하나요?</span>
                {openFaqIndex === 3 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 3 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. 기사용 앱의 콜 카드 화면에 담긴 목적지 텍스트와 가격 정보를 식별하여 신호를 오버레이 팝업으로 띄우려면 접근성 권한이 기술적으로 필요합니다. 이는 기사님이 수동으로 확인해야 할 텍스트를 기기가 자동으로 인식하여 등급을 산출해 보여주기 위함이며, <strong>수락 버튼을 자동으로 누르거나 여타 해킹 목적의 행위와는 무관</strong>합니다.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(4)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 전략보고서는 어떤 기준으로 만들어지나요?</span>
                {openFaqIndex === 4 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 4 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. 전략보고서의 지표는 대리기사님이 보고서를 요청하신 실시간 위치의 위경도 정보, 현재의 시간대, 오늘 요일, 그리고 과거 동일 조건 하에서의 표준적인 대리콜 발생 빈도 규칙(Rule)을 종합한 <strong>기초 예측 추정값</strong>입니다. 기사님들의 오류 제보를 반영해 판정 기준을 꾸준히 다듬어가고 있습니다.
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="border border-slate-900 rounded-xl bg-slate-900/20 overflow-hidden">
              <button
                onClick={() => toggleFaq(5)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-sm md:text-base text-white hover:bg-slate-900/40 transition-colors"
              >
                <span>Q. 기사님의 위치정보는 어떻게 사용되고 관리되나요?</span>
                {openFaqIndex === 5 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaqIndex === 5 && (
                <div className="p-5 pt-0 text-xs md:text-sm text-slate-400 border-t border-slate-900 bg-slate-950/40 leading-relaxed break-keep">
                  A. 전략보고서 기능을 사용할 때만 기기의 위치를 읽습니다. 읽은 위치는 기기 안에서만 사용되어 주변 대기지 후보와 콜 가능성 점수를 계산하며, 서버로 전송하거나 저장하지 않습니다. 위치 권한을 허용하지 않으셔도 콜 판정 기능은 정상적으로 작동합니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
