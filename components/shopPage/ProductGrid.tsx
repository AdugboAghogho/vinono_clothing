import React from "react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Heart, Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const ProductGrid = ({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCartStore();

  // Filter Logic
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Categories Chips */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "All" ? "bg-orange-500 text-white" : "bg-white border"}`}
        >
          All
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.title)}
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.title
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-500 border border-gray-100"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product: any) => (
          <Link
            href={`/product/${product.slug}`}
            key={product._id}
            className="group"
          >
            <div className="bg-white p-3 rounded-2xl shadow-xl hover:shadow-xl transition-all duration-300 border border-gray-50 h-full flex flex-col">
              {/* Image */}
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="px-1 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>

                  <button
                    className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200 hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.preventDefault(); // <--- THIS STOPS THE REDIRECT
                      addItem(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
