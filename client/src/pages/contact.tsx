import { Navbar, Footer } from "@/components/layout";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="bg-primary py-24 text-white">
        <div className="container px-6 pt-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Ready to transform your financial operations? Get in touch with our team today.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white -mt-12 relative z-10">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-sm shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8">Send us a message</h2>
              <ContactForm />
            </div>

            <div className="space-y-12 py-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Get in Touch</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking for a virtual CFO, need help with bookkeeping, or want to discuss a custom outsourcing solution, we're here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Email Us</h4>
                      <a href="mailto:hello@alliancestreet.com" className="text-accent hover:underline">hello@alliancestreet.com</a>
                      <p className="text-sm text-muted-foreground mt-1">We typically reply within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Call Us</h4>
                      <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">+1 (555) 123-4567</a>
                      <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0">
                      <Globe2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Global Headquarters</h4>
                      <p className="text-muted-foreground">
                        Serving clients globally with major hubs in US, UK, and UAE.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-8 rounded-sm border border-gray-200">
                <h4 className="font-bold text-primary mb-2">Existing Client?</h4>
                <p className="text-muted-foreground mb-4">
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

import { Globe2 } from "lucide-react";
