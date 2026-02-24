import React from "react";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import collection from "../../public/Edited/edite (2).jpg";

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
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
          title="Urban Footwear"
          subtitle="Sneakers & Boots"
        />

        <CollectionCard
          image="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop"
          title="Summer Breeze"
          subtitle="Lightweight Linens"
        />

        <CollectionCard
          image="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"
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
