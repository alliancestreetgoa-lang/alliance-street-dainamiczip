import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { ArrowRight, Calculator, BarChart3, Globe2, FileText, CheckCircle2, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url("/images/hero-building.jpg")' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        </div>

        <div className="container relative z-10 px-6 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Global Accounting & <br/>
              <span className="text-accent">Virtual CFO Services</span> <br/>
              Built for Growing Businesses
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed">
              Experience the clarity of global outsourcing with a local touch. We act as your long-term financial partners, providing scalable support from bookkeeping to strategic CFO insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-accent text-primary hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-none font-semibold shadow-lg shadow-black/20 transition-all">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 rounded-none backdrop-blur-sm transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="container px-6">
          <motion.div 
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary">Global Delivery, Local Understanding</h3>
              <p className="text-muted-foreground leading-relaxed">
                We bridge the gap between cost-effective global delivery and the nuance of local compliance and business culture across US, UK, EU, and UAE.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary">Beyond Bookkeeping</h3>
              <p className="text-muted-foreground leading-relaxed">
                We don't just record history; we help shape your future. Our Virtual CFO services provide the actionable insights you need to drive growth.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-serif text-primary">Scalable Finance Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                From startup to enterprise, our SOP-driven processes scale with you. We become a seamless extension of your internal team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-muted/50">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">Comprehensive Financial Solutions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to manage, optimize, and grow your business finances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Accounting Services" 
              description="Full-cycle accounting management ensuring accuracy and timeliness in your financial records."
              icon={Calculator}
            />
            <ServiceCard 
              title="Bookkeeping Services" 
              description="Day-to-day transaction recording, reconciliation, and ledger maintenance to keep you organized."
              icon={FileText}
            />
            <ServiceCard 
              title="Virtual CFO Services" 
              description="Strategic financial leadership, forecasting, and advisory without the cost of a full-time executive."
              icon={BarChart3}
            />
            <ServiceCard 
              title="Tax Filing & Compliance" 
              description="Expert handling of tax obligations across multiple jurisdictions to ensure full compliance."
              icon={ShieldCheck}
            />
            <ServiceCard 
              title="Back-Office Support" 
              description="Efficient data entry, administrative support, and process management to free up your time."
              icon={Users}
            />
            <ServiceCard 
              title="Data Entry & Processing" 
              description="Accurate and fast data processing services to support your operational needs."
              icon={FileText}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="link" className="text-primary font-medium text-lg hover:text-accent">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 overflow-hidden">
        <div className="container px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              {...fadeInUp}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
                <img src="/images/team-meeting.jpg" alt="Alliance Street Team" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 -z-0 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 -z-0 rounded-full blur-3xl" />
            </motion.div>
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Why Partner with <br/>Alliance Street?</h2>
              <p className="text-lg text-muted-foreground">
                We believe in building long-term partnerships, not just transactional vendor relationships. Our approach is rooted in process excellence and deep financial expertise.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Global outsourcing done right with seamless communication",
                  "Strict SOP-driven, process-based delivery models",
                  "Expertise up to Virtual CFO level for strategic guidance",
                  "Extension of your client finance teams",
                  "Scalable solutions that grow with your business"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/why-us">
                <Button className="bg-primary text-white rounded-none px-8 py-6 mt-4 hover:bg-primary/90">
                  Discover Our Approach
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Process */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Our Engagement Process</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Simple, transparent, and effective. We onboard quickly so you can see value immediately.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-white/20 -z-0 transform -translate-y-1/2" />

            {[
              { step: "01", title: "Understand", desc: "We analyze your business needs and pain points." },
              { step: "02", title: "Design", desc: "We create a custom service model for you." },
              { step: "03", title: "Implement", desc: "We set up processes and integrate systems." },
              { step: "04", title: "Deliver", desc: "Regular reporting and consistent execution." },
              { step: "05", title: "Optimize", desc: "Ongoing advisory and process improvement." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-primary border-4 border-accent rounded-full flex items-center justify-center text-2xl font-bold font-serif mb-6 group-hover:bg-accent group-hover:text-primary transition-colors shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 text-sm px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className="py-24">
        <div className="container px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-12">Global Coverage</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {["United States", "United Kingdom", "European Union", "UAE", "Canada", "India"].map((country) => (
              <div key={country} className="bg-muted px-8 py-4 rounded-sm border border-transparent hover:border-accent hover:bg-white hover:shadow-lg transition-all cursor-default">
                <span className="font-serif font-bold text-lg text-primary">{country}</span>
              </div>
            ))}
          </div>
          
          <p className="mt-12 text-muted-foreground max-w-2xl mx-auto">
            Our team understands the specific regulatory and business environments of these key markets, ensuring compliant and relevant financial management wherever you operate.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-6">
          <div className="bg-primary rounded-sm p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Streamline Your Finances?</h2>
              <p className="text-white/80 text-lg mb-10">
                Schedule a free strategy call to discuss how we can support your growth and optimize your financial operations.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-accent text-primary hover:bg-white hover:text-primary text-lg px-10 py-7 rounded-none font-semibold shadow-lg">
                  Book a Strategy Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
