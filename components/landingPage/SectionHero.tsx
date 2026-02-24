"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
// 1. Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// 2. Define your slides data
const HERO_SLIDES = [
  {
    id: 1,
    title: (
      <>
        Discover Your <br />
        <span className="text-gray-500">Signature Style.</span>
      </>
    ),
    description:
      "Find the unique pieces that ignite your confidence. From rare vintage finds to modern essentials, we help you uncover the spark that turns every outfit into a statement.",
    buttonText: "Shop Collection",
    link: "/shop",
    imageMain:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
    imageSmall:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
  },
  {
    id: 2,
    title: (
      <>
        Redefine Your <br />
        <span className="text-orange-500">Summer Look.</span>
      </>
    ),
    description:
      "Embrace the heat with breathable fabrics and bold colors. Our new summer line is designed to keep you cool while looking effortlessly hot.",
    buttonText: "View Lookbook",
    link: "/shop",
    imageMain:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070",
    imageSmall:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
  },
  {
    id: 3,
    title: (
      <>
        Exclusive <br />
        <span className="text-gray-500">Winter Drops.</span>
      </>
    ),
    description:
      "Premium wool blends and structured coats that define sophistication. Limited edition pieces available now.",
    buttonText: "Shop Now",
    link: "/shop",
    imageMain:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2070",
    imageSmall:
      "https://images.unsplash.com/photo-1542272617-08f086303294?q=80&w=1000",
  },
];

const SectionHero = () => {
  return (
    <section className="container mx-auto px-4 mt-7 mb-12">
      <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            // Custom styling for the dots to match your brand
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                ' !bg-orange-500 !w-3 !h-3"></span>'
              );
            },
          }}
          className="w-full"
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 md:p-12 pb-16">
                {/* Text Content */}
                <div className="p-4 md:p-8 space-y-6 z-10">
                  <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900">
                    {slide.title}
                  </h1>

                  <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <Link href={slide.link}>
                      <Button
                        size="lg"
                        className="rounded-full px-8 h-14 text-base bg-black text-white shadow-xl hover:bg-gray-800 cursor-pointer transition-transform hover:scale-105"
                      >
                        {slide.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hero Images Grid */}
                <div className="relative h-[400px] md:h-[600px] w-full md:block">
                  {/* Main large image */}
                  <div className="absolute right-0 top-0 w-[80%] h-[90%] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={slide.imageMain}
                      alt="Fashion Model"
                      fill
                      className="object-cover"
                      priority={slide.id === 1} // Prioritize loading the first image
                    />
                  </div>

                  {/* Floating smaller image */}
                  <div className="absolute left-0 bottom-20 w-[40%] h-[40%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-10 animate-in slide-in-from-bottom-10 duration-1000">
                    <Image
                      src={slide.imageSmall}
                      alt="Detail shot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SectionHero;
