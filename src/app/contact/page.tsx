import { Button } from "@/components/ui/Button";
import ContactForm from "./ContactForm";
import { Mail, Building, Clock } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact QAgent Labs',
  description: 'Get in touch with QAgent Labs for business inquiries.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pb-16">
      <section className="bg-background pt-20 pb-12 border-b border-border">
        <div className="container-custom max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl break-keep">
            문의는 아래 폼 또는 이메일을 통해 부탁드립니다. 확인 후 빠르게 답변드리겠습니다.
          </p>
        </div>
      </section>

      <section className="section-padding container-custom max-w-5xl grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <div className="bg-background rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Business Inquiry</h2>
            <ContactForm />
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-muted/50 rounded-xl border border-border p-8">
            <h3 className="font-bold text-lg mb-6 tracking-tight">Direct Contact</h3>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Email</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-accent transition-colors">
                      wowa080421@gmail.com
                    </a>
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">👉 이메일 보내기</a>
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
                    Seoul, South Korea<br />
                    Operation & Engineering Hub
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Hours</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM (KST)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
