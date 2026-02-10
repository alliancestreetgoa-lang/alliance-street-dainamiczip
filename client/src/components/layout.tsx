// Layout Component
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

  // Updated links based on the image
  const links = [
    { href: "/business-setup", label: "Business Setup" },
    { href: "/banking", label: "Banking Solutions" },
    { href: "/accounting", label: "Accounting Service" },
    { href: "/financial", label: "Financial Solutions" },
    { href: "/real-estate", label: "Real Estate" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="cursor-pointer flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="Alliance Street Accounting" 
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert" 
            />
          </div>
        </Link>

        {/* Desktop Menu - Pill Style */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "nav-pill",
                  location === link.href ? "active" : ""
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex">
           <Link href="/contact">
            <Button 
              className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-6"
            >
              Get in Touch
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/95 border-gray-800 text-white">
              <div className="flex flex-col gap-4 mt-10">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a className={cn("text-lg font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors", location === link.href ? "text-accent bg-white/5" : "text-white")}>
                      {link.label}
                    </a>
                  </Link>
                ))}
                <div className="mt-4">
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white text-black hover:bg-white/90">Get in Touch</Button>
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
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6 bg-white p-2 w-fit rounded-sm">
              <img src="/images/logo.png" alt="Alliance Street Accounting" className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Global accounting and virtual CFO services built for growing businesses. We provide the financial clarity and operational backbone you need to scale.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-full hover:bg-accent transition-colors cursor-pointer">
                <Globe className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white cursor-pointer transition-colors">Business Setup</li>
              <li className="hover:text-white cursor-pointer transition-colors">Banking Solutions</li>
              <li className="hover:text-white cursor-pointer transition-colors">Accounting Services</li>
              <li className="hover:text-white cursor-pointer transition-colors">Financial Solutions</li>
              <li className="hover:text-white cursor-pointer transition-colors">Real Estate</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/about">About Us</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/why-us">Why Alliance Street</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/global">Global Coverage</Link></li>
              <li className="hover:text-white cursor-pointer transition-colors"><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
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
