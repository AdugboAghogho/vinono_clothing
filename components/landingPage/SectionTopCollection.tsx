import React from "react";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import collection from "../../public/img/1 (2).jpg";
import silde1 from "@/public/img/1 (3).jpg";
import silde2 from "@/public/img/1 (7).jpg";
import silde5 from "@/public/img/1 (10).jpg";

const SectionTopCollection = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div className="p-8">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none">
            Curated Collections
          </h2>

          <p className="text-gray-500 mt-2">
            Hand-picked styles for the season.
          </p>
        </div>

        <Button variant="ghost" className="hidden md:flex gap-2">
          Explore all categories <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CollectionCard
          image={silde2.src}
          title="Urban Footwear"
          subtitle="Sneakers & Boots"
        />

        <CollectionCard
          image={silde1.src}
          title="Summer Breeze"
          subtitle="Lightweight Linens"
        />

        <CollectionCard
          image={silde5.src}
          title="Formal Edit"
          subtitle="Office Essentials"
        />

        <CollectionCard
          image={collection.src}
          title="Accessories"
          subtitle="The Final Touch"
        />
      </div>

      <div className="border-b mt-20"></div>
    </section>
  );
};

export default SectionTopCollection;
