import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CopyCheck, FileCode, Search, Server, Settings, Zap, Database, ArrowRight, Bot, Cpu, Network } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seller Commerce | QAgent Labs',
  description: 'Operations and sales support infrastructure for technical hardware products.',
};

export default function SellerCommercePage() {
  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Header */}
      <section className="bg-muted/30 border-b border-border py-24 px-6 relative overflow-hidden">
        {/* Abstract background tech pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="container-custom max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center rounded bg-secondary px-3 py-1 text-sm font-semibold mb-8 border border-border shadow-sm text-secondary-foreground uppercase tracking-widest">
            <Network className="w-4 h-4 mr-2 text-accent" />
            Infrastructure for Hardware Sales
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Technical Operations,<br/>Automated.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed max-w-3xl">
            We bridge the gap between complex hardware products and dynamic sales channels through structured operations, AI-driven content automation, and engineering-first support.
          </p>
        </div>
      </section>

      {/* The Problem & Our Approach */}
      <section className="section-padding container-custom grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <div className="inline-block p-3 bg-muted rounded-xl mb-6 border border-border">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">The Technical Sales Bottleneck</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Specialized hardware is notoriously difficult to sell via traditional e-commerce paradigms. Product specifications are complex, configurations change rapidly, and customer inquiries demand deep engineering expertise that general sales teams simply lack.
          </p>
          <p className="text-lg text-foreground font-medium border-l-2 border-accent pl-4">
            This creates a strict ceiling on sales scale: excellent products remain hidden because the operational friction to accurately represent and support them across channels is too high.
          </p>
        </div>

        <div className="bg-background border border-border shadow-md p-8 md:p-10 rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent to-accent/20"></div>
          
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            Our Intermediary Protocol
          </h3>
          <p className="text-foreground/80 leading-relaxed mb-8">
            QAgent Labs acts as an intelligent intermediary layer. We handle the heavy lifting of product information structuring, translating raw technical specs into multi-channel scalable content, and managing downstream operational flow.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Database className="w-3 h-3 text-accent" />
              </div>
              <span className="text-muted-foreground">Treating product information as structured engineering data.</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Bot className="w-3 h-3 text-accent" />
              </div>
              <span className="text-muted-foreground">Automating technical content generation for external marketplaces.</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-4 h-6 w-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Settings className="w-3 h-3 text-accent" />
              </div>
              <span className="text-muted-foreground">Centralizing technical knowledge to resolve customer inquiries reliably.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Deep Dive: Operations Pipeline */}
      <section className="bg-muted/50 py-24 border-y border-border">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">Operational Execution Workflow</h2>
            <p className="text-muted-foreground text-lg text-balance">
              We do not just provide software; we execute the entire product operations lifecycle. From raw factory data to live marketplace listings, here is how we make complex products sellable.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-background border border-border p-8 rounded-xl shadow-sm relative z-0 flex flex-col">
              <div className="w-12 h-12 bg-muted border border-border rounded flex items-center justify-center mb-6">
                <span className="font-mono font-bold text-foreground/50">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Database className="w-5 h-5 text-accent"/> Parsing & Structuring</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Raw technical specifications, data sheets, factory CAD parameters, and informal supplier notes are ingested and rigorously typed into a central relational product database.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background border border-border p-8 rounded-xl shadow-sm relative z-0 flex flex-col">
              <div className="w-12 h-12 bg-muted border border-border rounded flex items-center justify-center mb-6">
                <span className="font-mono font-bold text-foreground/50">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Settings className="w-5 h-5 text-accent"/> Operations Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We establish compatibility matrices, optimal configuration guidelines, and clear deployment constraints. We act as the tier-2 engineering support for all pre-sales inquiries.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background border border-accent/30 p-8 rounded-xl shadow-md relative z-0 flex flex-col">
              <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded flex items-center justify-center mb-6 text-accent">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3">03. Automated Content</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Using LLMs and deterministic templates, the structured data is automatically rendered into highly accurate, platform-specific listings (e.g., Toss, B2B portals), user manuals, and marketing copy.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-background border border-border p-8 rounded-xl shadow-sm relative z-0 flex flex-col">
              <div className="w-12 h-12 bg-muted border border-border rounded flex items-center justify-center mb-6">
                <span className="font-mono font-bold text-foreground/50">04</span>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Network className="w-5 h-5 text-accent"/> Channel Sync</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Listings, inventory state, and pricing are synchronized with external sales points. Technical updates to the core data immediately propagate across all linked channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container-custom">
          <div className="mb-16 md:flex md:justify-between md:items-end border-b border-primary-foreground/10 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Core Infrastructure</h2>
              <p className="text-primary-foreground/70 text-lg md:text-xl">
                Systems tailored exclusively for technical product distribution.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group border border-primary-foreground/20 p-8 md:p-10 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors">
              <FileCode className="h-8 w-8 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Relational Product Knowledge</h3>
              <p className="text-primary-foreground/70 leading-relaxed text-lg">
                We manage specifications, firmware versions, and documentation as relational datasets rather than static text blocks. This guarantees absolute consistency across all sales channels and allows for programmatic generation of compatibility guides.
              </p>
            </div>
            
            <div className="group border border-primary-foreground/20 p-8 md:p-10 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors">
              <CopyCheck className="h-8 w-8 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Adaptive Content Rendering</h3>
              <p className="text-primary-foreground/70 leading-relaxed text-lg">
                Automated workflows adapt source technical data into optimized formats. A complex 2U chassis specification is programmatically formatted differently for a B2B volume buyer portal versus a prosumer storefront, ensuring the right message hits the right audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Highlight */}
      <section className="section-padding container-custom">
        <div className="border border-border bg-background rounded-3xl p-8 md:p-16 shadow-lg flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

          <div className="flex-1 relative z-10">
            <div className="flex items-center text-xs font-bold text-accent mb-6 uppercase tracking-widest bg-accent/10 w-fit px-3 py-1.5 rounded-md border border-accent/20">
              <Cpu className="w-4 h-4 mr-2" />
              Applied Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">NX-802RU30 Implementation</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              See our Seller Commerce principles applied in practice with the NX-802RU30—a technical storage enclosure demanding precise specifications and clear deployment cases. We manage the product presentation layer and knowledge base, while seamlessly routing transactions to established shopping platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90" asChild>
                <Link href="/products/nx-802ru30">Review the NX-802RU30 <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-background" asChild>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer">Contact for Commerce Partnership</a>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-5/12 aspect-square bg-muted rounded-2xl border border-border flex items-center justify-center p-8 relative group">
            {/* Visual representation of the hardware */}
            <div className="w-full h-full border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center bg-background/50 group-hover:bg-background transition-colors">
              <Server className="w-16 h-16 text-muted-foreground/40 mb-4" />
              <span className="font-mono text-sm text-muted-foreground/60">NX-802RU30_NODE</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
