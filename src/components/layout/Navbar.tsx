import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl tracking-tight">QAgent Labs</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/seller-commerce"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Seller Service
            </Link>
            <Link
              href="/ai-automation"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              AI Automation
            </Link>
            <Link
              href="/products/nx-802ru30"
              className="flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              NX-802RU30
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
