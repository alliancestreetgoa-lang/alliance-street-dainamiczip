import { Navbar, Footer } from "@/components/layout";
import { ShieldCheck, Globe, Users } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } }
};

export default function WhyUs() {
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
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Why Us</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6">Why Alliance Street?</motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/50 max-w-2xl">
              The difference is in the delivery. Here's what sets us apart from traditional outsourcing firms.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="card-float p-10 md:p-16"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold text-black mb-6">A Strategic Partner for Scaled Organizations</h2>
                <p className="text-gray-500 leading-relaxed text-lg mb-4">
                  Most outsourcing providers focus on task execution. We focus on outcomes.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg">
                  At Alliance Street, we partner with leadership teams to gain a deep understanding of your operating model, strategic priorities, and growth agenda. This enables us to deliver forward-looking insights, proactive advisory support, and reporting that informs decision-making at the highest levels. We don't simply support your business—we help shape its direction.
                </p>
              </motion.div>
              
              <motion.div 
                className="space-y-8"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { icon: ShieldCheck, title: "SOP-Driven Excellence", desc: "We document every process. Our rigorous Standard Operating Procedures ensure consistency and quality, no matter the task." },
                  { icon: Users, title: "Virtual CFO Expertise", desc: "Access high-level financial strategy usually reserved for large corporations, at a fraction of the cost." },
                  { icon: Globe, title: "Global Compliance", desc: "We stay up-to-date with regulations in the US, UK, EU, UAE, Canada, and India so you don't have to." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4"
                    variants={fadeRight}
                    whileHover={{ x: 6, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <motion.div 
                      className="bg-red-50 p-3 h-fit rounded-xl shrink-0"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="w-6 h-6 text-red-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Commitment</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-12">Built on Trust</motion.h2>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { stat: "100%", title: "Data Security", desc: "Enterprise-grade security protocols to protect your sensitive financial data." },
              { stat: "24/7", title: "Operational Uptime", desc: "Reliable support and systems ensuring your business never stops." },
              { stat: "ROI", title: "Focused", desc: "Our services are designed to pay for themselves through efficiency and cost savings." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="bg-white text-black p-8 rounded-2xl"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <motion.div 
                  className="text-red-500 text-4xl font-extrabold mb-3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                >
                  {item.stat}
                </motion.div>
                <h3 className="font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
