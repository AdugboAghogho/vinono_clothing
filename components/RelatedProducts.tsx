"use client";
import "swiper/css";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";

export default function RelatedProducts({
  relatedProducts = [],
}: {
  product?: any;
  relatedProducts?: any[];
}) {
  const { addItem } = useCartStore();

  return (
    <div className="container mt-24 mb-24">
      <div className="flex justify-between items-end mb-8 px-4 md:px-0">
        <h2 className="text-2xl font-bold text-gray-900">
          You might also like
        </h2>
        <Link
          href="/shop"
          className="text-sm font-semibold text-gray-900 hover:text-orange-500 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="px-4 md:px-0">
        {relatedProducts.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={2.2} // Mobile: Show 2.2 cards to encourage swiping
            breakpoints={{
              640: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              1034: {
                slidesPerView: 4.2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5.2,
                spaceBetween: 20,
              },
            }}
            className="w-full !pb-10" // Add padding bottom for shadow
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item._id} className="h-auto">
                <div className=" h-full flex flex-col relative bg-white border border-gray-100 cursor-pointer rounded-2xl p-3 shadow-xl hover:shadow-lg transition-all duration-300 ">
                  <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden mb-3">
                    <Link href={`/product/${item.slug}`}>
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <Link href={`/product/${item.slug}`} className="block mb-1">
                      <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 hover:text-orange-500 transition-colors">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto">
                      <p className="font-bold text-gray-900 text-lg">
                        ₦{item.price}
                      </p>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Stop Link click
                          addItem({
                            id: item._id,
                            name: item.name,
                            price: item.price,
                            image: item.imageUrl,
                            quantity: 1,
                            size: "M", // Default
                            color: "Default",
                          });
                        }}
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg active:scale-90"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10 text-gray-300 italic">
            No related products found.
          </div>
        )}
      </div>
    </div>
  );
}
