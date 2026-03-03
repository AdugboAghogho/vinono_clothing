"use client";

import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { Search, X, Loader2, ShoppingCart, ArrowLeft } from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();


  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true);
        try {
          const products = await client.fetch(
            `*[_type == "product" && (name match "*" + $q + "*" || description match $q + "*")] {
              _id,
              name,
              price,
              "slug": slug.current,
              "imageUrl": images[0].asset->url
            }`,
            { q: query },
          );
          setResults(products);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen max-w-400 mx-auto bg-[#FDFBF7] p-4 md:p-8">
        <button onClick={() => router.back()} className="w-10 h-10 mb-10 hover:bg-gray-100 scale-108 rounded-full cursor-pointer shadow-xl flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products (e.g. 'Jacket', 'Summer')..."
          autoFocus
          className="w-full bg-white h-14 pl-12 pr-12 rounded-3xl shadow-sm outline-none focus:ring-2 focus:ring-orange-200 text-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      )}

      {results.length > 0 ? (
        <>
          <h2 className="font-bold text-gray-900 mb-6">
            Results for "{query}"
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((item) => (
              <Link
                href={`product/${item.slug}`}
                key={item._id}
                className="bg-white p-3 rounded-4xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden mb-3 bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="px-1 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">
                    {item.name}
                  </h3>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>

                    <button
                      className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200 hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.preventDefault(); // <--- THIS STOPS THE REDIRECT
                        addItem(item);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : query.length > 2 && !isLoading ? (
        <div className="text-center py-10 text-gray-500">
          No products found matching "{query}"
        </div>
      ) : null}

      {/* Recent Searches (Static for UI) */}
      {!query && (
        <>
          <h2 className="font-bold text-gray-900 mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {["Summer", "Jacket", "Dress", "Casual"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 cursor-pointer hover:border-orange-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </>
      )}
      <SectionNewsletter />
    </div>

  );
}
