"use client";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import { ShoppingBag, ArrowRight } from "lucide-react";
import silde1 from "@/public/img/1 (1).jpg";
import silde2 from "@/public/img/1 (2).jpg";
import silde3 from "@/public/img/1 (3).jpg";
import silde4 from "@/public/img/1 (9).jpg";
import silde5 from "@/public/img/1 (10).jpg";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Casual Formal",
    price: "120.25 USD",
    tag: "Premium Collection",
    image: silde1,
  },
  {
    id: 2,
    title: "Urban Edit",
    price: "95.00 USD",
    tag: "New Season",
    image: silde2,
  },
  {
    id: 3,
    title: "Summer Linen",
    price: "150.00 USD",
    tag: "Best Seller",
    image: silde3,
  },
  {
    id: 4,
    title: "Signature Suit",
    price: "299.99 USD",
    tag: "Exclusive",
    image: silde4,
  },
  {
    id: 5,
    title: "Weekend Vibe",
    price: "85.50 USD",
    tag: "Limited",
    image: silde5,
  },
];

export function SectionFeatured() {
  return (
    <section className="py-24 pt-0 bg-white overflow-hidden shadow-xl">
      <div className="p-8 text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
          FEATURED COLLECTION
        </h2>
      </div>

      <div className="container mx-auto px-4 relative">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={2} // Start in the middle
          loop={true}
          speed={800} // Smooth transition speed
          autoplay={{
            delay: 5000, // 5 Seconds Autoplay
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0, // No rotation, just scaling and depth
            stretch: 0,
            depth: 100, // Depth perspective
            modifier: 2.5, // Intensity of the effect
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="w-full py-10"
        >
          {FEATURED_PRODUCTS.map((product) => (
            // Width is fixed to create the card shape
            <SwiperSlide key={product.id} className="max-w-75 md:max-w-87.5">
              {({ isActive }) => (
                <div
                  className={`relative aspect-3/5 rounded-3xl overflow-hidden transition-all duration-500 shadow-xl ${
                    isActive
                      ? "scale-80 opacity-100 ring-4 ring-black/5"
                      : "scale-70  rounded-4xl"
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  {/* Top Left Tag */}
                  <div className="absolute top-6 left-6">
                    {/* <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      40%
                    </span> */}
                  </div>

                  {/* Vertical Text (Right Side) */}
                  <div className="absolute top-8 right-6 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black -rotate-90 origin-right translate-y-12 whitespace-nowrap">
                      {product.tag}
                    </span>
                  </div>

                  {/* Bottom Content (Inside the card like image) */}
                  <div className="absolute bottom-8 left-0 right-0 text-center text-white p-4">
                    {/* Floating Vertical Text Decoration */}
                    <p className="text-sm font-light tracking-widest uppercase mb-2 text-white/80 writing-mode-vertical">
                      {product.title}
                    </p>

                    <h3 className="text-xl font-bold mb-1">Start from</h3>
                    <p className="text-2xl font-serif italic mb-6">
                      {product.price}
                    </p>

                    {/* Circular Button hanging off the bottom (Visual trick) */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-0 z-20">
                      <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
