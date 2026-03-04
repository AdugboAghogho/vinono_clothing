import Image from "next/image";

const BRANDS = [
  {
    name: "Vogue",
    logo: "https://www.vectorlogo.zone/logos/vogue/vogue-ar21.svg",
  },
  {
    name: "GQ",
    logo: "https://www.vectorlogo.zone/logos/gq/gq-ar21.svg",
  },
  {
    name: "Forbes",
    logo: "https://www.vectorlogo.zone/logos/forbes/forbes-ar21.svg",
  },
  {
    name: "Elle",
    logo: "https://www.vectorlogo.zone/logos/vogue/vogue-ar21.svg",
  },
  {
    name: "Vanity Fair",
    logo: "https://www.vectorlogo.zone/logos/gq/gq-ar21.svg",
  },
];

export function SectionBrands() {
  return (
    <section className="py-16 shadow-xl">
      <div className="container mx-auto px-4 rounded-3xl text-center shadow-xl shadow-gray-900/50 p-5">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Brand We've Worked With.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="relative h-8 w-24 md:h-10 md:w-32">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
