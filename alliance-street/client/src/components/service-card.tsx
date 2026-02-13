import { cn } from "@/lib/utils";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  details: {
    overview: string;
    features: string[];
    benefits: string;
  };
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, image, details, className }: ServiceCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <motion.div
        className={cn(
          "group relative overflow-hidden rounded-2xl cursor-pointer h-[320px]",
          className
        )}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:from-black group-hover:via-black/70 transition-all duration-500" />

        <div className="relative z-10 h-full flex flex-col justify-end p-7">
          <div className="w-11 h-11 bg-red-600/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors duration-300">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center text-red-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              data-testid={`service-modal-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="relative h-52 overflow-hidden rounded-t-3xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-6 left-7 z-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                <button
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="modal-close-button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{details.overview}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">What's Included</h3>
                  <ul className="space-y-2.5">
                    {details.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Why It Matters</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{details.benefits}</p>
                </div>

                <a
                  href="/contact"
                  className="block w-full bg-black text-white text-center rounded-full py-3.5 font-semibold hover:bg-gray-900 transition-colors"
                  data-testid="modal-cta-button"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
