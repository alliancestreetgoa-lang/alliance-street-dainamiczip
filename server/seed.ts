import bcrypt from "bcrypt";
import { db } from "./db";
import { users, pageContents, siteSettings } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export async function autoSeed() {
  try {
    const existingAdmin = await db.select().from(users).where(eq(users.username, "admin"));
    if (existingAdmin.length > 0) {
      return;
    }

    console.log("Auto-seeding database...");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({ username: "admin", password: hashedPassword });
    console.log("  Admin user created");

    const contentItems = [
      { page: "home", sectionKey: "hero", content: { heading: "Global Accounting & <span class='text-red-500'>Virtual CFO</span> Services Built for Growing Businesses", subheading: "At Alliance Street, we provide the financial clarity and operational backbone you need to scale — from bookkeeping to strategic CFO insights.", ctaPrimary: "Let's talk", ctaSecondary: "Our solutions" } },
      { page: "home", sectionKey: "mission", content: { text: "Our mission is to help businesses earn more and keep what they deserve — which is everything." } },
      { page: "home", sectionKey: "process", content: { title: "The Battleplan", subtitle: "Our Process", description: "Simple, transparent, and effective. We onboard quickly so you can see value immediately.", steps: ["Discovery Call", "Scope & Plan", "Onboard & Setup", "Execute & Deliver", "Review & Improve"] } },
      { page: "home", sectionKey: "whyUs", content: { title: "Why Partner with Alliance Street?", description: "We believe in building long-term partnerships, not just transactional vendor relationships.", points: ["Global outsourcing done right with seamless communication", "Strict SOP-driven, process-based delivery models", "Expertise up to Virtual CFO level for strategic guidance", "Extension of your client finance teams", "Scalable solutions that grow with your business"] } },
      { page: "about", sectionKey: "hero", content: { heading: "We are more than just accountants.", subheading: "We are your strategic partners in growth." } },
      { page: "about", sectionKey: "mission", content: { title: "Our Mission", paragraph1: "At Alliance Street Accounting, our mission is to empower businesses globally with the financial clarity and operational efficiency they need to scale. We believe that high-quality financial management should be accessible, transparent, and driven by expertise.", paragraph2: "We combine the cost advantages of global outsourcing with the strategic insight of a top-tier CFO, giving you the best of both worlds." } },
      { page: "about", sectionKey: "values", content: { title: "The foundation of everything we do.", items: [{ title: "Precision", description: "Accuracy is non-negotiable. We adhere to strict quality control standards to ensure your data is always correct." }, { title: "Partnership", description: "We view ourselves as an extension of your team, deeply invested in your long-term success." }, { title: "Excellence", description: "We constantly upskill our team and optimize our processes to deliver world-class service." }] } },
      { page: "services", sectionKey: "hero", content: { heading: "Scalable Financial Solutions", subheading: "Designed to support every stage of your business growth." } },
      { page: "services", sectionKey: "services", content: { items: [{ title: "Accounting & Bookkeeping", description: "Scalable accounting and bookkeeping solutions that bring structure, clarity, and consistency to your financial operations.", image: "/images/service-accounting.png", overview: "Our accounting and bookkeeping services are designed for modern businesses that need reliable, accurate, and timely financial records.", features: ["Full-cycle bookkeeping including accounts payable and receivable", "Monthly, quarterly, and annual financial statement preparation", "Bank and credit card reconciliation across multiple accounts", "Multi-currency accounting for international operations", "Cloud-based accounting setup (QuickBooks, Xero, Zoho)", "Dedicated account manager for ongoing support"], benefits: "Accurate books are the foundation of every smart business decision." }, { title: "Virtual CFO Services", description: "Turn your financial data into a clear strategic roadmap with our flexible Virtual CFO services for executive-level insight.", image: "/images/service-cfo.png", overview: "Get the strategic financial leadership of a Chief Financial Officer without the full-time cost.", features: ["Financial planning, budgeting, and forecasting", "Cash flow management and optimization strategies", "KPI dashboards and executive financial reporting", "Fundraising support — pitch decks, financial models, due diligence", "Board and investor reporting packages", "Strategic guidance on mergers, acquisitions, and exits"], benefits: "A Virtual CFO bridges the gap between where your business is today and where you want it to be." }, { title: "Tax Filing & Compliance", description: "Expert handling of tax obligations across multiple jurisdictions to ensure full compliance and minimize risk.", image: "/images/service-tax.png", overview: "Our tax compliance team ensures your business meets all filing deadlines, stays fully compliant, and takes advantage of every available deduction.", features: ["Corporate and individual income tax return preparation", "Sales tax, VAT, and GST registration and filing", "International tax planning and transfer pricing", "Year-end tax planning and optimization", "Audit support and representation", "Compliance monitoring for regulatory changes"], benefits: "Tax compliance protects your business from penalties while optimizing your tax position." }, { title: "Financial Analysis", description: "Deep dive into your numbers to uncover trends, opportunities, and risks with actionable business intelligence.", image: "/images/service-analysis.png", overview: "We transform raw data into powerful insights that drive smarter business decisions.", features: ["Profitability analysis by product, service, and customer segment", "Variance analysis comparing actuals to budgets and forecasts", "Financial modeling for growth scenarios and projections", "Custom dashboards with real-time data visualization", "Monthly management reports with strategic recommendations"], benefits: "Our financial analysis gives you data-backed clarity to allocate resources wisely." }] } },
      { page: "contact", sectionKey: "hero", content: { heading: "Get in Touch", subheading: "Ready to streamline your finances? We'd love to hear from you." } },
      { page: "contact", sectionKey: "info", content: { email: "shaukin@alliancestreet.ae", phone: "+91 7375096163", hours: "Monday – Friday, 11:00 AM – 10:00 PM (IST)" } },
    ];

    for (const item of contentItems) {
      await db.insert(pageContents).values(item);
    }
    console.log("  Page content seeded");

    const settingsItems = [
      { key: "site_name", value: "Alliance Street Accounting" },
      { key: "tagline", value: "Global Accounting & Virtual CFO Services" },
      { key: "contact_email", value: "shaukin@alliancestreet.ae" },
      { key: "contact_phone", value: "+91 7375096163" },
      { key: "business_hours", value: "Monday – Friday, 11:00 AM – 10:00 PM (IST)" },
      { key: "meta_title", value: "Alliance Street Accounting | Global Accounting & Virtual CFO" },
      { key: "meta_description", value: "Professional accounting, bookkeeping, tax compliance, and Virtual CFO services for businesses across the US, UK, EU, UAE, Canada, and India." },
    ];

    for (const item of settingsItems) {
      await db.insert(siteSettings).values(item);
    }
    console.log("  Site settings seeded");

    console.log("Auto-seed complete!");
  } catch (error) {
    console.error("Auto-seed error:", error);
  }
}
