// Layout Component
import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Phone, Mail, MapPin } from "lucide-react";
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
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-gray-100"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex flex-col cursor-pointer group">
            <span className={cn("font-serif text-xl md:text-2xl font-bold tracking-tight", isScrolled ? "text-primary" : "text-primary md:text-white md:shadow-black/10 md:drop-shadow-md")}>
              ALLIANCE STREET
            </span>
            <span className={cn("text-[0.65rem] tracking-[0.2em] font-medium uppercase mt-0.5", isScrolled ? "text-accent" : "text-accent md:text-white/90")}>
              Accounting & Advisory
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors relative hover:text-accent",
                  location === link.href 
                    ? "text-accent" 
                    : isScrolled ? "text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/contact">
            <Button 
              className={cn(
                "rounded-none px-6 font-medium transition-all hover:scale-105",
                isScrolled ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Book Strategy Call
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-primary" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a className={cn("text-lg font-serif font-medium hover:text-accent transition-colors", location === link.href ? "text-accent" : "text-primary")}>
                      {link.label}
                    </a>
                  </Link>
                ))}
                <div className="mt-4">
                  <Link href="/contact">
                    <Button className="w-full rounded-none">Book Strategy Call</Button>
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
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold font-serif mb-6 text-white">ALLIANCE STREET</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Global accounting and virtual CFO services built for growing businesses. We provide the financial clarity and operational backbone you need to scale.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <Globe className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer transition-colors">Accounting & Bookkeeping</li>
              <li className="hover:text-white cursor-pointer transition-colors">Virtual CFO</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tax Compliance</li>
              <li className="hover:text-white cursor-pointer transition-colors">Back-Office Support</li>
              <li className="hover:text-white cursor-pointer transition-colors">Financial Reporting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/about">About Us</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/why-us">Why Alliance Street</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/global">Global Coverage</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/contact">Contact</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span>Serving US, UK, EU, UAE, Canada, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <a href="mailto:hello@alliancestreet.com" className="hover:text-white">hello@alliancestreet.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <a href="tel:+1234567890" className="hover:text-white">+1 (555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Alliance Street Accounting. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
