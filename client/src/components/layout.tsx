import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-us", label: "Why Us" },
  { href: "/global", label: "Global Coverage" },
  { href: "/contact", label: "Contact" },
];

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

function NavTab({ link, isActive }: { link: typeof navLinks[0]; isActive: boolean }) {
  return (
    <Link href={link.href}>
      <motion.span
        className={cn(
          "relative text-sm font-medium px-4 py-2 cursor-pointer inline-block",
          isActive ? "text-white" : "text-white/70"
        )}
        whileHover={{ scale: 1.05, y: -1 }}
        transition={spring}
        data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {link.label}
        {isActive && (
          <motion.span
            className="absolute bottom-0 left-[20%] right-[20%] h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, #e04050, #ff6b7a)" }}
            layoutId="nav-underline"
            transition={spring}
          />
        )}
        <motion.span
          className="absolute bottom-0 left-[20%] right-[20%] h-[2px] rounded-full bg-white/30"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{ originX: 0.5, display: isActive ? "none" : "block" }}
        />
      </motion.span>
    </Link>
  );
}

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

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl py-3 border-b border-white/5"
          : "bg-transparent py-5"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={spring}
          >
            <img 
              src="/images/logo.png" 
              alt="Alliance Street Accounting" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavTab
              key={link.href}
              link={link}
              isActive={location === link.href}
            />
          ))}
          <Link href="/contact" className="ml-4" data-testid="nav-cta-button">
            <motion.span
              className="nav-cta-btn inline-block bg-white text-black rounded-full px-6 py-2 font-semibold text-sm cursor-pointer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Get in Touch
            </motion.span>
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn("text-lg font-medium py-2 transition-colors block", location === link.href ? "text-red-500" : "text-white/80 hover:text-white")}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full font-semibold" asChild>
                      <span>Get in Touch</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
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
                <a href="mailto:shaukin@alliancestreet.ae" className="hover:text-white transition-colors">shaukin@alliancestreet.ae</a>
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
