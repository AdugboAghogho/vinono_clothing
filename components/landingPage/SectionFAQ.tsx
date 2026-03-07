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
    // Reduced padding to make it shorter vertically
    <section className="py-8 md:py-16">
      {/* Reduced max-width to max-w-2xl to make it narrower and less "full screen" */}
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 text-gray-900 dark:text-gray-300">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-serif">
            Everything you need to know about our products and services.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xl shadow-gray-900/50 bg-white dark:bg-[#111] hover:border-gray-300 dark:hover:border-zinc-600 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-medium text-base md:text-lg text-gray-900 dark:text-gray-200">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-orange-500 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
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
