import { Navbar, Footer } from "@/components/layout";
import { CheckCircle2, ShieldCheck, Zap, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function WhyUs() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-primary py-24 text-white">
        <div className="container px-6 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Why Alliance Street?</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            The difference is in the delivery. Here’s what sets us apart from traditional outsourcing firms.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
               <h2 className="text-3xl font-serif font-bold text-primary mb-8">Not Just Vendors, Partners</h2>
               <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                 Many outsourcing firms operate like factories—churning out tasks with little understanding of the bigger picture. We operate differently.
               </p>
               <p className="text-muted-foreground leading-relaxed text-lg">
                 At Alliance Street, we take the time to understand your business model, your growth goals, and your specific challenges. This allows us to provide proactive advice, not just reactive reporting.
               </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
               <div className="flex gap-4">
                 <div className="bg-accent/10 p-3 h-fit rounded-lg">
                   <ShieldCheck className="w-8 h-8 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-primary mb-2">SOP-Driven Excellence</h3>
                   <p className="text-muted-foreground">We document every process. Our rigorous Standard Operating Procedures ensure consistency and quality, no matter the task.</p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="bg-accent/10 p-3 h-fit rounded-lg">
                   <Users className="w-8 h-8 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-primary mb-2">Virtual CFO Expertise</h3>
                   <p className="text-muted-foreground">Access high-level financial strategy usually reserved for large corporations, at a fraction of the cost.</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="bg-accent/10 p-3 h-fit rounded-lg">
                   <Globe className="w-8 h-8 text-primary" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-primary mb-2">Global Compliance</h3>
                   <p className="text-muted-foreground">We stay up-to-date with regulations in the US, UK, EU, UAE, Canada, and India so you don't have to.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="container px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-12">Our Commitment to You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 shadow-sm">
                 <div className="text-accent text-4xl font-serif font-bold mb-4">100%</div>
                 <h3 className="font-bold text-primary mb-2">Data Security</h3>
                 <p className="text-muted-foreground text-sm">Enterprise-grade security protocols to protect your sensitive financial data.</p>
               </div>
               <div className="bg-white p-8 shadow-sm">
                 <div className="text-accent text-4xl font-serif font-bold mb-4">24/7</div>
                 <h3 className="font-bold text-primary mb-2">Operational Uptime</h3>
                 <p className="text-muted-foreground text-sm">Reliable support and systems ensuring your business never stops.</p>
               </div>
               <div className="bg-white p-8 shadow-sm">
                 <div className="text-accent text-4xl font-serif font-bold mb-4">ROI</div>
                 <h3 className="font-bold text-primary mb-2">Focused</h3>
                 <p className="text-muted-foreground text-sm">Our services are designed to pay for themselves through efficiency and cost savings.</p>
               </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
