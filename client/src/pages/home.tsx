import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { ArrowRight, Calculator, BarChart3, Globe2, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="text-sm text-white/70">Global Accounting & Outsourcing Firm</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-500" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-[0.95] tracking-tight" data-testid="hero-heading">
              Global Accounting &{" "}
              <span className="text-red-500">Virtual CFO</span> Services Built for Growing Businesses
            </h1>

            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
              At Alliance Street, we provide the financial clarity and operational backbone you need to scale — from bookkeeping to strategic CFO insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="btn-dark text-base" data-testid="hero-cta-primary">
                  Let's talk
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline-dark text-base flex items-center gap-2" data-testid="hero-cta-secondary">
                  Our solutions
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement - floating white card */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="card-float p-12 md:p-16 max-w-5xl mx-auto">
            <p className="text-2xl md:text-4xl font-bold leading-snug">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-red-800">Our mission is to</span>{" "}
              <span className="text-red-600">help businesses</span>{" "}
              <span className="text-black">earn more and keep what they deserve —</span>{" "}
              <span className="text-red-400">which is everything.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Globe2, title: "Global Delivery, Local Understanding", desc: "We bridge the gap between cost-effective global delivery and the nuance of local compliance and business culture across US, UK, EU, and UAE." },
              { icon: TrendingUp, title: "Beyond Bookkeeping", desc: "We don't just record history; we help shape your future. Our Virtual CFO services provide the actionable insights you need to drive growth." },
              { icon: ShieldCheck, title: "Scalable Finance Support", desc: "From startup to enterprise, our SOP-driven processes scale with you. We become a seamless extension of your internal team." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Solutions</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Solutions designed to meet your needs.</h2>
            </div>
            <Link href="/services">
              <button className="btn-outline-dark text-sm flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4 text-red-500" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard 
              title="Accounting & Bookkeeping" 
              description="Scalable solutions that bring structure, clarity, and consistency to your financial operations."
              icon={Calculator}
              image="/images/service-accounting.png"
              details={{
                overview: "Our accounting and bookkeeping services are designed for modern businesses that need reliable, accurate, and timely financial records.",
                features: ["Full-cycle bookkeeping including accounts payable and receivable", "Monthly, quarterly, and annual financial statement preparation", "Bank and credit card reconciliation", "Multi-currency accounting for international operations", "Cloud-based accounting setup (QuickBooks, Xero, Zoho)", "Dedicated account manager for ongoing support"],
                benefits: "Accurate books are the foundation of every smart business decision. Our services eliminate financial blind spots and give you real-time clarity into cash flow and profitability."
              }}
            />
            <ServiceCard 
              title="Virtual CFO Services" 
              description="Turn your financial data into a clear strategic roadmap with executive-level insight."
              icon={BarChart3}
              image="/images/service-cfo.png"
              details={{
                overview: "Get the strategic financial leadership of a CFO without the full-time cost. High-level financial strategy tailored to your business stage.",
                features: ["Financial planning, budgeting, and forecasting", "Cash flow management and optimization", "KPI dashboards and executive reporting", "Fundraising support — pitch decks and financial models", "Board and investor reporting packages", "Strategic guidance on mergers and exits"],
                benefits: "A Virtual CFO bridges the gap between where your business is today and where you want it to be, helping you make data-driven decisions and scale sustainably."
              }}
            />
            <ServiceCard 
              title="Tax Filing & Compliance" 
              description="Expert handling of tax obligations across multiple jurisdictions to ensure full compliance."
              icon={ShieldCheck}
              image="/images/service-tax.png"
              details={{
                overview: "Our tax compliance team ensures your business meets all filing deadlines, stays fully compliant, and takes advantage of every available deduction.",
                features: ["Corporate and individual tax return preparation", "Sales tax, VAT, and GST registration and filing", "International tax planning and transfer pricing", "Year-end tax planning and optimization", "Audit support and representation", "Compliance monitoring for regulatory changes"],
                benefits: "Tax compliance protects your business from penalties while optimizing your tax position. We keep you compliant and reduce your tax burden."
              }}
            />
            <ServiceCard 
              title="Financial Analysis" 
              description="Deep dive into your numbers to uncover trends, opportunities, and risks."
              icon={TrendingUp}
              image="/images/service-analysis.png"
              details={{
                overview: "We transform raw data into powerful insights that drive smarter business decisions, going beyond standard reporting to uncover the stories behind your numbers.",
                features: ["Profitability analysis by product and customer segment", "Variance analysis comparing actuals to forecasts", "Financial modeling for growth scenarios", "Competitor benchmarking and industry comparison", "Custom dashboards with real-time visualization", "Monthly management reports with recommendations"],
                benefits: "Our financial analysis gives you data-backed clarity to allocate resources wisely, identify profitable opportunities, and proactively manage risks."
              }}
            />
          </div>
        </div>
      </section>

      {/* Why Us Section - with image */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="card-float p-10 md:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 relative">
                <div className="rounded-2xl overflow-hidden">
                  <img src="/images/team-meeting.jpg" alt="Alliance Street Team" className="w-full h-auto object-cover" />
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-6">
                <p className="text-red-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-black">Why Partner with Alliance Street?</h2>
                <p className="text-gray-500 leading-relaxed">
                  We believe in building long-term partnerships, not just transactional vendor relationships.
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
                      <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/why-us">
                  <button className="btn-dark mt-4">
                    Discover Our Approach
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Process</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">The Battleplan</h2>
            <p className="text-white/50 max-w-2xl mx-auto">Simple, transparent, and effective. We onboard quickly so you can see value immediately.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Understand", desc: "We analyze your business needs and pain points." },
              { step: "02", title: "Design", desc: "We create a custom service model for you." },
              { step: "03", title: "Implement", desc: "We set up processes and integrate systems." },
              { step: "04", title: "Deliver", desc: "Regular reporting and consistent execution." },
              { step: "05", title: "Optimize", desc: "Ongoing advisory and process improvement." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl font-extrabold text-red-500 mb-5 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Global Coverage</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12">Trusted Worldwide</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {["United States", "United Kingdom", "European Union", "UAE", "Canada", "India"].map((country) => (
              <div key={country} className="bg-white/5 border border-white/10 px-8 py-4 rounded-full hover:bg-white hover:text-black hover:border-transparent hover:shadow-lg transition-all cursor-default group text-center">
                <span className="font-bold text-white/80 group-hover:text-black">{country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-700" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Streamline Your Finances?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Schedule a free strategy call to discuss how we can support your growth and optimize your financial operations.
              </p>
              <Link href="/contact">
                <button className="bg-white text-black rounded-full px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-all shadow-lg" data-testid="cta-book-call">
                  Book a Strategy Call
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
