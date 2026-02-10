import { Navbar, Footer } from "@/components/layout";
import { CheckCircle2, Users, Target, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-primary py-24 text-white">
        <div className="container px-6 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">About Us</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            We are more than just accountants. We are your strategic partners in growth.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                At Alliance Street Accounting, our mission is to empower businesses globally with the financial clarity and operational efficiency they need to scale. We believe that high-quality financial management should be accessible, transparent, and driven by expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We combine the cost advantages of global outsourcing with the strategic insight of a top-tier CFO, giving you the best of both worlds.
              </p>
            </div>
            <div className="rounded-sm overflow-hidden shadow-2xl">
              <img src="/images/hero-building.jpg" alt="Our Office" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary mb-3">Precision</h3>
              <p className="text-muted-foreground">Accuracy is non-negotiable. We adhere to strict quality control standards to ensure your data is always correct.</p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary mb-3">Partnership</h3>
              <p className="text-muted-foreground">We view ourselves as an extension of your team, deeply invested in your long-term success.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary mb-3">Excellence</h3>
              <p className="text-muted-foreground">We constantly upskill our team and optimize our processes to deliver world-class service.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-primary text-white text-center">
        <div className="container px-6">
            <h2 className="text-3xl font-serif font-bold mb-8">Ready to work with us?</h2>
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-primary hover:bg-white rounded-none px-10 py-6 text-lg">
                Get in Touch
              </Button>
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
