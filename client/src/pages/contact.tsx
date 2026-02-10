import { Navbar, Footer } from "@/components/layout";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, Globe2, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">Contact Us</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Let's Talk</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            Ready to transform your financial operations? Get in touch with our team today.
          </p>
        </div>
      </section>

      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-float p-8 md:p-12">
              <h2 className="text-2xl font-extrabold text-black mb-8">Send us a message</h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
                <p className="text-white/50 leading-relaxed mb-8">
                  Whether you're looking for a virtual CFO, need help with bookkeeping, or want to discuss a custom outsourcing solution, we're here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Email Us</h4>
                      <a href="mailto:shaukin@alliancestreet.ae" className="text-red-400 hover:text-red-300 transition-colors">shaukin@alliancestreet.ae</a>
                      <p className="text-xs text-white/40 mt-1">We typically reply within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Call Us</h4>
                      <a href="tel:+917375096163" className="text-white/60 hover:text-white transition-colors">+91 7375096163</a>
                      <p className="text-xs text-white/40 mt-1">Mon-Fri, 11:00 AM - 10:00 PM (IST)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Globe2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Global Headquarters</h4>
                      <p className="text-white/60">Serving clients globally with major hubs in US, UK, and UAE.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h4 className="font-bold text-white mb-2">Existing Client?</h4>
                <p className="text-white/50 text-sm">
                  Please reach out to your dedicated account manager directly for the fastest support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
