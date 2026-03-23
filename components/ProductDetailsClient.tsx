"use client";

import Link from "next/link";
import Image from "next/image";
import RelatedProduct from "@/components/RelatedProducts";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Star,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";

export default function ProductPage({
  product,
  relatedProducts = [],
}: {
  product: any;
  relatedProducts?: any[];
}) {
  const { items } = useCartStore();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "Black",
  );

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: images[0],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    });
    toast.success(`${product.name} Added to Cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // router.push("/checkout");
    OR: router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-white container mx-auto px-4 pb-6">
      {/* --- MOBILE HEADER --- */}
      <div className=" flex justify-between items-center p-4 sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 shadow-xl hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-semibold text-lg tracking-tight">{product.name}</h1>

        <Link href="/cart" className="relative group shadow-xl rounded-full">
          <div className="p-2 transition-all duration-300">
            <ShoppingCart className="w-6 h-6" />

            {/* Badge Logic */}
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-black text-[17px] flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto md:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4 px-4 md:px-0">
            {/* Main Image */}
            <div className="relative aspect-square bg-[#F9F9F9] rounded-3xl overflow-hidden">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 ${
                    currentImageIndex === idx
                      ? "ring-2 ring-black opacity-100"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: DETAILS (Minimalist Typography) --- */}
          <div className="flex flex-col px-6 md:px-0 pt-2">
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-gray-900" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-2xl font-medium text-gray-900">
                 ₦{product.price},000
                </p>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span className="font-semibold text-sm">4.8</span>
                  <span className="text-gray-400 text-sm">(120 reviews)</span>
                </div>
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-8 mb-8">
              {/* Colors */}
              <div>
                <span className="text-sm font-semibold text-gray-900 mb-3 block uppercase tracking-wide">
                  Color
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors?.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selectedColor === color
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-900"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-sm font-semibold text-gray-900 mb-3 block uppercase tracking-wide">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 border ${
                        selectedSize === size
                          ? "bg-red-600 text-white border-red-600 scale-110"
                          : "bg-white text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                <span className="font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="h-14 cursor-pointer rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 hover:text-black font-semibold text-md"
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={handleBuyNow}
                  className="h-14 cursor-pointer rounded-full bg-red-600 hover:bg-red-800 text-white shadow-lg shadow-orange-100 border-none font-semibold text-md"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        <RelatedProduct relatedProducts={relatedProducts} />
        <SectionNewsletter />
      </div>
    </div>
  );
}
