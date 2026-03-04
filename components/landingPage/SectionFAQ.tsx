"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "How do I find my perfect size?",
    answer:
      "We use standard US sizing. However, for the most accurate fit, we recommend checking the 'Size Guide' link available on every product page. If you're between sizes, we suggest sizing up for a more relaxed fit.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unworn items in their original packaging. Simply visit our Returns Center to generate a pre-paid shipping label. Refunds are processed within 5-7 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 100 countries worldwide. International shipping rates are calculated at checkout. Please note that duties and taxes may apply depending on your location.",
  },
  {
    question: "How do I care for Vinono Clothing fabrics?",
    answer:
      "Most of our pieces are machine washable on a cold, gentle cycle. For our premium wool and linen collections, we recommend dry cleaning to maintain the fabric's integrity and shape.",
  },
];

export function SectionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 shadow-2xl ">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-gray-300 mb-4 md:text-7xl font-bold tracking-tighter leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-3xl md:text-[19px] font-serif mb-4">
            Everything you need to know about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-black/30"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white"
              >
                <span className="font-medium text-lg text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-500 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500 shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
