import { Navbar, Footer } from "@/components/layout";
import { ServiceCard } from "@/components/service-card";
import { Calculator, BarChart3, ShieldCheck, FileText, Users, Search, Briefcase, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      title: "Accounting Services",
      description: "Comprehensive accounting management tailored to your industry standards. We handle everything from general ledger maintenance to complex financial statement preparation.",
      icon: Calculator
    },
    {
      title: "Virtual CFO",
      description: "Strategic financial guidance to help you navigate growth. Includes cash flow management, budgeting, financial modeling, and board-level reporting.",
      icon: BarChart3
    },
    {
      title: "Bookkeeping",
      description: "Meticulous recording of daily financial transactions. We ensure your books are always up-to-date, reconciled, and audit-ready.",
      icon: FileText
    },
    {
      title: "Tax Compliance",
      description: "Navigating the complexities of local and international tax laws. We assist with filing, planning, and ensuring full compliance to minimize risk.",
      icon: ShieldCheck
    },
    {
      title: "Back-Office Support",
      description: "Streamline your operations with our administrative support. From invoicing to payroll processing, we handle the tasks that slow you down.",
      icon: Users
    },
    {
      title: "Data Entry & Processing",
      description: "High-volume data processing with speed and accuracy. Perfect for businesses with significant document management needs.",
      icon: Search
    },
    {
      title: "Financial Analysis",
      description: "Deep dive into your numbers to uncover trends, opportunities, and risks. We turn data into actionable business intelligence.",
      icon: Briefcase
    },
    {
      title: "Payroll Management",
      description: "End-to-end payroll processing ensuring your team gets paid on time, every time, with all tax withholdings and benefits handled correctly.",
      icon: Coins
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-primary py-24 text-white">
        <div className="container px-6 pt-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Scalable financial solutions designed to support every stage of your business growth.
          </p>
        </div>
      </div>

      <section className="py-24">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                className="h-full"
              />
            ))}
          </div>

          <div className="mt-24 bg-muted rounded-sm p-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Need a custom solution?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              We understand that every business is unique. Contact us to discuss a tailored engagement model that fits your specific requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 py-6">
                Discuss Your Needs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
