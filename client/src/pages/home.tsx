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
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-white">
      <Navbar />

      {/* New Hero Section based on image */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 md:px-6">
        
        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] p-8 md:p-16 lg:p-20 max-w-[1400px] w-full relative shadow-2xl overflow-hidden min-h-[70vh] flex flex-col justify-center"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-lg hidden md:block opacity-50"></div>
          <div className="absolute bottom-12 right-40 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-lg hidden md:block opacity-50"></div>

          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-3 bg-gray-100/80 p-1.5 pr-4 rounded-full w-fit">
            <span className="bg-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm text-gray-700">New</span>
            <span className="text-sm font-medium text-gray-600">Alliance Street is nominated as best business consulting firm in Asia</span>
            <span className="text-xs font-bold text-gray-800 underline cursor-pointer hover:text-accent">Read more</span>
          </div>

          <div className="max-w-5xl relative z-10">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-black leading-[1.1] tracking-tight mb-8">
              Clean, Legal, Compliant: <br/>
              Go Global, Save Taxes & <br/>
              Protect Your Assets
            </h1>
            
            <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed font-medium">
              At Alliance Street, we built business structures that help you protect your assets and eliminate taxation (often fully) - corporate & private.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/contact">
                <Button className="bg-black text-white hover:bg-black/80 text-lg px-10 py-7 rounded-full font-medium transition-all hover:scale-105 shadow-xl shadow-black/20">
                  Let's talk
                </Button>
              </Link>
              <Link href="/services">
                <div className="group flex items-center gap-2 text-lg font-bold text-gray-800 cursor-pointer hover:text-accent transition-colors">
                  <span>Our solutions</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Gradient Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-black via-accent to-accent/50"></div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white rounded-t-[2.5rem] -mt-8 relative z-10">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Comprehensive Financial Solutions</h2>
            <p className="text-gray-500 text-lg">Everything you need to manage, optimize, and grow your business finances.</p>
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
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              {...fadeInUp}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/team-meeting.jpg" alt="Alliance Street Team" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 -z-0 rounded-full blur-3xl" />
            </motion.div>
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-black">Why Partner with <br/>Alliance Street?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
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
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/why-us">
                <Button className="bg-black text-white rounded-full px-8 py-6 mt-4 hover:bg-accent transition-colors">
                  Discover Our Approach
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
