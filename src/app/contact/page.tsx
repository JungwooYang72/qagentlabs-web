import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { callbackAvailable } from "@/lib/machinecare-callback-store";
import MachineCareInquiry from "./MachineCareInquiry";
import MachineCarePartnerInquiry from "./MachineCarePartnerInquiry";
import { isMachineCareInquiry, MACHINECARE_BASE_HOURS, MACHINECARE_CONTACT, MACHINECARE_VISIT_AREAS } from "@/lib/machinecare";
import { Mail, Building, Clock } from "lucide-react";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Contact QAgent Labs',
  description: 'Get in touch with QAgent Labs for business inquiries.',
};
 
export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const machinecare = params.service === "machinecare";
  const acceptingCallbacks = machinecare && await callbackAvailable();
  const inquiry = isMachineCareInquiry(params.inquiry) ? params.inquiry : "pc";
  const partner = machinecare && inquiry === "partner";
  return (
    <div className="flex flex-col w-full pb-16">
      <section className="bg-background pt-20 pb-12 border-b border-border">
        <div className="container-custom max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {partner ? "MachineCare 협력업체 문의" : machinecare ? "MachineCare 상담 문의" : "Contact Us"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl break-keep">
            {partner ? "PC·노트북 부품 공급 및 노트북 전문 수리 협력업체를 먼저 모집합니다. 고객 방문 지역과 모집 지역은 별개이며 거래 조건은 개별 협의합니다." : machinecare ? (acceptingCallbacks ? "내용을 확인한 뒤 상담을 요청해 주세요. 본부에서 확인 후 담당자를 배정하며, 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다." : "챗봇에서 정리한 증상을 이메일로 문의해 주세요. 콜백 접수는 준비 중이며, 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.") : "문의는 아래 폼 또는 이메일을 통해 부탁드립니다. 확인 후 빠르게 답변드리겠습니다."}
          </p>
        </div>
      </section>
 
      <section className="section-padding container-custom max-w-5xl grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3 min-w-0">
          <div className={"bg-background rounded-xl border border-border shadow-sm " + (machinecare ? "p-5 sm:p-8" : "p-8")}>
            <h2 className="text-2xl font-bold mb-6">{partner ? "협력업체 문의" : machinecare ? (acceptingCallbacks ? "콜백 상담 요청" : "이메일 문의 안내") : "Business Inquiry"}</h2>
            {partner ? <MachineCarePartnerInquiry /> : machinecare ? <MachineCareInquiry initialInquiry={inquiry} /> : <ContactForm />}
          </div>
        </div>
 
        <div className="md:col-span-2 min-w-0 space-y-8">
          <div className={"bg-muted/50 rounded-xl border border-border " + (machinecare ? "p-5 sm:p-8" : "p-8")}>
            <h3 className="font-bold text-lg mb-6 tracking-tight">Direct Contact</h3>
            
            <ul className="space-y-6">
              {machinecare && <li className="text-sm leading-7"><p className="font-semibold">{MACHINECARE_CONTACT.person}</p><p>{partner ? "협력 분야와 공급·수리 범위를 확인한 뒤 개별 연락합니다. 기사 모집은 현재 진행하지 않습니다." : "온라인 문의·이메일 상담을 먼저 이용해 주세요. 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다."}</p></li>}
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Email</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=harrison.park@qagentlabs.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-accent transition-colors break-all">
                      harrison.park@qagentlabs.com
                    </a>
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=harrison.park@qagentlabs.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">👉 이메일 보내기</a>
                  </Button>
                </div>
              </li>
              
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">HQ</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    경기도 구리시 갈매중앙로 190, D동 4층 17호(갈매동, 휴밸나인 지식산업센터)<br />
                    Operation & Engineering Hub
                  </p>
                </div>
              </li>

              {partner && <li className="text-sm leading-7"><h4 className="font-medium">협력업체 모집 지역</h4><p className="mt-1">고객 방문 상담 지역과 별개입니다. 업체 소재지와 배송·입고 가능 여부를 확인해 협의합니다.</p></li>}
              {machinecare && !partner && <li className="text-sm leading-7"><h4 className="font-medium">초기 방문 상담 지역</h4><p className="mt-1">경기: {MACHINECARE_VISIT_AREAS.gyeonggi.join(", ")}</p><p>서울: {MACHINECARE_VISIT_AREAS.seoul.join(", ")}</p><Link href="/machinecare/visit" className="text-accent underline">출장 상담 안내 보기</Link></li>}

              {!partner && <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{machinecare ? "상담·방문 시간" : "Hours"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {machinecare ? <>기본 {MACHINECARE_BASE_HOURS}<br />운영 요일·휴무일은 아직 정해지지 않았습니다. 상세 주소와 기사 일정을 확인한 뒤 방문을 확정합니다.</> : <>Monday - Friday<br />9:00 AM - 6:00 PM (KST)</>}
                  </p>
                </div>
              </li>}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
