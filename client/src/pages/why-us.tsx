import { Navbar, Footer } from "@/components/layout";
import { ShieldCheck, Globe, Users } from "lucide-react";
import { Link } from "wouter";

export default function WhyUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Why Us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Why Alliance Street?</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            The difference is in the delivery. Here's what sets us apart from traditional outsourcing firms.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="card-float p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl font-extrabold text-black mb-6">A Strategic Partner for Scaled Organizations</h2>
                <p className="text-gray-500 leading-relaxed text-lg mb-4">
                  Most outsourcing providers focus on task execution. We focus on outcomes.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg">
                  At Alliance Street, we partner with leadership teams to gain a deep understanding of your operating model, strategic priorities, and growth agenda. This enables us to deliver forward-looking insights, proactive advisory support, and reporting that informs decision-making at the highest levels. We don't simply support your business—we help shape its direction.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "SOP-Driven Excellence", desc: "We document every process. Our rigorous Standard Operating Procedures ensure consistency and quality, no matter the task." },
                  { icon: Users, title: "Virtual CFO Expertise", desc: "Access high-level financial strategy usually reserved for large corporations, at a fraction of the cost." },
                  { icon: Globe, title: "Global Compliance", desc: "We stay up-to-date with regulations in the US, UK, EU, UAE, Canada, and India so you don't have to." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-red-50 p-3 h-fit rounded-xl shrink-0">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Commitment</p>
          <h2 className="text-3xl font-extrabold text-white mb-12">Built on Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "100%", title: "Data Security", desc: "Enterprise-grade security protocols to protect your sensitive financial data." },
              { stat: "24/7", title: "Operational Uptime", desc: "Reliable support and systems ensuring your business never stops." },
              { stat: "ROI", title: "Focused", desc: "Our services are designed to pay for themselves through efficiency and cost savings." }
            ].map((item, i) => (
              <div key={i} className="bg-white text-black p-8 rounded-2xl">
                <div className="text-red-500 text-4xl font-extrabold mb-3">{item.stat}</div>
                <h3 className="font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
