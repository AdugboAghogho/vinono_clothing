"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { ArrowLeft, CreditCard, Truck, Trash2, Loader2 } from "lucide-react";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";
import { client } from "@/lib/sanity";

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });
  const { items, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const shipping = 10.0;
  const finalTotal = total + shipping;
  const router = useRouter();

  const clearCart = useCartStore((state) => state.clearCart);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Make sure your query looks like this:
  const query = `*[_type == "product"]{
    name,
    price,
    "image": image.asset->url,
    "imageAssetId": image.asset->_ref // <--- YOU NEED THIS SPECIFIC LINE
  }`;

  // Inside CheckoutPage.tsx
  const handleOrder = async () => {
    if (!formData.phone || !formData.address) {
      alert("Please fill in your shipping details.");
      return;
    }

    setLoading(true);

    try {
      // 1. Prepare Order Data
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        phoneNumber: formData.phone,
        address: formData.address,
        city: formData.city,
        items: items.map((item) => ({
          _key: Math.random().toString(36).substring(7),
          productName: item.name,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
          productImage: item.image,
        })),
        totalPrice: finalTotal,
      };

      // 2. Call your internal API Route
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // 3. Generate WhatsApp Link using the ID from our API
        const orderLink = `${window.location.origin}/order/${result.orderId}`;
        const message = `Hello Vinono Clothing! I've placed a new order.\n\n Order ID: ${result.orderId} \n\n View Details: ${orderLink}`;

        clearCart();

        window.open(
          `https://wa.me/2347084838253?text=${encodeURIComponent(message)}`,
          "_blank",
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(
        "Permission Error Fixed: Server-side transaction failed. Check your API Token.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 container mx-auto px-4 pb-6">
      <header className="mb-8 mt-5 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 shadow-xl bg-white rounded-full flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold ml-20 text-2xl">Checkout</h1>
      </header>

      <div className="max-w-4xl mb-15 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-4xl shadow-xl">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-600" /> Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                onChange={handleInputChange}
                placeholder="First Name"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                name="lastName"
                onChange={handleInputChange}
                placeholder="Last Name"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                name="address"
                onChange={handleInputChange}
                placeholder="Address"
                className="col-span-2 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                name="city"
                onChange={handleInputChange}
                placeholder="City"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <input
                name="phone"
                onChange={handleInputChange}
                placeholder="Phone.No"
                className="col-span-1 bg-gray-50 shadow-lg border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-4xl shadow-xl">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-600" /> Finalize via
              WhatsApp
            </h2>
            <div className="p-4 border-2 border-red-600 bg-orange-50 rounded-xl flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-sm">
                  Payments are processed directly with Vinono Clothing
                </span>
              </div>
              <div className="w-4 h-4 rounded-full border-4 border-red-600 bg-white" />
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
                  ₦{(item.price * item.quantity).toFixed(3)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100 my-4" />

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>₦{total.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>₦{shipping.toFixed(3)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total</span>
            <span>₦{finalTotal.toFixed(3)}</span>
          </div>

          <Button
            disabled={loading}
            onClick={handleOrder}
            className="w-full h-14 bg-red-600 text-white font-bold hover:scale-105 rounded-full cursor-pointer shadow-xl uppercase tracking-widest"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              `Confirm Order via WhatsApp`
            )}
          </Button>
        </div>
      </div>
      <SectionNewsletter />
    </div>
  );
}
