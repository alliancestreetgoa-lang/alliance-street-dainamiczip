import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, className }: ServiceCardProps) {
  return (
    <div className={cn("group bg-white text-black rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100", className)}>
      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
        <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-bold text-xl mb-3 text-black">{title}</h3>
      <p className="text-gray-500 leading-relaxed mb-5">{description}</p>
      <div className="flex items-center text-red-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}
