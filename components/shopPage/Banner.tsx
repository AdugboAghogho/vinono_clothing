import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import banner from "@/public/img/3d (4).jpg";

const HeroBanner = () => {
  return (
    <section className="relative mt-7 w-full h-48 md:h-64 rounded-4xl overflow-hidden mb-8 shadow-xl shadow-orange-100">
      <Image src={banner} alt="Banner" fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/40 to-transparent p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">
          Vinono.Clothing
        </h2>
        <p className="text-4xl font-black text-orange-500 mb-4">20% Off</p>
        <Button className="w-fit bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 shadow-lg shadow-orange-300 border-none">
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;
