import { Navbar, Footer } from "@/components/layout";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

export default function Global() {
  const regions = [
    { name: "United States", desc: "Serving clients across all 50 states with GAAP compliant accounting.", image: "/images/region-us.png" },
    { name: "United Kingdom", desc: "Expertise in HMRC regulations, VAT returns, and UK corporate tax.", image: "/images/region-uk.png" },
    { name: "European Union", desc: "Navigating cross-border VAT and country-specific compliance requirements.", image: "/images/region-eu.png" },
    { name: "UAE", desc: "Specialized support for Free Zone and Mainland companies, including Corporate Tax.", image: "/images/region-uae.png" },
    { name: "Canada", desc: "Handling CRA compliance, GST/HST filing, and Canadian payroll.", image: "/images/region-canada.png" },
    { name: "India", desc: "Cost-effective delivery centers with deep expertise in global accounting standards.", image: "/images/region-india.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Global Coverage</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6">Wherever You Do Business</motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/50 max-w-2xl">
              We have the expertise to keep you compliant and efficient.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {regions.map((region, i) => (
              <motion.div 
                key={i} 
                className="group relative overflow-hidden rounded-2xl border border-white/10 min-h-[280px] flex flex-col justify-end cursor-pointer"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <div className="absolute inset-0 z-0">
                  <img src={region.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                </div>
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="bg-red-500/20 backdrop-blur-sm p-3 rounded-xl border border-red-500/20"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MapPin className="w-5 h-5 text-red-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">{region.name}</h3>
                  </div>
                  <p className="text-white/60">{region.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
