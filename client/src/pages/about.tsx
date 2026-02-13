import { Navbar, Footer } from "@/components/layout";
import { Users, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/use-page-content";

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

export default function About() {
  const { data: content } = usePageContent("about");
  const hero = content?.hero || {};
  const mission = content?.mission || {};
  const values = content?.values || {};

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
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">About Us</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6">{hero.heading || "We are more than just accountants."}</motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/50 max-w-2xl">
              {hero.subheading || "We are your strategic partners in growth."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="card-float p-10 md:p-16"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div 
              className="space-y-6 max-w-3xl mx-auto text-center"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-black">{mission.title || "Our Mission"}</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed text-lg">
                {mission.paragraph1 || "At Alliance Street Accounting Pvt Ltd, our mission is to empower businesses globally with the financial clarity and operational efficiency they need to scale. We believe that high-quality financial management should be accessible, transparent, and driven by expertise."}
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed text-lg">
                {mission.paragraph2 || "We combine the cost advantages of global outsourcing with the strategic insight of a top-tier CFO, giving you the best of both worlds."}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Our Values</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-6">The foundation of everything we do.</motion.h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { icon: Target, title: "Precision", desc: "Accuracy is non-negotiable. We adhere to strict quality control standards to ensure your data is always correct." },
              { icon: Users, title: "Partnership", desc: "We view ourselves as an extension of your team, deeply invested in your long-term success." },
              { icon: Trophy, title: "Excellence", desc: "We constantly upskill our team and optimize our processes to deliver world-class service." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="bg-white text-black p-8 rounded-2xl border border-gray-100"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <motion.div 
                  className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-6 h-6 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-12 md:p-16 text-center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h2 
              className="text-3xl font-extrabold text-white mb-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Ready to work with us?
            </motion.h2>
            <Link href="/contact">
              <motion.button 
                className="relative bg-white text-black rounded-full px-12 py-5 font-bold text-lg shadow-[0_6px_0_0_rgba(200,200,200,1),0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_0_rgba(200,200,200,1),0_6px_16px_rgba(0,0,0,0.3)] active:shadow-[0_1px_0_0_rgba(200,200,200,1),0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-100"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98, y: 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
