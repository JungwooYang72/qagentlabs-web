import Link from "next/link";
import { Button } from "@/components/ui/Button";
import AIChatbot from "@/components/features/AIChatbot";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ArrowRight,
  Bot,
  Box,
  Cpu,
  HardDrive,
  Network,
  PackageSearch,
  Server,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32 md:pt-32 md:pb-40 border-b border-border">
        {/* Abstract technical background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="container-custom relative z-10 flex flex-col items-start gap-6 max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-secondary-foreground font-medium mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
            AI Automation & Intelligent Systems
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            반복되는 데이터 업무를 <span className="text-accent">AI 자동화 결과물</span>로 바꿉니다.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance mt-4 break-keep">
            엑셀, CSV, 상품데이터, 고객문의, 반복 업무 자료를 보내주시면 QAgentLabs 내부 AI 자동화 시스템으로 정리·분류·분석해 실무에 바로 사용할 수 있는 결과물로 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild className="group">
              <Link href="/contact" className="flex items-center font-medium">
                AI 자동화 무료진단 받기
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ai-automation" className="font-medium">
                서비스 자세히 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Videos: QAgent Flow */}
      <section className="section-padding bg-muted/10 border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white/5 rounded-lg p-1 border border-border mt-1">
                <img src="/qagent-flow-logo.png" alt="QAgent Flow Logo" className="object-contain w-full h-full" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">QAgent Flow</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              자율형 업무자동화 구축 솔루션. 유통과 제조 분야에서 반복 업무를 AI가 스스로 수행합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-black/50">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/csCgARA1byU"
                  title="QAgent Flow 자율형 업무자동화 유통분야"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="font-semibold text-lg text-center text-foreground">유통분야 자동화 (Commerce)</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-black/50">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/12OyuEsEcpE"
                  title="QAgent Flow 자율형 업무자동화 제조분야"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="font-semibold text-lg text-center text-foreground">제조분야 자동화 (Manufacturing)</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-black/50">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/xtq9RffO_3Q"
                  title="QAgent Flow 자율형 업무자동화 유통분야 업그레이드버전"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="font-semibold text-lg text-center text-foreground">유통분야 자동화 업그레이드버전</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Projects</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We focus on developing high-value systems that connect operational needs with technical execution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col h-full border-accent/20 shadow-md transition-all hover:shadow-lg hover:border-accent/40 bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent ring-1 ring-inset ring-accent/20">
                  Active
                </span>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                  <Bot className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">AI Automation</CardTitle>
                <CardDescription className="text-base mt-2">
                  엑셀, CSV, 상품데이터, 고객문의 등의 반복 데이터 정리 업무를 AI 자동화 결과물로 제공합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>데이터 정리·분류·분석</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>리포트·콘텐츠 초안 생성</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>반복 업무 자동화 구조 설계</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto flex flex-col gap-2 items-start w-full">
                <Link href="/contact" className="text-accent text-sm font-semibold flex items-center hover:opacity-80 transition-opacity">
                  무료진단 신청하기 <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
                <Link href="/ai-automation" className="text-muted-foreground text-xs font-medium flex items-center hover:opacity-80 transition-opacity">
                  서비스 자세히 보기 <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full border-accent/20 shadow-md transition-all hover:shadow-lg hover:border-accent/40 bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent ring-1 ring-inset ring-accent/20">
                  Active
                </span>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                  <Smartphone className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Driver Hub</CardTitle>
                <CardDescription className="text-base mt-2">
                  대리기사 콜 판단 보조 앱 & 이동 전략 솔루션
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  카카오·티맵 대리 콜 화면 위에 YELLOW/GREEN 신호등을 표시하여 콜 판단을 돕고, 실시간 대기지 추천 및 이동 전략을 지원하는 안전한 보조도구입니다.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>카카오·티맵 콜 판단 신호등</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>자동수락 아님 / 안전한 보조도구</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto">
                <Link href="/driver-hub" className="text-accent text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
                  Explore Driver Hub <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full bg-muted/50 border-border opacity-80 cursor-not-allowed">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-4 text-muted-foreground border border-border shadow-sm">
                  <Box className="h-6 w-6" />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">3D Auto Design</CardTitle>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Coming Soon
                  </span>
                </div>
                <CardDescription className="text-base mt-2">
                  Automated CAD modeling and spatial design generation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Algorithmic generation of 3D models and structural representations for engineering and architectural applications.
                </p>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full bg-muted/50 border-border opacity-80 cursor-not-allowed">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-4 text-muted-foreground border border-border shadow-sm">
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">AI Supply Chain</CardTitle>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Coming Soon
                  </span>
                </div>
                <CardDescription className="text-base mt-2">
                  Predictive sourcing and intelligent component tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Using machine learning to optimize technical hardware procurement, reducing lead times and predicting component availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-background">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">AI Automation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto break-keep">
              반복되는 데이터 정리, 분석, 문서화 업무를 AI 자동화 결과물로 바꿉니다.
            </p>
          </div>

          <div className="bg-muted/30 border border-border rounded-2xl p-8 md:p-12 shadow-sm mb-12">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed break-keep mb-8">
              QAgentLabs는 엑셀, CSV, 상품데이터, 고객문의, 반복 업무 자료를 받아 내부 AI 자동화 시스템으로 정리·분류·분석하고, 실무에 바로 사용할 수 있는 결과물로 제공합니다. 초기 상담, 데이터 구조 확인, 샘플 결과물 제작부터 시작해 고객의 반복 업무를 자동화 가능한 형태로 전환합니다.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  1. 데이터를 보내면 정리합니다
                </h3>
                <p className="text-sm text-muted-foreground break-keep leading-relaxed">
                  엑셀, CSV, 상품데이터, 고객문의, 반복 업무 자료를 정리표, 분석표, 리포트, 콘텐츠 초안 등으로 가공합니다.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  2. 내부 자동화로 처리합니다
                </h3>
                <p className="text-sm text-muted-foreground break-keep leading-relaxed">
                  고객사 시스템을 바로 구축하는 방식이 아니라, QAgentLabs 내부 자동화 시스템을 활용해 빠르게 결과물을 제공합니다.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  3. 자동화 구조로 전환합니다
                </h3>
                <p className="text-sm text-muted-foreground break-keep leading-relaxed">
                  한 번의 정리 작업에서 끝나지 않고, 반복 가능한 업무는 자동화 프로세스로 구조화할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border border-border bg-background p-6 md:p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-4">주요 제공 결과물</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">✔ <span>엑셀/CSV 데이터 정리본</span></li>
                <li className="flex items-center gap-2">✔ <span>상품데이터 정리 및 분류표</span></li>
                <li className="flex items-center gap-2">✔ <span>반복 업무 처리 결과표</span></li>
                <li className="flex items-center gap-2">✔ <span>데이터 요약 리포트</span></li>
                <li className="flex items-center gap-2">✔ <span>콘텐츠 초안 / 자동화 가능성 진단서</span></li>
                <li className="flex items-center gap-2">✔ <span>자동화 가능성 분석표 및 샘플 결과물</span></li>
              </ul>
            </div>
            <div className="border border-border bg-background p-6 md:p-8 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-4">적용 가능한 업무 예시</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">✔ <span>상품명, 카테고리, 가격, 재고 데이터 정리</span></li>
                <li className="flex items-center gap-2">✔ <span>엑셀/CSV 파일 정리 및 재구성</span></li>
                <li className="flex items-center gap-2">✔ <span>고객문의/상담 데이터 분류</span></li>
                <li className="flex items-center gap-2">✔ <span>반복 보고서 초안 작성 및 판매 데이터 요약</span></li>
                <li className="flex items-center gap-2">✔ <span>업무 프로세스 정리 및 반복 데이터 입력·분류</span></li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">AI 자동화 무료진단 받기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ai-automation">서비스 자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/20 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Infrastructure Picks</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Validated hardware components recommended by our engineering team. These selections form the baseline for specialized automation nodes, secure storage deployments, and high-throughput networking environments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 flex flex-col h-full">
              <div className="border border-border bg-background p-8 md:p-10 rounded-2xl shadow-sm flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Bot className="w-32 h-32 text-accent" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex w-fit items-center rounded bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20 mb-6 uppercase tracking-widest">
                    AI AUTOMATION
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI Automation</h3>
                  <p className="text-xl text-foreground/80 mb-6 font-medium">반복되는 데이터 업무를 AI 자동화 결과물로</p>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    엑셀, CSV, 상품데이터, 고객문의, 반복 업무 자료를 보내주시면 QAgentLabs 내부 AI 자동화 시스템으로 정리·분류·분석해 실무에 바로 사용할 수 있는 결과물로 제공합니다.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="w-fit group-hover:bg-accent group-hover:text-accent-foreground transition-colors" asChild>
                      <Link href="/contact">
                        무료진단 신청하기 <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href="/ai-automation">
                        서비스 자세히 보기
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center gap-4">
              <div className="border border-border bg-background p-6 rounded-xl hover:bg-muted/30 transition-colors flex gap-4 items-start">
                <div className="mt-1 bg-muted p-2 rounded-md border border-border shrink-0">
                  <Box className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Synology DS224+</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Reliable NAS platform for practical storage deployment and safe off-site replication.</p>
                </div>
              </div>

              <div className="border border-border bg-background p-6 rounded-xl hover:bg-muted/30 transition-colors flex gap-4 items-start">
                <div className="mt-1 bg-muted p-2 rounded-md border border-border shrink-0">
                  <HardDrive className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Samsung 990 PRO 2TB</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">High-performance NVMe SSD for fast storage workloads and system cache tiering.</p>
                </div>
              </div>

              <div className="border border-border bg-background p-6 rounded-xl hover:bg-muted/30 transition-colors flex gap-4 items-start">
                <div className="mt-1 bg-muted p-2 rounded-md border border-border shrink-0">
                  <Cpu className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">SK Hynix Platinum P41 2TB</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Professional-grade NVMe SSD balancing extreme speed with thermal stability.</p>
                </div>
              </div>

              <div className="border border-border bg-background p-6 rounded-xl hover:bg-muted/30 transition-colors flex gap-4 items-start">
                <div className="mt-1 bg-muted p-2 rounded-md border border-border shrink-0">
                  <Network className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">TP-Link Wi-Fi 7 Router</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Next-generation network infrastructure for high-speed, multi-gigabit wireless environments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIChatbot />
    </div>
  );
}
