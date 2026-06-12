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
            Building Infrastructure for Automation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Intelligent Systems for <span className="text-accent">Commerce</span> & Engineering.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance mt-4">
            QAgent Labs builds modern infrastructure combining artificial intelligence, supply chain intelligence, and engineering automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild className="group">
              <Link href="/seller-field" className="flex items-center font-medium">
                Explore SELLER FIELD
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=harrison.park@qagentlabs.com&su=QAgentLabs%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                Contact Us
              </a>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col h-full border-accent/20 shadow-md transition-all hover:shadow-lg hover:border-accent/40 bg-background relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent ring-1 ring-inset ring-accent/20">
                  Active
                </span>
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                  <PackageSearch className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">SELLER FIELD</CardTitle>
                <CardDescription className="text-base mt-2">
                  Intelligent systems for premium consumer tech curation & B2B automation.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  QAgentLabs의 독보적인 AI 스펙 검증 시스템을 통과한 지능형 가전 및 스마트 오피스 제품을 선보이는 프리미엄 기술 쇼룸입니다.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>3대 기술 검증 큐레이션</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>v8 AI 엔진 B2B 유통망 연계</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto">
                <Link href="/seller-field" className="text-accent text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
                  Explore Showroom <ArrowRight className="ml-1 h-3 w-3" />
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
                  <Bot className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">AI Automation</CardTitle>
                <CardDescription className="text-base mt-2">
                  Execution-based AI systems that automate internal workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  We build AI agents that execute tasks, connect company data, and automate operations such as reporting and Slack delivery.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>Internal workflow automation</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>Slack / DB connected execution</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto">
                <Link href="/ai-automation" className="text-accent text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
                  Explore service <ArrowRight className="ml-1 h-3 w-3" />
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
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>카카오·티맵 콜 판단 신호등</span>
                  </div>
                  <div className="flex items-center text-sm">
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

      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <div className="bg-primary text-primary-foreground rounded-2xl overflow-hidden shadow-xl grid md:grid-cols-2 relative">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
                Featured Showroom
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">SELLER FIELD</h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
                QAgentLabs의 차세대 AI 공간 로봇 청소기부터 최고 사양 스마트 오피스 기기까지 아우르는 기술 집약형 테크 쇼룸을 만나보세요.
              </p>
              <div>
                <Button variant="secondary" asChild>
                  <Link href="/seller-field">Explore Tech Showroom</Link>
                </Button>
              </div>
            </div>
            <div className="bg-muted border-l border-primary-foreground/10 p-10 flex items-center justify-center relative min-h-[300px]">
              <div className="w-full max-w-sm aspect-[4/3] rounded bg-background border border-border shadow-sm flex flex-col justify-between p-6 relative">
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <div className="w-24 h-4 bg-muted rounded font-mono text-[10px] flex items-center px-2 text-muted-foreground">ACTIVE_AI_NODE</div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-3">
                  <div className="h-6 bg-muted/65 border border-border rounded flex items-center px-3 font-mono text-[9px] text-slate-500">S-ROBOT_X1_UNIT: OPERATING</div>
                  <div className="h-6 bg-muted/65 border border-border rounded flex items-center px-3 font-mono text-[9px] text-slate-500">MULTIHUB_POWER: PD_100W</div>
                </div>
              </div>
            </div>
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
                    TECH SHOWROOM
                  </div>
                  <h3 className="text-3xl font-bold mb-4">SELLER FIELD</h3>
                  <p className="text-xl text-foreground/80 mb-6 font-medium">Intelligent Home & Office Device Showroom</p>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    QAgentLabs가 직접 검증하고 입증한 최상위 테크 브랜드 큐레이션. 3D 스캔 기반 공간 매핑 로봇 가전부터 초고속 데이터 전송 멀티 허브까지, 하이엔드 테크 생태계를 한 페이지에서 정밀하게 파악하십시오.
                  </p>
                  <Button variant="outline" className="w-fit group-hover:bg-accent group-hover:text-accent-foreground transition-colors" asChild>
                    <Link href="/seller-field">
                      Explore Showroom <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
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
