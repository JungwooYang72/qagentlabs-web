import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About QAgent Labs',
  description: 'Who we are and what we build at QAgent Labs.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-16">
      <section className="bg-background pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border">
        <div className="container-custom max-w-3xl">
          <Terminal className="w-12 h-12 text-accent mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Engineering the <br /> Next Infrastructure
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance">
            QAgent Labs is a technology startup building intelligent systems that lie at the intersection of operational engineering, supply chain management, and scalable commerce.
          </p>
        </div>
      </section>

      <section className="section-padding container-custom">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground border-b border-border pb-4">Why We Exist</h2>
            <div className="prose prose-neutral dark:prose-invert text-muted-foreground">
              <p className="mb-4">
                We observed that while software scales infinitely, the operational layers dealing with physical products, engineering designs, and hardware sales remain painfully manual.
              </p>
              <p className="mb-4">
                Traditional SaaS platforms provide isolated tools, but fail to integrate the complex engineering data required for sophisticated technical sales pipelines and spatial design generation.
              </p>
              <p>
                QAgent Labs exists to abstract this operational complexity. We build automated infrastructure so technical organizations can focus on scaling, rather than struggling with internal data friction and multi-channel dispersion.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-foreground border-b border-border pb-4">Our Focus Areas</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  AI-Driven Commerce
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Structuring technical product information into programmable entities, enabling automated adaptation and distribution across multiple external sales channels.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Automation Systems
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Building the connective tissue between inventory, specifications, and external end-points using robust, low-latency automated workflows.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Product & Supply Chain Intelligence
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Developing predictive systems for technical sourcing, maintaining data integrity across hardware lifecycles, and ensuring operational reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24 border-y border-border">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Partner With Us</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you are a technical hardware manufacturer looking to scale distribution or an engineering team seeking operational automation, we want to hear from you.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact" className="font-medium">
              Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
