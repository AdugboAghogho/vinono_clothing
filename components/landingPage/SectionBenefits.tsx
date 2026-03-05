import { Truck, ShieldCheck, RefreshCcw, Clock, Star, Zap } from "lucide-react";

const BENEFITS_ROW_1 = [
  { icon: Truck, title: "Free Shipping", text: "On all orders over $200" },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% protected transactions",
  },
  {
    icon: RefreshCcw,
    title: "30-Day Returns",
    text: "No questions asked exchange",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    text: "Receive within 3 business days",
  },
];

const BENEFITS_ROW_2 = [
  { icon: Star, title: "Premium Quality", text: "Finest materials guaranteed" },
  { icon: Zap, title: "New Drops Weekly", text: "Stay ahead of the trends" },
  { icon: ShieldCheck, title: "Warranty", text: "1 year fabric warranty" },
  {
    icon: Truck,
    title: "Global Shipping",
    text: "We ship to over 100 countries",
  },
];

function BenefitCard({ icon: Icon, title, text }: any) {
  return (
    // UPDATED:
    // 1. Reduced width: w-[240px] (mobile) -> md:w-[300px] (desktop)
    // 2. Reduced padding: p-4 (mobile) -> md:p-6 (desktop)
    <div className="w-60 md:w-75 shrink-0 p-4 md:p-6 mx-3 md:mx-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl shadow-gray-900/50">
      {/* Smaller Icon Container on mobile */}
      <div className="h-10 w-10 md:h-12 md:w-12 bg-white/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>

      {/* Smaller Fonts on mobile */}
      <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}

export function SectionBenefits() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 md:mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold  text-black dark:text-gray-300">
          Why Choose Us
        </h2>
      </div>

      {/* Row 1: Moving Left */}
      {/* UPDATED: Added [animation-duration:20s] for faster speed on mobile, slower on desktop */}
      <div className="flex w-[200%] animate-marquee-left [animation-duration:30s] md:[animation-duration:40s]">
        {[...BENEFITS_ROW_1, ...BENEFITS_ROW_1, ...BENEFITS_ROW_1].map(
          (item, i) => (
            <BenefitCard key={i} {...item} />
          ),
        )}
      </div>

      <div className="h-6 md:h-8" />

      {/* Row 2: Moving Right */}
      <div className="flex w-[200%] animate-marquee-right [animation-duration:30s] md:[animation-duration:40s]">
        {[...BENEFITS_ROW_2, ...BENEFITS_ROW_2, ...BENEFITS_ROW_2].map(
          (item, i) => (
            <BenefitCard key={i} {...item} />
          ),
        )}
      </div>
    </section>
  );
}
