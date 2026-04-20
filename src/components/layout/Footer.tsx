import Link from 'next/link';

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
            <address className="not-italic text-sm text-muted-foreground/80 leading-relaxed max-w-xs">
              경기도 구리시 갈매중앙로 190,<br/>
              구리갈매 휴밸나인 지식산업센터
            </address>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Projects</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/seller-commerce" className="hover:text-foreground transition-colors">
                  Seller Commerce
                </Link>
              </li>
              <li>
                <Link href="/products/nx-802ru30" className="hover:text-foreground transition-colors">
                  NX-802RU30 Storage
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
          <div className="flex gap-4">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=wowa080421@gmail.com&su=QAgentLabs%20Inquiry" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">wowa080421@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
