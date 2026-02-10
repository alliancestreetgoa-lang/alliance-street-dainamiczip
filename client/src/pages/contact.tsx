import { Navbar, Footer } from "@/components/layout";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, Globe2, MapPin } from "lucide-react";
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

export default function Contact() {
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
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6">Let's Talk</motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/50 max-w-2xl">
              Ready to transform your financial operations? Get in touch with our team today.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="card-float p-8 md:p-12"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h2 className="text-2xl font-extrabold text-black mb-8">Send us a message</h2>
              <ContactForm />
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div 
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
                variants={fadeRight}
              >
                <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
                <p className="text-white/50 leading-relaxed mb-8">
                  Whether you're looking for a virtual CFO, need help with bookkeeping, or want to discuss a custom outsourcing solution, we're here to help.
                </p>

                <motion.div 
                  className="space-y-6"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: Mail, title: "Email Us", content: <a href="mailto:shaukin@alliancestreet.ae" className="text-red-400 hover:text-red-300 transition-colors">shaukin@alliancestreet.ae</a>, sub: "We typically reply within 24 hours." },
                    { icon: Phone, title: "Call Us", content: <a href="tel:+917375096163" className="text-white/60 hover:text-white transition-colors">+91 7375096163</a>, sub: "Mon-Fri, 11:00 AM - 10:00 PM (IST)" },
                    { icon: Globe2, title: "Global Headquarters", content: <span className="text-white/60">Serving clients globally with major hubs in US, UK, and UAE.</span>, sub: null }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-4"
                      variants={fadeUp}
                      whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }}
                    >
                      <motion.div 
                        className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className="w-5 h-5 text-red-500" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        {item.content}
                        {item.sub && <p className="text-xs text-white/40 mt-1">{item.sub}</p>}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
                variants={fadeRight}
                whileHover={{ y: -3, transition: { type: "spring", stiffness: 300 } }}
              >
                <h4 className="font-bold text-white mb-2">Existing Client?</h4>
                <p className="text-white/50 text-sm">
                  Please reach out to your dedicated account manager directly for the fastest support.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
