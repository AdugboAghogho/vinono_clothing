import Image from "next/image";

// Your BRANDS array stays the same
const BRANDS = [
  { name: "Vogue", logo: "https://www.vectorlogo.zone/logos/vogue/vogue-ar21.svg" },
  { name: "GQ", logo: "https://www.vectorlogo.zone/logos/gq/gq-ar21.svg" },
  { name: "Forbes", logo: "https://www.vectorlogo.zone/logos/forbes/forbes-ar21.svg" },
  { name: "Elle", logo: "https://www.vectorlogo.zone/logos/vogue/vogue-ar21.svg" },
  { name: "Vanity Fair", logo: "https://www.vectorlogo.zone/logos/gq/gq-ar21.svg" },
];

// 1. NEW COMPONENT: Built to handle Image URLs instead of React Icons
function BrandCard({ logo, name }: any) {
  return (
    <div className="w-40 md:w-56 shrink-0 h-20 md:h-24 p-4 mx-3 md:mx-4 border border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/50  group">
      <div className="relative w-full h-full">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain  transition-all duration-300"
        />
      </div>
    </div>
  );
}

export function SectionBrands() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 py-12 rounded-3xl text-center shadow-xl shadow-gray-900/50  overflow-hidden relative">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-12">
          Brands We've Worked With.
        </h2>

        {/* Slider Track */}
        <div className="relative w-full flex">
          <div className="flex w-max animate-marquee-left [animation-duration:30s] md:[animation-duration:40s] hover:[animation-play-state:paused]">
            
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <BrandCard key={i} logo={brand.logo} name={brand.name} />
            ))}
            
          </div>
        </div>
      </div>
    </section>
  );
}