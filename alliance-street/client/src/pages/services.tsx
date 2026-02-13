import { Navbar, Footer } from "@/components/layout";
import { ServiceCard } from "@/components/service-card";
import { Calculator, BarChart3, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/use-page-content";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } }
};

export default function Services() {
  const { data: content } = usePageContent("services");
  const hero = content?.hero || {};

  const services = [
    {
      title: "Accounting & Bookkeeping",
      description: "Scalable accounting and bookkeeping solutions that bring structure, clarity, and consistency to your financial operations.",
      icon: Calculator,
      image: "/images/service-accounting.png",
      details: {
        overview: "Our accounting and bookkeeping services are designed for modern businesses that need reliable, accurate, and timely financial records. Whether you're a startup or a scaling enterprise, we bring structure to your finances so your leadership team can focus entirely on growth and strategy.",
        features: ["Full-cycle bookkeeping including accounts payable and receivable", "Monthly, quarterly, and annual financial statement preparation", "Bank and credit card reconciliation across multiple accounts", "Revenue recognition and expense categorization", "Multi-currency accounting for international operations", "Cloud-based accounting setup (QuickBooks, Xero, Zoho)", "Customized chart of accounts tailored to your business", "Dedicated account manager for ongoing support"],
        benefits: "Accurate books are the foundation of every smart business decision. Our bookkeeping services eliminate financial blind spots, reduce errors, and give you real-time clarity into cash flow, profitability, and growth potential — so you can move fast with confidence."
      }
    },
    {
      title: "Virtual CFO Services",
      description: "Turn your financial data into a clear strategic roadmap with our flexible Virtual CFO services for executive-level insight.",
      icon: BarChart3,
      image: "/images/service-cfo.png",
      details: {
        overview: "Get the strategic financial leadership of a Chief Financial Officer without the full-time cost. Our Virtual CFO services provide high-level financial strategy, planning, and decision-support tailored to your business stage — from early growth through scaling and beyond.",
        features: ["Financial planning, budgeting, and forecasting", "Cash flow management and optimization strategies", "KPI dashboards and executive financial reporting", "Fundraising support — pitch decks, financial models, due diligence", "Pricing strategy and profitability analysis", "Board and investor reporting packages", "Strategic guidance on mergers, acquisitions, and exits", "Working capital and treasury management"],
        benefits: "A Virtual CFO bridges the gap between where your business is today and where you want it to be. We provide the executive financial perspective that helps you make data-driven decisions, optimize costs, attract investment, and scale sustainably."
      }
    },
    {
      title: "Tax Filing & Compliance",
      description: "Expert handling of tax obligations across multiple jurisdictions to ensure full compliance and minimize risk.",
      icon: ShieldCheck,
      image: "/images/service-tax.png",
      details: {
        overview: "Navigating multi-jurisdictional tax regulations can be overwhelming. Our tax compliance team ensures your business meets all filing deadlines, stays fully compliant, and takes advantage of every available deduction and credit — across the US, UK, EU, UAE, Canada, and India.",
        features: ["Corporate and individual income tax return preparation", "Sales tax, VAT, and GST registration and filing", "International tax planning and transfer pricing", "Tax calendar management and deadline tracking", "IRS, HMRC, and local authority correspondence handling", "Year-end tax planning and optimization", "Audit support and representation", "Compliance monitoring for regulatory changes"],
        benefits: "Tax compliance isn't just about meeting deadlines — it's about protecting your business from penalties while optimizing your tax position. We keep you compliant, reduce your tax burden, and free you from the stress of ever-changing regulations."
      }
    },
    {
      title: "Financial Analysis",
      description: "Deep dive into your numbers to uncover trends, opportunities, and risks with actionable business intelligence.",
      icon: TrendingUp,
      image: "/images/service-analysis.png",
      details: {
        overview: "Our financial analysis services transform raw data into powerful insights that drive smarter business decisions. We go beyond standard reporting to uncover the stories behind your numbers — identifying trends, opportunities, and risks before they impact your bottom line.",
        features: ["Profitability analysis by product, service, and customer segment", "Variance analysis comparing actuals to budgets and forecasts", "Break-even analysis and cost structure optimization", "Financial modeling for growth scenarios and projections", "Competitor benchmarking and industry comparison", "Working capital and liquidity analysis", "Custom dashboards with real-time data visualization", "Monthly management reports with strategic recommendations"],
        benefits: "In today's fast-moving markets, intuition isn't enough. Our financial analysis gives you the data-backed clarity to allocate resources wisely, identify profitable opportunities, and proactively manage risks — turning your financial data into your strongest competitive advantage."
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3" data-testid="text-services-subtitle">Our Services</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6" data-testid="text-services-title">{hero.heading || "Scalable Financial Solutions"}</motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/50 max-w-2xl mx-auto" data-testid="text-services-description">
              {hero.subheading || "Designed to support every stage of your business growth."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeUp}>
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  image={service.image}
                  details={service.details}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-20 card-float p-12 text-center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2 
              className="text-3xl font-extrabold text-black mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Need a custom solution?
            </motion.h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">
              We understand that every business is unique. Contact us to discuss a tailored engagement model that fits your specific requirements.
            </p>
            <Link href="/contact">
              <motion.button 
                className="btn-dark" 
                data-testid="button-discuss-needs"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Discuss Your Needs
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
