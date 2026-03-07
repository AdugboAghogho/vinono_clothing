import React from "react";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import collection from "../../public/img/w (10).jpeg";
import silde1 from "@/public/img/2 (1).jpeg";
import silde2 from "@/public/img/2 (11).jpeg";
import silde5 from "@/public/img/w (9).jpeg";

const SectionTopCollection = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div className="p-8">
          <h2 className="text-4xl text-black dark:text-gray-300 md:text-7xl font-bold tracking-tighter leading-none">
            Curated Collections
          </h2>

          <p className="text-black dark:text-gray-300 mt-2">
            Hand-picked styles for the season.
          </p>
        </div>

        <Button
          variant="ghost"
          className="hidden text-black dark:text-gray-300 md:flex gap-2"
        >
          Explore all categories <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CollectionCard image={silde2.src} title="VN Shorts" subtitle="" />

        <CollectionCard image={silde1.src} title="NV Tees" subtitle="" />

        <CollectionCard image={silde5.src} title="VN Tops" subtitle="" />

        <CollectionCard
          image={collection.src}
          title="Sleveeless Tank"
          subtitle=""
        />
      </div>

      <div className="border-b mt-20"></div>
    </section>
  );
};

export default SectionTopCollection;
