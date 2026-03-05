"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ArrowLeft, ShieldCheck, Trash2 } from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const router = useRouter();
  const shipping = totalPrice > 50 ? 0 : 10;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center bg-[#F9FAFB]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
          <Trash2 className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <Button
          onClick={() => router.back()}
          className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-8 container mx-auto px-4 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 bg-white cursor-pointer rounded-full shadow-xl hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl ml-25 md:text-2xl font-bold text-gray-900">
              My Cart
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex gap-4 relative"
              >
                {/* Delete Button (Top Right) */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute shadow-xl top-4 right-4 text-gray-300 hover: transition"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>

                {/* Image (Small & Square) */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                      No Img
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight pr-6">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {item.color} • {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Compact Quantity Control */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-2 py-1 border border-gray-200">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-xl text-gray-600 hover:text-orange-500 disabled:opacity-50 text-xs"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-gray-900 text-sm w-3 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-orange-500 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- RIGHT: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 lg:sticky lg:top-24">
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Discount</span>
                  <span className="font-bold text-green-600">-$0.00</span>
                </div>

                <div className="h-px bg-gray-100 my-4"></div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-black text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-14 bg-[#2ECC71] hover:bg-[#27AE60] text-white rounded-full font-bold text-lg shadow-lg shadow-green-100 transition-transform active:scale-95 flex items-center justify-center gap-2">
                  Checkout for ${finalTotal.toFixed(2)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <SectionNewsletter />
      </div>
    </div>
  );
}
