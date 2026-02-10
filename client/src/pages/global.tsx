import { Navbar, Footer } from "@/components/layout";
import { MapPin } from "lucide-react";

export default function Global() {
  const regions = [
    { name: "United States", desc: "Serving clients across all 50 states with GAAP compliant accounting." },
    { name: "United Kingdom", desc: "Expertise in HMRC regulations, VAT returns, and UK corporate tax." },
    { name: "European Union", desc: "Navigating cross-border VAT and country-specific compliance requirements." },
    { name: "UAE", desc: "Specialized support for Free Zone and Mainland companies, including Corporate Tax." },
    { name: "Canada", desc: "Handling CRA compliance, GST/HST filing, and Canadian payroll." },
    { name: "India", desc: "Cost-effective delivery centers with deep expertise in global accounting standards." },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-primary py-24 text-white">
        <div className="container px-6 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Global Coverage</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Wherever you do business, we have the expertise to keep you compliant and efficient.
          </p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 50">
             {/* Simple stylized dots representing map */}
             <circle cx="20" cy="15" r="1" fill="currentColor" />
             <circle cx="25" cy="18" r="1" fill="currentColor" />
             <circle cx="48" cy="12" r="1" fill="currentColor" />
             <circle cx="52" cy="14" r="1" fill="currentColor" />
             <circle cx="70" cy="20" r="1" fill="currentColor" />
             <circle cx="80" cy="35" r="1" fill="currentColor" />
           </svg>
        </div>

        <div className="container px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, i) => (
              <div key={i} className="group bg-muted/30 p-8 rounded-sm border border-transparent hover:border-accent hover:bg-white hover:text-black transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/10 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary group-hover:text-black">{region.name}</h3>
                </div>
                <p className="text-muted-foreground group-hover:text-gray-600">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
