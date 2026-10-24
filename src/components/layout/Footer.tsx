import Link from 'next/link';
import { COMPANY } from '@/lib/company';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4 tracking-tight">QAgent Labs</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-4">
              Building intelligent systems for commerce, supply chains, and engineering automation.
            </p>
            <div className="text-sm text-muted-foreground/80 leading-7 break-words">
              <p>상호: {COMPANY.legalName} · 대표자: {COMPANY.representative}</p>
              <p>사업자등록번호: {COMPANY.registrationNumber}</p>
              <p>통신판매업 신고번호: {COMPANY.mailOrderRegistrationNumber}</p>
              <address className="not-italic">사업장: {COMPANY.address}</address>
              <p>고객센터: <a href={COMPANY.phoneHref} className="underline underline-offset-4">{COMPANY.phone}</a></p>
              <p>이메일: <a href={"mailto:" + COMPANY.email} className="underline underline-offset-4">{COMPANY.email}</a></p>
              <p>호스팅 제공자: {COMPANY.hostingProvider}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Projects</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/machinecare" className="hover:text-foreground transition-colors">MachineCare</Link></li>
              <li>
                <Link href="/driver-hub" className="hover:text-foreground transition-colors">
                  Driver Hub
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>3D Auto Design</span>
                <span className="text-[10px] uppercase font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground">Coming Soon</span>
              </li>
              <li className="flex items-center gap-2">
                <span>AI Supply Chain</span>
                <span className="text-[10px] uppercase font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground">Coming Soon</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} QAgent Labs. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3">
            <Link href="/terms" className="hover:text-foreground transition-colors">이용약관</Link>
            <Link href="/privacy" className="font-semibold hover:text-foreground transition-colors">개인정보처리방침</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">취소·환불정책</Link>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=harrison.park@qagentlabs.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">harrison.park@qagentlabs.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
