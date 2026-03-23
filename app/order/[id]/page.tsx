"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { Loader2, CheckCircle2, Printer } from "lucide-react";
import image1 from "@/public/img/logo.png";

// 1. Define the props correctly as a Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderSummaryPage({ params }: PageProps) {
  // 2. Unwrap the params using React.use()
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // const data = await client.fetch(`*[_type == "order" && _id == $id][0]`, {
  //   id: orderId,
  // });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Simple fetch - no asset expansion needed anymore
        const data = await client.fetch(
          `*[_type == "order" && _id == $id][0]`,
          { id: orderId },
        );
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       // 3. Pass the unwrapped orderId to the query
  //       const data = await client.fetch(
  //         `*[_type == "order" && _id == $id][0]{
  //           ...,
  //           items[]{
  //             ...,
  //             "imageUrl": productImage.asset->url
  //           }
  //         }`,
  //         { id: orderId }
  //       );
  //       setOrder(data);;
  //     } catch (error) {
  //       console.error("Error fetching order:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (orderId) {
  //     fetchOrder();
  //   }
  // }, [orderId]); // Use the string orderId as the dependency

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="animate-spin text-[#1A5276] w-10 h-10" />
      </div>
    );

  if (!order)
    return (
      <div className="p-20 text-center font-['Metrophobic']">
        <h2 className="text-[#1A5276] text-xl">Order details not found.</h2>
        <p className="text-gray-400 mt-2">
          Please contact Vee Clothing if you believe this is an error.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 font-['Metrophobic']">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-[#1A5276]/5">
        {/* HEADER: Brand Confirmation */}
        <div className="bg-black p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <Image
              src={image1}
              alt="VEE"
              width={100}
              height={100}
              className="w-20 h-fu-20 brightness-0 invert"
            />
          </div>
          <CheckCircle2 className="mx-auto w-12 h-12 text-green-600 mb-2" />
          <h1 className="font-['Kento'] text-2xl uppercase tracking-widest">
            Order Confirmed
          </h1>
          <p className="text-sm opacity-80 uppercase tracking-tighter">
            ID: {order._id}
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          {/* CUSTOMER DETAILS */}
          <section className="grid grid-cols-2 gap-8 border-b border-gray-100 pb-8">
            <div>
              <h4 className=" uppercase text-xl font-bold mb-2">Customer</h4>
              <p className="font-bold text-xl ">{order.customerName}</p>
              <p className="text-xl font bold">{order.phoneNumber}</p>
            </div>
            <div className="text-right">
              <h4 className="uppercase text-xl font-bold mb-2">Shipping To</h4>
              <p className="text-xl font bold ">{order.address}</p>
              <p className="text-xl font bold ">{order.city}</p>
            </div>
          </section>

          {/* ITEM LISTING */}
          <section>
            <h4 className="text-[3rem] font bold uppercase mb-6">
              Selection Summary
            </h4>
            <div className="space-y-6">
              {order.items.map((item: any) => (
                <div
                  key={item._key}
                  className="flex gap-4 items-center border-b border-gray-50 pb-6"
                >
                  {/* Product Thumbnail */}
                  <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100">
                    {item.productImage ? (
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-[10px] text-gray-400">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <p className="font-bold text-lg uppercase leading-tight">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                      Size:{" "}
                      <span className="text-xl font-bold">{item.size}</span> |
                      Qty:{" "}
                      <span className="text-xl font-bold">{item.quantity}</span>
                    </p>
                  </div>

                  {/* Price */}
                  <p className="text-xl font-bold ">₦{item.price.toFixed(3)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TOTALS */}
          <section className="bg-gray-300 p-6 rounded-2xl">
            <div className="flex justify-between items-center text-xl font-bold ">
              <span className="uppercase font-bold text-black">
                Final Estimate
              </span>
              <span className="font-bold text-xl">
                ₦ {order.totalPrice.toFixed(3)}
              </span>
            </div>
          </section>

          {/* PRINT ACTION */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-[#1A5276] hover:text-[#D4AF37] transition-colors text-sm uppercase font-bold tracking-widest cursor-pointer"
            >
              <Printer size={18} /> Print for Records
            </button>
          </div>
        </div>
      </div>

      <p className="text-center mt-8 text-xs text-gray-400 uppercase tracking-[0.3em]">
        @kels Developments
      </p>
    </div>
  );
}
