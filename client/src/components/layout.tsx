import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/why-us", label: "Why Us" },
    { href: "/global", label: "Global Coverage" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl py-3 border-b border-white/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="cursor-pointer">
            <img 
              src="/images/logo.png" 
              alt="Alliance Street Accounting" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium px-4 py-2 rounded-full transition-all",
                location === link.href 
                  ? "text-white bg-white/10" 
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-4" data-testid="nav-cta-button">
            <Button 
              className="bg-white text-black hover:bg-gray-100 rounded-full px-6 font-semibold"
              asChild
            >
              <span>Get in Touch</span>
            </Button>
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black border-white/10">
              <div className="flex flex-col gap-4 mt-10">
                <div className="mb-4">
                  <img src="/images/logo.png" alt="Alliance Street" className="h-12 w-auto" />
                </div>
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn("text-lg font-medium py-2 transition-colors block", location === link.href ? "text-red-500" : "text-white/80 hover:text-white")}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6">
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full font-semibold" asChild>
                      <span>Get in Touch</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="mb-6">
              <img src="/images/logo.png" alt="Alliance Street Accounting" className="h-14 w-auto" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Global accounting and virtual CFO services built for growing businesses. We provide the financial clarity and operational backbone you need to scale.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/services" className="hover:text-white transition-colors cursor-pointer">Accounting & Bookkeeping</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors cursor-pointer">Virtual CFO</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors cursor-pointer">Tax Compliance</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors cursor-pointer">Back-Office Support</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors cursor-pointer">Financial Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/why-us" className="hover:text-white transition-colors cursor-pointer">Why Alliance Street</Link></li>
              <li><Link href="/global" className="hover:text-white transition-colors cursor-pointer">Global Coverage</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                <span>Serving US, UK, EU, UAE, Canada, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-red-500" />
                <a href="mailto:hello@alliancestreet.com" className="hover:text-white transition-colors">hello@alliancestreet.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-red-500" />
                <a href="tel:+917375096163" className="hover:text-white transition-colors">+91 7375096163</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Alliance Street Accounting. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white/60 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
