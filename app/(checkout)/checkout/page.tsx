"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore"; // Import the store
import { ArrowLeft, CreditCard, Truck, Trash2 } from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const shipping = 10.0;
  const finalTotal = total + shipping;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 container mx-auto px-4 pb-6">
      <header className="mb-8 mt-5 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 shadow-xl bg-white rounded-full flex items-center justify-center cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold ml-20 text-2xl">Checkout</h1>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-4xl shadow-xl">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-500" /> Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                placeholder="Last Name"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                placeholder="Address"
                className="col-span-2 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                placeholder="City"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                placeholder="Zip Code"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-4xl shadow-xl">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-orange-500" /> Payment
            </h2>
            <div className="p-4 border-2 border-orange-500 bg-orange-50 rounded-xl flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-sm">
                  Credit Card (Stripe)
                </span>
              </div>
              <div className="w-4 h-4 rounded-full border-4 border-orange-500 bg-white" />
            </div>
          </section>
        </div>

        {/* Review & Pay */}
        <div className="bg-white p-6 rounded-4xl shadow-xl h-fit">
          <h3 className="font-bold text-gray-900 mb-6">Summary</h3>

          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id + item.size}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg relative overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} · {item.size}
                  </p>
                </div>
                <p className="font-bold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100 my-4" />

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          <Button className="w-full h-14 bg-black text-white hover:scale-105 rounded-full cursor-pointer shadow-xl uppercase tracking-widest">
            Pay ${finalTotal.toFixed(2)}
          </Button>
        </div>
      </div>
      <SectionNewsletter />
    </div>
  );
}
