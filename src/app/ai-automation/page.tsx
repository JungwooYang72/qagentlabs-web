import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  ArrowRight, 
  Bot, 
  Cpu, 
  Database, 
  Terminal, 
  MessageSquare, 
  CheckCircle2, 
  Workflow, 
  Briefcase, 
  Search, 
  LineChart, 
  Settings,
  ShieldCheck,
  Zap,
  Box,
  Activity,
  Server,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 자동화 에이전트 구축 | 사내 업무 자동화 시스템',
  description: '슬랙, 데이터베이스, 내부 시스템을 연결하여 반복 업무를 자동 수행하는 AI 자동화 에이전트를 구축합니다.',
};

export default function AIAutomationPage() {
  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* 1. Hero Section */}
      <section className="bg-muted/30 border-b border-border py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container-custom max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center rounded bg-secondary px-3 py-1 text-sm font-semibold mb-8 border border-border shadow-sm text-secondary-foreground uppercase tracking-widest">
            <Terminal className="w-4 h-4 mr-2 text-accent" />
            Execution-Based AI Solutions
          </div>
          
          {/* Only 1 H1 as requested for SEO */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 break-keep leading-tight">
            사내 업무를 자동으로 처리하는<br/>
            <span className="text-accent">AI 에이전트 구축</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed max-w-3xl font-medium break-keep mb-4">
            슬랙, 데이터베이스, 내부 도구와 연동하여 반복 업무를 자동 수행하는 실행형 <strong>AI 에이전트 구축</strong> 서비스를 제공합니다.<br/>
            반복 보고, 데이터 조회, 슬랙 전달 같은 업무를 자동화하여 <strong>하루 1~2시간 이상의 작업 시간을 절감할 수 있습니다.</strong>
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {/* CTA 1 (Hero Primary) */}
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 h-14 text-lg" asChild>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">우리 회사에 적용 가능한지 확인하기 <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
            {/* CTA 1 (Hero Secondary) */}
            <Button size="lg" variant="outline" className="font-semibold px-8 h-14 text-lg border-foreground/20 text-foreground" asChild>
              <Link href="#examples">적용 사례 확인하기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Problem Section (GEO & Limitations) */}
      <section className="section-padding container-custom bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">ChatGPT만으로는 왜 자동화가 어려울까?</h2>
            <p className="text-lg text-muted-foreground break-keep">현재 많은 기업들이 겪고 있는 생성형 AI 도입의 한계입니다.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border p-8 rounded-2xl bg-muted/20 text-center flex flex-col items-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-2">결과만 제공, 실행 불가</h3>
              <p className="text-sm text-muted-foreground break-keep">대화형 AI는 텍스트 답변만 줄 뿐, 실제 시스템에 접속하여 코드를 실행하거나 메시지를 발송하지 못합니다.</p>
            </div>
            
            <div className="border border-border p-8 rounded-2xl bg-muted/20 text-center flex flex-col items-center">
              <Activity className="w-10 h-10 text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-2">여전히 필요한 수작업</h3>
              <p className="text-sm text-muted-foreground break-keep">질문을 입력하고, 나온 답변을 복사해서 다시 보고서나 사내 메신저로 사람이 직접 옮겨야 합니다.</p>
            </div>
            
            <div className="border border-border p-8 rounded-2xl bg-muted/20 text-center flex flex-col items-center">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg mb-2">끊어지는 업무 흐름</h3>
              <p className="text-sm text-muted-foreground break-keep">기존 시스템과 연결되지 않기 때문에 작업 컨텍스트가 끊기며, 완전한 업무 파이프라인이 구성되지 않습니다.</p>
            </div>
          </div>
          
          <div className="mt-10 p-6 bg-accent/5 border border-accent/20 rounded-2xl text-center">
            <p className="text-xl font-bold text-foreground break-keep">
              도구는 똑똑해졌는데 실무자의 일은 줄지 않았습니다.<br/>
              이것은 <span className="text-accent underline underline-offset-4">AI는 있지만 자동화는 없는 상태</span>입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. New ROI Section (Business Value) */}
      <section className="section-padding container-custom bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">업무 자동화 AI를 통해 얻는 효과</h2>
            <p className="text-lg text-muted-foreground break-keep">
              AI 자동화는 어떻게 업무에 적용할 수 있을까? 시스템이 실무자를 대신해 직접 행동할 때 다음과 같은 명확한 ROI가 발생합니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">반복 업무 시간 절감</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">매일 반복되는 데이터 조회 및 정리 작업에서 하루 1~2시간 이상의 실무 시간을 즉각적으로 확보합니다.</p>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">데이터 처리 속도 향상</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">사람이 수십 분에 걸쳐 취합해야 하는 여러 데이터베이스의 정보를 에이전트가 수 초 이내에 스캔하고 통합합니다.</p>
            </div>

            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <ShieldCheck className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">업무 실수(Human Error) 감소</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">숫자를 누락하거나 잘못 복사하는 인적 오류를 원천 차단하여 데이터의 정확성과 신뢰도를 보장합니다.</p>
            </div>

            <div className="bg-background border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Workflow className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">보고/공유 자동화</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">산출된 데이터를 정해진 양식으로 자동 렌더링하고, 담당자의 요구나 정해진 일정에 맞춰 메신저로 배포합니다.</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-12 bg-background p-8 rounded-3xl border border-border shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground break-keep">우리 팀이 매일 반복하는 이 업무, 자동화가 가능할까요?</h3>
            {/* CTA 2 (Middle) */}
             <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-10 h-14 text-lg" asChild>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">자동화 가능 업무 진단 받기 <ArrowRight className="ml-2 w-5 h-5" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Automation Examples (Before/After) */}
      <section className="section-padding container-custom bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center justify-center p-3 bg-muted rounded-xl border border-border shadow-sm mb-6">
              <Bot className="w-6 h-6 text-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">실제 자동화 적용 사례</h2>
            <p className="text-lg text-muted-foreground break-keep">
              조직마다 RPA AI(Robotic Process Automation AI)를 적용하는 방식은 다양합니다. 기존의 과정이 확연히 단축됩니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Example 1 */}
            <div className="border border-border rounded-xl bg-muted/10 p-6 flex flex-col h-full hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-background border border-border text-xs px-2 py-1 rounded-md font-medium">Use Case 1</span>
                <span className="font-bold">매출 및 지표 요약 리포팅</span>
              </div>
              <p className="text-lg font-bold mb-6 italic">"오늘 매출 요약해서 슬랙으로 보내줘"</p>
              
              <div className="bg-background border border-border rounded-lg p-4 mb-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/30"></div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-2">Before (수작업 과정)</p>
                <p className="text-sm text-foreground/80 pl-2">관리자 페이지 접속 → 엑셀 조회 → 수동 정리 → 메신저 전송 <span className="font-bold text-muted-foreground block sm:inline mt-1 sm:mt-0 sm:ml-1">(약 40분 소요)</span></p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 pl-2">After (자동화 결과)</p>
                <p className="text-base font-bold text-foreground pl-2 flex flex-col sm:flex-row sm:items-center">
                  <span>한 줄 요청으로 <span className="text-accent sm:mx-1">취합부터 전송까지 직행</span></span>
                  <span className="font-extrabold text-accent mt-1 sm:mt-0">(1분 이내 완료)</span>
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="border border-border rounded-xl bg-muted/10 p-6 flex flex-col h-full hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-background border border-border text-xs px-2 py-1 rounded-md font-medium">Use Case 2</span>
                <span className="font-bold">시스템 장애 및 인프라 모니터링</span>
              </div>
              <p className="text-lg font-bold mb-6 italic">"서버 상태 체크해서 이상 있으면 알려줘"</p>
              
              <div className="bg-background border border-border rounded-lg p-4 mb-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/30"></div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-2">Before (수작업 과정)</p>
                <p className="text-sm text-foreground/80 pl-2">개별 모니터링 대시보드 로그인 → 리소스 사용량 육안 확인 → 비정상 로그 검색 → 엔지니어 호출</p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 relative overflow-hidden flex-1">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 pl-2">After (자동화 결과)</p>
                <p className="text-base font-bold text-foreground pl-2 flex items-center">
                   정기적 모니터링 수행 및 이상 감지 시 <span className="text-accent mx-1">엔지니어 자동 알림/호출</span>
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="border border-border rounded-xl bg-muted/10 p-6 flex flex-col h-full hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-background border border-border text-xs px-2 py-1 rounded-md font-medium">Use Case 3</span>
                <span className="font-bold">고객 히스토리 조회 (CS 연동)</span>
              </div>
              <p className="text-lg font-bold mb-6 italic">"특정 고객 데이터 조회해서 핵심만 정리해줘"</p>
              
              <div className="bg-background border border-border rounded-lg p-4 mb-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/30"></div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-2">Before (수작업 과정)</p>
                <p className="text-sm text-foreground/80 pl-2">고객번호로 백오피스 검색 → 최근 6개월 거래 내역 확인 → CS 티켓 히스토리 확인 → 담당자 전달</p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 relative overflow-hidden flex-1">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 pl-2">After (자동화 결과)</p>
                <p className="text-base font-bold text-foreground pl-2 flex items-center">
                   사내 메신저에서 고객번호 입력 시 <span className="text-accent mx-1">핵심 요약 카드 자동 생성 및 출력</span>
                </p>
              </div>
            </div>

            {/* Example 4 */}
            <div className="border border-border rounded-xl bg-muted/10 p-6 flex flex-col h-full hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-background border border-border text-xs px-2 py-1 rounded-md font-medium">Use Case 4</span>
                <span className="font-bold">스케줄형 문서 자동화</span>
              </div>
              <p className="text-lg font-bold mb-6 italic">"매주 월요일 9시 주간 진행상황 문서 발송"</p>
              
              <div className="bg-background border border-border rounded-lg p-4 mb-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/30"></div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-2">Before (수작업 과정)</p>
                <p className="text-sm text-foreground/80 pl-2">문서 취합 → 파일 병합/포맷 정리 → 이메일 발송 <span className="font-bold text-muted-foreground block sm:inline mt-1 sm:mt-0 sm:ml-1">(최소 2시간 소요)</span></p>
              </div>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2 pl-2">After (자동화 결과)</p>
                <p className="text-base font-bold text-foreground pl-2 flex flex-col sm:flex-row sm:items-center">
                  <span>파이프라인 가동으로 <span className="text-accent sm:mx-1">문서 취합 및 메일 즉각 발송</span></span>
                  <span className="font-extrabold text-accent mt-1 sm:mt-0">(즉시 완료)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.5 Trust / Reliability Block */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="bg-muted/20 border border-border rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between shadow-sm">
             <div className="lg:w-5/12 text-center lg:text-left">
               <h2 className="text-2xl font-bold tracking-tight mb-3 break-keep">실제 운영 환경 기준으로 설계합니다</h2>
               <p className="text-muted-foreground text-sm leading-relaxed break-keep">
                 단순한 시연용이 아닙니다. 내부 시스템 연동을 고려하여, 반복 업무를 실제 운영 현장에서 즉시 활용할 수 있는 안정적인 구조를 구축합니다.
               </p>
             </div>
             
             <div className="lg:w-7/12 grid sm:grid-cols-2 gap-4 w-full">
               <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3 mb-3">
                   <ShieldCheck className="w-5 h-5 text-accent" />
                   <h3 className="font-bold">업무 수행 기반 설계</h3>
                 </div>
                 <p className="text-sm text-muted-foreground leading-relaxed break-keep">보여주기식 챗봇 도입을 배제하고, 실무자의 반복 작업을 직접 대체하는 태스크 단위의 자동화를 구축합니다.</p>
               </div>
               
               <div className="bg-background border border-border p-6 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3 mb-3">
                   <Settings className="w-5 h-5 text-accent" />
                   <h3 className="font-bold">안정성 및 확장성 고려</h3>
                 </div>
                 <p className="text-sm text-muted-foreground leading-relaxed break-keep">자동화 이후 발생할 수 있는 에지 케이스 오류를 방어하고, 도입 이후의 기능 확장성을 함께 고려하여 패키징합니다.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Scope & Process */}
      <section className="section-padding container-custom bg-muted/10">
        <div className="max-w-6xl mx-auto" id="examples">
          
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">기업 자동화 시스템 제공 구조</h2>
          
          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-background border border-border p-6 rounded-xl flex gap-4 items-start shadow-sm">
                <div className="mt-1 bg-accent/10 p-2 rounded-lg border border-accent/20 shrink-0"><Terminal className="w-5 h-5 text-accent" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">핵심 자동화 위주의 초기 구축</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">팀의 리소스 낭비가 가장 심한 핵심 프로세스를 식별하여, 즉시 ROI를 낼 수 있는 자동화 시스템을 우선 세팅합니다.</p>
                </div>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl flex gap-4 items-start shadow-sm">
                <div className="mt-1 bg-accent/10 p-2 rounded-lg border border-accent/20 shrink-0"><Database className="w-5 h-5 text-accent" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">내부망 데이터 연동</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">일반 챗봇은 접근할 수 없는 기업 고유의 회사 내부 데이터를 안전하게 연동하여 실질적인 데이터 자동화를 구동합니다.</p>
                </div>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl flex gap-4 items-start shadow-sm">
                <div className="mt-1 bg-accent/10 p-2 rounded-lg border border-accent/20 shrink-0"><MessageSquare className="w-5 h-5 text-accent" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1"><span className="text-accent">Slack 자동화</span> 및 메신저 연동</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">새로운 툴을 배울 필요 없이, 평소 업무에 사용하는 사내 메신저에서 바로 호출하고 결과를 받아보는 <strong className="text-foreground font-semibold">Slack 자동화</strong> 환경을 구축합니다.</p>
                </div>
              </div>
              <div className="bg-background/50 border border-border/50 border-dashed p-6 rounded-xl flex gap-4 items-start relative opacity-80">
                <div className="mt-1 bg-muted p-2 rounded-lg border border-border shrink-0"><Box className="w-5 h-5 text-muted-foreground" /></div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-foreground/80">향후 확장 옵션 (n8n 및 외부 툴 연동)</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">기본 구축 이후 기업 단위로 확장이 필요할 때, 외부 플랫폼을 통합하는 n8n 기반의 확장을 통해 자연스럽게 스케일업 할 수 있는 업무 자동화 구조를 고려합니다.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
               <div className="bg-primary text-primary-foreground p-8 rounded-2xl h-full flex flex-col justify-center">
                  <h3 className="font-bold text-2xl mb-6">표준 구축 프로세스</h3>
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-primary-foreground/20"></div>
                    
                    <div className="relative z-10">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-background border-4 border-primary"></div>
                      <h4 className="font-bold text-lg">1. 업무 분석</h4>
                      <p className="text-sm text-primary-foreground/70">리포팅, 모니터링, 데이터 조회 등 병목이 되는 업무 식별</p>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-background border-4 border-primary"></div>
                      <h4 className="font-bold text-lg">2. 자동화 설계</h4>
                      <p className="text-sm text-primary-foreground/70">회사 내부 데이터 접근 및 원활한 자동화 로직 설계</p>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-background border-4 border-primary"></div>
                      <h4 className="font-bold text-lg">3. 에이전트 구축</h4>
                      <p className="text-sm text-primary-foreground/70">자동화 시스템 구축 및 원활한 업무 연동 완비</p>
                    </div>
                    
                    <div className="relative z-10 pb-2">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-background border-4 border-primary"></div>
                      <h4 className="font-bold text-lg">4. 테스트 및 확정</h4>
                      <p className="text-sm text-primary-foreground/70">업무 환경 내 정확성 검증 및 예외 상황 방지 완료</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Target & CTA (CAO) */}
      <section className="section-padding container-custom bg-background">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">도입 추천 대상</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-8 text-left">
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground">숫자 확인, 리포트 취합 등 반복 업무가 많은 팀</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground">데이터 조회 및 보고 승인에 리소스가 낭비되는 조직</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground">이미 슬랙(Slack) 기반의 빠른 협업을 진행 중인 회사</span>
              </div>
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground">단순 ChatGPT 이상의 인프라 투자를 고민 중인 기업</span>
              </div>
            </div>
          </div>

          {/* CTA 3 (Bottom) */}
          <div className="bg-accent/5 border border-accent/20 rounded-3xl p-10 mt-16 text-center shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">지금 바로 실행 가능한 자동화를 설계해보세요.</h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              기술 설명서가 아닌, 고객님의 비즈니스에서 줄일 수 있는 <strong className="text-foreground">시간 절감 효과</strong>와 구체적인 워크플로우를 먼저 제안해 드립니다.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-bold px-10 h-14 text-lg" asChild>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">샘플 자동화 시나리오 요청하기</a>
              </Button>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
