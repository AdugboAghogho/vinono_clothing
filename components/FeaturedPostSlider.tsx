"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/pagination";

// Import your existing card
import { BlogCard } from "./BlogComponents"; 

export default function FeaturedPostSlider({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full py-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.1} // Shows a bit of the next slide (Mobile Peek effect)
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true, // Makes dots grow/shrink like the image
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2.2, // Desktop: Show 2 full + partials
            centeredSlides: false,
          },
        }}
        className="w-full pb-12" // Padding bottom for the pagination dots
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id} className="h-auto">
            {/* We reuse your existing card, but ensure it takes full height */}
            <div className="h-full mb-7 transform transition-transform duration-300">
               <BlogCard post={post} isLarge={false} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles to make the dots look like the image (Blue/Gray) */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db; /* Gray-300 */
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6; /* Blue-500 (Like your reference) */
          width: 20px; /* Elongate the active dot */
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}