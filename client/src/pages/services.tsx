import { Navbar, Footer } from "@/components/layout";
import { ServiceCard } from "@/components/service-card";
import { Calculator, BarChart3, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      title: "Accounting & Bookkeeping",
      description: "Scalable accounting and bookkeeping solutions that bring structure, clarity, and consistency to your financial operations.",
      icon: Calculator,
      image: "/images/service-accounting.png",
      details: {
        overview: "Our accounting and bookkeeping services are designed for modern businesses that need reliable, accurate, and timely financial records. Whether you're a startup or a scaling enterprise, we bring structure to your finances so your leadership team can focus entirely on growth and strategy.",
        features: [
          "Full-cycle bookkeeping including accounts payable and receivable",
          "Monthly, quarterly, and annual financial statement preparation",
          "Bank and credit card reconciliation across multiple accounts",
          "Revenue recognition and expense categorization",
          "Multi-currency accounting for international operations",
          "Cloud-based accounting setup (QuickBooks, Xero, Zoho)",
          "Customized chart of accounts tailored to your business",
          "Dedicated account manager for ongoing support"
        ],
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
        features: [
          "Financial planning, budgeting, and forecasting",
          "Cash flow management and optimization strategies",
          "KPI dashboards and executive financial reporting",
          "Fundraising support — pitch decks, financial models, due diligence",
          "Pricing strategy and profitability analysis",
          "Board and investor reporting packages",
          "Strategic guidance on mergers, acquisitions, and exits",
          "Working capital and treasury management"
        ],
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
        features: [
          "Corporate and individual income tax return preparation",
          "Sales tax, VAT, and GST registration and filing",
          "International tax planning and transfer pricing",
          "Tax calendar management and deadline tracking",
          "IRS, HMRC, and local authority correspondence handling",
          "Year-end tax planning and optimization",
          "Audit support and representation",
          "Compliance monitoring for regulatory changes"
        ],
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
        features: [
          "Profitability analysis by product, service, and customer segment",
          "Variance analysis comparing actuals to budgets and forecasts",
          "Break-even analysis and cost structure optimization",
          "Financial modeling for growth scenarios and projections",
          "Competitor benchmarking and industry comparison",
          "Working capital and liquidity analysis",
          "Custom dashboards with real-time data visualization",
          "Monthly management reports with strategic recommendations"
        ],
        benefits: "In today's fast-moving markets, intuition isn't enough. Our financial analysis gives you the data-backed clarity to allocate resources wisely, identify profitable opportunities, and proactively manage risks — turning your financial data into your strongest competitive advantage."
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container px-6 text-center">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3" data-testid="text-services-subtitle">Our Services</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6" data-testid="text-services-title">Scalable Financial Solutions</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto" data-testid="text-services-description">
            Designed to support every stage of your business growth.
          </p>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                details={service.details}
                className="h-full"
              />
            ))}
          </div>

          <div className="mt-20 card-float p-12 text-center">
            <h2 className="text-3xl font-extrabold text-black mb-4">Need a custom solution?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">
              We understand that every business is unique. Contact us to discuss a tailored engagement model that fits your specific requirements.
            </p>
            <Link href="/contact">
              <button className="btn-dark" data-testid="button-discuss-needs">Discuss Your Needs</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
