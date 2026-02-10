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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Global Coverage</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Wherever You Do Business</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            We have the expertise to keep you compliant and efficient.
          </p>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white hover:text-black hover:border-transparent hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-500/10 p-3 rounded-xl group-hover:bg-red-50 transition-colors">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-black transition-colors">{region.name}</h3>
                </div>
                <p className="text-white/50 group-hover:text-gray-500 transition-colors">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
