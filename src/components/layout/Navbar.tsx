"use client";

import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight">QAgent Labs</span>
          </Link>
          <nav aria-label="주 메뉴" className="hidden md:flex gap-4 lg:gap-6">
            <Link href="/machinecare" className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground">MachineCare</Link>
            <Link
              href="/driver-hub"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Driver Hub
            </Link>
            <Link
              href="/ai-automation"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              AI Automation
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <details className="md:hidden relative"><summary className="cursor-pointer text-sm font-medium">메뉴</summary><nav onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")} aria-label="모바일 메뉴" className="absolute right-0 top-8 w-48 rounded-lg border border-border bg-background p-4 shadow-lg flex flex-col gap-4"><Link href="/machinecare">MachineCare</Link><Link href="/driver-hub">Driver Hub</Link><Link href="/ai-automation">AI Automation</Link><Link href="/about">About</Link></nav></details>
          <Link
            href="/contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
