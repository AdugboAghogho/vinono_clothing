import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import MobileNav from "@/components/shopPage/MobileNav";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

// ==========================================
// 1. ADVANCED SEO & AI SEARCH OPTIMIZATION
// ==========================================
export const metadata: Metadata = {
  title: "Vinono Clothing",
  description:
    "Curated fashion for the modern individual. Discover our latest collections of premium streetwear, footwear, and accessories.",
  keywords: [
    "fashion",
    "streetwear",
    "clothing brand",
    "Vinono Clothing",
    "sneakers",
    "modern style",
    "Lagos fashion",
  ],
  authors: [{ name: "Vinono Clothing" }],
  openGraph: {
    title: "Vinono Clothing | Premium Modern Fashion",
    description: "Curated fashion for the modern individual.",
    url: "https://yourwebsite.com",
    siteName: "Vinono Clothing",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ==========================================
  // 2. STRUCTURED DATA (JSON-LD) FOR AI BOTS
  // ==========================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Vinono Clothing",
    description:
      "Curated fashion and premium footwear for the modern individual.",
    url: "https://yourwebsite.com",
    telephone: "+2348106958200",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
  };

  return (
    <ClerkProvider>
      {/* FIX 1: Add suppressHydrationWarning so next-themes doesn't crash React */}
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} pb-20 md:pb-0 relative bg-white text-gray-900 dark:bg-[#272727fb] dark:text-gray-200 transition-colors duration-300`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            <Navbar />
            <Toaster />
            <main className="min-h-screen">{children}</main>
            <MobileNav />

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 3. FLOATING WHATSAPP BUTTON */}
            {/* FIX 3: Changed z-100 to z-[100] */}
            <a
              href="https://wa.me/2348106958200?text=Hello%20Vinono%20Clothing!%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-xl shadow-[#25D366]/30 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 flex items-center justify-center"
              aria-label="Chat with us on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 md:w-8 md:h-8"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
