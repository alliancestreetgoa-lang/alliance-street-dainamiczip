import { Navbar, Footer } from "@/components/layout";
import { ServiceCard } from "@/components/service-card";
import { Calculator, BarChart3, ShieldCheck, Briefcase } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    { title: "Accounting Services", description: "Comprehensive accounting management tailored to your industry standards. We handle everything from general ledger maintenance to complex financial statement preparation.", icon: Calculator },
    { title: "Virtual CFO", description: "Strategic financial guidance to help you navigate growth. Includes cash flow management, budgeting, financial modeling, and board-level reporting.", icon: BarChart3 },
    { title: "Tax Compliance", description: "Navigating the complexities of local and international tax laws. We assist with filing, planning, and ensuring full compliance to minimize risk.", icon: ShieldCheck },
    { title: "Financial Analysis", description: "Deep dive into your numbers to uncover trends, opportunities, and risks. We turn data into actionable business intelligence.", icon: Briefcase }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container px-6 text-center">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Scalable Financial Solutions</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Designed to support every stage of your business growth.
          </p>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-20 card-float p-12 text-center">
            <h2 className="text-3xl font-extrabold text-black mb-4">Need a custom solution?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">
              We understand that every business is unique. Contact us to discuss a tailored engagement model that fits your specific requirements.
            </p>
            <Link href="/contact">
              <button className="btn-dark">Discuss Your Needs</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
