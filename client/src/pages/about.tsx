import { Navbar, Footer } from "@/components/layout";
import { Users, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container px-6">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">About Us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">We are more than just accountants.</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            We are your strategic partners in growth.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div className="card-float p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-black">Our Mission</h2>
                <p className="text-gray-500 leading-relaxed text-lg">
                  At Alliance Street Accounting, our mission is to empower businesses globally with the financial clarity and operational efficiency they need to scale. We believe that high-quality financial management should be accessible, transparent, and driven by expertise.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg">
                  We combine the cost advantages of global outsourcing with the strategic insight of a top-tier CFO, giving you the best of both worlds.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="/images/hero-building.jpg" alt="Our Office" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div className="text-center mb-12">
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Values</p>
            <h2 className="text-3xl font-extrabold text-white mb-6">The foundation of everything we do.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Precision", desc: "Accuracy is non-negotiable. We adhere to strict quality control standards to ensure your data is always correct." },
              { icon: Users, title: "Partnership", desc: "We view ourselves as an extension of your team, deeply invested in your long-term success." },
              { icon: Trophy, title: "Excellence", desc: "We constantly upskill our team and optimize our processes to deliver world-class service." }
            ].map((item, i) => (
              <div key={i} className="bg-white text-black p-8 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-12 md:p-16 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-8">Ready to work with us?</h2>
            <Link href="/contact">
              <button className="bg-white text-black rounded-full px-10 py-4 font-bold text-lg hover:bg-gray-100 transition-all">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
