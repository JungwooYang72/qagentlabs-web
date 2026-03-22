import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ChevronRight, HardDrive, Shield, Server, Box, Cpu, Workflow, CpuIcon, Layers, Thermometer } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NX-802RU30 Storage System',
  description: 'Professional 8-bay rackmountable direct attached storage enclosure',
};

export default function ProductPage() {
  return (
    <div className="flex flex-col w-full pb-16">
      {/* Breadcrumb & Top Bar */}
      <div className="border-b border-border bg-muted/20">
        <div className="container-custom py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Products</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">NX-802RU30</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded bg-accent/10 text-accent px-2 py-1 border border-accent/20">NX-802RU30</span>
            <span className="rounded bg-muted px-2 py-1 border border-border">STATUS: ACTIVE DEPLOYMENT</span>
          </div>
        </div>
      </div>

      {/* Hero Product Overview */}
      <section className="section-padding container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Abstract Product Image Area */}
        <div className="bg-muted rounded-2xl border border-border aspect-square w-full flex items-center justify-center p-10 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
          
          <div className="w-full max-w-sm aspect-video rounded bg-background border border-border shadow-md flex flex-col justify-between p-4 relative group-hover:scale-[1.02] transition-transform duration-500">
             <div className="flex justify-between items-center mb-6">
               <div className="flex gap-1">
                 <div className="w-16 h-2 bg-muted rounded"></div>
                 <div className="w-16 h-2 bg-muted rounded"></div>
               </div>
               <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>
             </div>
             <div className="grid grid-cols-4 gap-2 flex-1 pt-2 border-t border-border">
                {Array.from({length: 8}).map((_, i) => (
                  <div key={i} className="bg-secondary rounded-sm border border-border/80 h-full w-full relative overflow-hidden flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground/30 font-mono">BAY {i+1}</span>
                    <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-green-500/50"></div>
                  </div>
                ))}
             </div>
             <div className="mt-4 pt-2 border-t border-border flex justify-between">
                <div className="w-8 h-1 bg-muted rounded"></div>
                <div className="w-12 h-1 bg-muted rounded"></div>
             </div>
          </div>
        </div>

        {/* Product Details & Engineering Resources CTA */}
        <div className="flex flex-col">
          <div className="mb-2 inline-flex items-center rounded bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground border border-border">
            <Server className="w-3 h-3 mr-1" /> Enterprise Grade DAS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-4">
            NX-802RU30
          </h1>
          <p className="text-xl font-medium text-foreground tracking-tight mb-4 border-l-2 border-accent pl-4 py-1">
            2U 8-Bay Rackmount Expansion Chassis
          </p>
          <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
            Engineered for high-density storage nodes, the NX-802RU30 provides uncompromised direct-attached storage expansion. Built on a rigid steel chassis with an unbottlenecked sas/sata backplane, it offers exceptional reliability for home labs, custom NAS builds, and enterprise archival systems.
          </p>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm mt-4">
            <h3 className="font-semibold mb-2">Deployment & Sourcing</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Available for immediate deployment. For custom configurations or volume engineering deployments, contact our technical sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium" asChild>
                <a href="https://toss.im" target="_blank" rel="noopener noreferrer">
                  Source via Toss <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="font-medium bg-background" asChild>
                <Link href="/contact">Engineering Inquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="bg-muted/30 py-16 border-y border-border">
        <div className="container-custom">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-6 text-center">Engineered For</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center text-center">
              <Server className="w-8 h-8 text-foreground/70 mb-3" />
              <span className="font-medium">Home Server Users</span>
            </div>
            <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center text-center">
              <Layers className="w-8 h-8 text-foreground/70 mb-3" />
              <span className="font-medium">NAS Builders</span>
            </div>
            <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center text-center">
              <Workflow className="w-8 h-8 text-foreground/70 mb-3" />
              <span className="font-medium">IT Engineers</span>
            </div>
            <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center text-center">
              <Shield className="w-8 h-8 text-foreground/70 mb-3" />
              <span className="font-medium">Technical Buyers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Cooling / Expansion */}
      <section className="section-padding container-custom">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Architecture & Capabilities</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-border p-8 rounded-xl bg-background shadow-sm flex flex-col items-start">
            <div className="p-3 bg-muted rounded-lg mb-6"><HardDrive className="h-6 w-6 text-accent" /></div>
            <h3 className="text-xl font-bold mb-3">8-Bay Direct Attached</h3>
            <p className="text-muted-foreground leading-relaxed">
              Supports eight 3.5" or 2.5" SATA/SAS drives in hot-swappable trays. The backplane uses a direct 1-to-1 routing path to external SFF connectors, preventing any expander-related bottlenecks for high-throughput ZFS arrays.
            </p>
          </div>
          
          <div className="border border-border p-8 rounded-xl bg-background shadow-sm flex flex-col items-start">
            <div className="p-3 bg-muted rounded-lg mb-6"><Thermometer className="h-6 w-6 text-accent" /></div>
            <h3 className="text-xl font-bold mb-3">Thermals & Cooling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Equipped with three 80mm PWM hot-swap fan modules positioned immediately behind the drive wall. Creates massive static pressure to keep high-capacity helium drives operating perfectly under sustained loads.
            </p>
          </div>
          
          <div className="border border-border p-8 rounded-xl bg-background shadow-sm flex flex-col items-start">
            <div className="p-3 bg-muted rounded-lg mb-6"><CpuIcon className="h-6 w-6 text-accent" /></div>
            <h3 className="text-xl font-bold mb-3">Power & Expansion</h3>
            <p className="text-muted-foreground leading-relaxed">
              Accepts standard 1U server power supplies (single or redundant options). Seamlessly daisy-chain multiple NX-802RU30 units to a single head node utilizing multi-port SAS HBAs.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="bg-primary text-primary-foreground py-20 border-y border-primary-foreground/10">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Technical Specifications</h2>
          <div className="border border-primary-foreground/20 rounded-xl overflow-hidden bg-background/5 text-sm md:text-base">
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Form Factor</span>
              <span className="col-span-2">2U Standard Rackmount (19" width)</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20 bg-background/5">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Drive Bays</span>
              <span className="col-span-2">8 x 3.5"/2.5" Hot-Swappable</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Backplane</span>
              <span className="col-span-2">SATA/SAS Passthrough (No Expander)</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20 bg-background/5">
              <span className="font-semibold text-primary-foreground/80 col-span-1">External Interfaces</span>
              <span className="col-span-2">2 x SFF-8088 / SFF-8644 (Depending on selected backplane module)</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Cooling</span>
              <span className="col-span-2">3 x 80mm High-RPM PWM Hot-swap Fans</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20 bg-background/5">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Power Supply Support</span>
              <span className="col-span-2">Server-grade 1U format / Redundant Ready</span>
            </div>
            <div className="grid grid-cols-3 p-5 border-b border-primary-foreground/20">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Dimensions</span>
              <span className="col-span-2">482mm(W) x 89mm(H) x 550mm(D)</span>
            </div>
            <div className="grid grid-cols-3 p-5">
              <span className="font-semibold text-primary-foreground/80 col-span-1">Material</span>
              <span className="col-span-2">1.2mm SGCC Heavy-duty Cold-rolled Steel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding container-custom bg-muted/20">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Primary Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border border-border p-6 rounded-lg bg-background">
            <h4 className="font-bold flex items-center mb-3 text-lg">
              <CheckCircle2 className="w-5 h-5 text-accent mr-2" /> TrueNAS / ZFS Pools
            </h4>
            <p className="text-muted-foreground">The direct passthrough backplane makes this chassis the absolute best choice for TrueNAS SCALE/CORE deployments. ZFS requires direct access to disks without RAID controllers in the way, and the NX-802RU30 delivers exactly that.</p>
          </div>
          <div className="border border-border p-6 rounded-lg bg-background">
            <h4 className="font-bold flex items-center mb-3 text-lg">
              <CheckCircle2 className="w-5 h-5 text-accent mr-2" /> Media/Video Archival
            </h4>
            <p className="text-muted-foreground">Video editing teams can pair the chassis with a multi-port HBA in their main workstation, expanding storage capacity by massive amounts without replacing their primary node.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Technical clarification for system integrators and engineers.</p>
          </div>

          <div className="space-y-4">
            <div className="border border-border rounded-lg p-6 bg-background">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Box className="w-5 h-5 text-accent" />
                Is the backplane SAS expander-based or direct passthrough?
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The NX-802RU30 utilizes a direct passthrough backplane architecture without a built-in SAS expander. This ensures maximum unadulterated bandwidth to each drive, making it ideal for software-defined storage systems like TrueNAS and Unraid where direct disk access is mandatory.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-6 bg-background">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Box className="w-5 h-5 text-accent" />
                What HBA cards are recommended for the head node?
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We recommend standard LSI-based SAS HBAs flashed to IT mode (e.g., LSI 9207-8e, 9300-8e) depending on your required interface speed. Ensure the card matches the external SFF connectors you plan to utilize to link the head node to the DAS enclosure.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6 bg-background">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Box className="w-5 h-5 text-accent" />
                Does it support standard ATX power supplies?
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No, the compact 2U form factor requires 1U server power supplies (redundant or standard). We provide validated active PFC power supply options at configuration time to ensure stability under heavy 8-drive spin-up loads.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
