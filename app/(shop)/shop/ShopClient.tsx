"use client";

import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/shopPage/Banner";
import SideBar from "@/components/shopPage/SideBar";
import HeroBanner from "@/components/shopPage/HeroBanner";
import ProductGrid from "@/components/shopPage/ProductGrid";
import { useUser } from "@clerk/nextjs";
import { Search, ShoppingBag } from "lucide-react";

export default function ShopClient({
  products,
  categories,
}: {
  products: any[];
  categories: any[];
}) {
  const { user } = useUser();

  return (
    <div className="flex max-w-400 mx-auto">
      <SideBar />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex justify-between items-center w-full md:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden relative">
                {user?.imageUrl && (
                  <Link href="/profile">
                    <Image
                      src={user.imageUrl}
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </Link>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-400">Welcome</p>
                <p className="font-bold text-sm">
                  {user?.fullName || "Valued Customer"}
                </p>
              </div>
            </div>

            {/* Cart Button (Mobile Position) */}
            <Link href="/cart">
              <button className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-orange-200 shadow-lg text-white hover:scale-110 transition-transform cursor-pointer">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* --- ROW 2: Search Bar (Full width on mobile, Centered on Desktop) --- */}
          <div className="flex-1 w-full md:max-w-md relative md:mx-4">
            <Link href="/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for clothes..."
                className="w-full bg-white border border-gray-100 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm"
              />
            </Link>
          </div>

          {/* --- DESKTOP CART (Hidden on Mobile) --- */}
          <div className="hidden md:flex gap-3">
            <Link href="/cart">
              <button className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-orange-200 shadow-lg text-white">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </header>

        {/* Hero Banner (Burberry style) */}
        <HeroBanner />

        {/* Product Grid */}
        <ProductGrid products={products} categories={categories} />

        <Banner />
      </main>
    </div>
  );
}
