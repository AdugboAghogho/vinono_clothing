"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 1. Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// 2. Import Your Local Images
import banner1 from "@/public/img/3d (2).jpg";
import banner2 from "@/public/img/3d (5).jpg"; 
import banner3 from "@/public/img/3d (6).jpg"; 

// 3. Define Banner Data using the imported images
const BANNER_SLIDES = [
  {
    id: 1,
    title: "Burberry",
    offer: "50% Off",
    link: "/shop",
    image: banner1, // Using the imported variable
  },
  {
    id: 2,
    title: "New Season",
    offer: "Fresh Drops",
    link: "/shop",
    image: banner2,
  },
  {
    id: 3,
    title: "Summer Sale",
    offer: "Flat 30%",
    link: "/shop",
    image: banner3,
  },
];

const HeroBanner = () => {
  return (
    <section className="relative w-full h-48 md:h-64 rounded-[2rem] overflow-hidden mb-8 shadow-xl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' + className + ' !bg-orange-500 !w-2 !h-2"></span>'
            );
          },
        }}
        className="h-full w-full"
      >
        {BANNER_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
                placeholder="blur" // Adds a nice blur effect while loading since it's local
              />

              {/* Gradient Overlay & Content */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-1 animate-in slide-in-from-left-4 duration-700">
                  {slide.title}
                </h2>
                <p className="text-4xl font-black text-orange-500 mb-4 animate-in slide-in-from-left-4 duration-700 delay-100">
                  {slide.offer}
                </p>

                <Link href={slide.link}>
                  <Button className="w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 shadow-lg shadow-orange-300 border-none animate-in fade-in duration-1000 delay-200">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
