import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import AIChatbot from "@/components/features/AIChatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { ArrowRight, Box, Cpu, PackageSearch, Server, HardDrive, Network, Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32 md:pt-32 md:pb-40 border-b border-border">
        {/* Abstract technical background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

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
              <Link href="/seller-commerce" className="flex items-center font-medium">
                Explore Seller Commerce
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer" className="font-medium">Contact Us</a>
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
                <img
                  src="/qagent-flow-logo.png"
                  alt="QAgent Flow Logo"
                  className="object-contain w-full h-full"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">QAgent Flow</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              자율형 업무자동화 구축 솔루션. 유통과 제조 분야에서 반복 업무를 AI가 스스로 수행합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Video 1 */}
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

            {/* Video 2 */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Active Project: Seller Commerce */}
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
                <CardTitle className="text-xl">Seller Commerce</CardTitle>
                <CardDescription className="text-base mt-2">
                  Sales support services connecting product operations with external sales channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  We solve the operational bottleneck for technical products by providing structured product information and automation-driven content for sellers.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>Product operations support</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-border mr-2" /> <span>Structured channel expansion</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border mt-auto">
                <Link href="/seller-commerce" className="text-accent text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
                  View capabilities <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Active Project: AI Automation */}
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

            {/* Coming Soon: 3D Auto Design */}
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

            {/* Coming Soon: AI Supply Chain */}
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

      {/* Featured Hardware Section */}
      <section className="section-padding border-t border-border">
        <div className="container-custom">
          <div className="bg-primary text-primary-foreground rounded-2xl overflow-hidden shadow-xl grid md:grid-cols-2 relative">
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
                Featured Product
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                NX-802RU30
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
                Professional 8-bay rackmountable direct attached storage enclosure engineered for technical environments, NAS builders, and enterprise use.
              </p>
              <div>
                <Button variant="secondary" asChild>
                  <Link href="/products/nx-802ru30">View Technical Specifications</Link>
                </Button>
              </div>
            </div>
            <div className="bg-muted border-l border-primary-foreground/10 p-10 flex items-center justify-center relative min-h-[300px]">
              {/* Abstract placeholder for technical product */}
              <div className="w-full max-w-sm aspect-[4/3] rounded bg-background border border-border shadow-sm flex flex-col justify-between p-4 relative">
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <div className="w-20 h-4 bg-muted rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent/20 border border-accent/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 flex-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded border border-border/80 h-full w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Picks */}
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
            {/* Main Highlight: NX-802RU30 */}
            <div className="lg:col-span-7 flex flex-col h-full">
              <div className="border border-border bg-background p-8 md:p-10 rounded-2xl shadow-sm flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Server className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex w-fit items-center rounded bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20 mb-6 uppercase tracking-widest">
                    Anchor Node
                  </div>
                  <h3 className="text-3xl font-bold mb-4">NX-802RU30</h3>
                  <p className="text-xl text-foreground/80 mb-6 font-medium">
                    2U Rack Server Chassis for NAS & Home Server Builds
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    The core of our recommended storage architecture. Engineered for high-density environments, providing uncompromised direct-attached storage expansion with a SAS/SATA passthrough backplane for optimal ZFS performance.
                  </p>
                  <Button variant="outline" className="w-fit group-hover:bg-accent group-hover:text-accent-foreground transition-colors" asChild>
                    <Link href="/products/nx-802ru30">Review Technical Specs <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Supporting Components List */}
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
      {/* 챗봇 수동 추가 */}
      <AIChatbot />

      {/* 🚨 강제 렌더링 테스트 박스 🚨 */}
      <div style={{ position: "fixed", bottom: "100px", right: "50px", width: "120px", height: "50px", backgroundColor: "red", zIndex: 999999, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", borderRadius: "8px" }}>
        TEST BOX
      </div>
    </div>
  );
}
