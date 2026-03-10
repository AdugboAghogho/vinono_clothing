"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Search,
} from "lucide-react";

const SectionNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // --- NEW SAFETY CHECK ---
      // Check if the response is actually JSON before trying to parse it
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server error: Check if app/api/subscribe/route.ts exists.",
        );
      }
      // ------------------------

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage(data.message);
      setEmail(""); // Clear the input
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <footer className="">
      <div className="bg-[#0f0f0f] rounded-4xl overflow-hidden relative shadow-2xl border border-zinc-800">
        {/* --- Background Effects --- */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 px-6 py-16 md:p-20">
          {/* --- TOP SECTION: NEWSLETTER --- */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20 border-b border-white/5 pb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Unlock 15% Off <br />
                <span className="text-zinc-500">Your First Order.</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Join the Vinono Clothing movement. Be the first to know about
                new drops, exclusive sales, and style inspiration.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  required
                  placeholder="Enter your email address"
                  className="h-14 rounded-full px-8 bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all disabled:opacity-50"
                />
                <Button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
              className="w-full sm:w-40 flex items-center justify-center h-14 rounded-full px-8 bg-white text-black hover:bg-zinc-200 font-bold text-base transition-transform active:scale-95 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>

              {/* Feedback Message */}
              {message && (
                <p
                  className={`mt-3 text-sm font-medium ${status === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* --- MIDDLE SECTION: LINKS GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1 flex flex-col items-start">
              <Link
                href="/"
                className="text-2xl font-bold text-white mb-6 tracking-tighter"
              >
                Vinono.<span className="text-zinc-600">Clothing</span>
              </Link>
              <p className="text-zinc-500 text-sm mb-6 max-w-xs">
                Redefining modern streetwear with comfort and sustainability in
                mind. Designed in Lagos, worn worldwide.
              </p>
              <div className="flex gap-3">
                <SocialIcon icon={Instagram} />
                <SocialIcon icon={Twitter} />
                <SocialIcon icon={Facebook} />
                <SocialIcon icon={Youtube} />
              </div>
            </div>

            {/* Shop Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-lg mb-2">Shop</h4>
              <FooterLink href="/shop">New Arrivals</FooterLink>
              <FooterLink href="/shop">Men's Collection</FooterLink>
              <FooterLink href="/shop">Women's Collection</FooterLink>
              <FooterLink href="/shop">Accessories</FooterLink>
              <FooterLink href="/shop" className="text-orange-500">
                Sale Archive
              </FooterLink>
            </div>

            {/* Support Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-lg mb-2">Support</h4>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/shipping">Shipping & Returns</FooterLink>
              <FooterLink href="/size-guide">Size Guide</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/track">Track Order</FooterLink>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-lg mb-2">Company</h4>
              <FooterLink href="/">Our Story</FooterLink>
              <FooterLink href="/">Sustainability</FooterLink>
              <FooterLink href="/">Careers</FooterLink>
              <FooterLink href="/">Terms & Conditions</FooterLink>
              <FooterLink href="/">Privacy Policy</FooterLink>
            </div>
          </div>

          {/* --- BOTTOM SECTION: COPYRIGHT --- */}
          <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm border-t border-white/5 pt-8">
            <p>© 2026 Kels Development. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

function FooterLink({ href, children, className = "" }: any) {
  return (
    <Link
      href={href}
      className={`text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-1 group ${className}`}
    >
      {children}
      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
    </Link>
  );
}

function SocialIcon({ icon: Icon }: any) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

export default SectionNewsletter;
