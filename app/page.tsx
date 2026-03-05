import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import image1 from "../public/img/2 (3).jpeg";
import SectionHero from "@/components/landingPage/SectionHero";
import SectionTopCollection from "@/components/landingPage/SectionTopCollection";
import SectionNewsletter from "@/components/landingPage/SectionNewsletter";
import { SectionOwnYourStyle } from "@/components/landingPage/SectionOwnYourStyle";
import { SectionFeatured } from "@/components/landingPage/SectionFeatured";
import { SectionBenefits } from "@/components/landingPage/SectionBenefits";
import { SectionBrandStory } from "@/components/landingPage/SectionBrandStory";
import { SectionBrands } from "@/components/landingPage/SectionBrands";
import { SectionFAQ } from "@/components/landingPage/SectionFAQ";
import LatestStories from "@/components/landingPage/LatestStories";
import { client } from "@/lib/sanity";
import { allBlogs } from "@/lib/queries";

export default async function Home() {
  const posts = await client.fetch(allBlogs);

  return (
    <div className="flex flex-col gap-20 pb-5">
      {/* 1. HERO SECTION */}
      <SectionHero />

      <SectionBrands />
      {/* 2. OWN YOUR STYLE (New Section) */}
      <SectionOwnYourStyle />

      {/* 3. TOP COLLECTIONS  */}
      <SectionTopCollection />

      {/* 4. FEATURED CAROUSEL (New Section) */}
      <SectionFeatured />

      {/* 5. LATEST STORIES -> TRENDING NOW */}
      <section className="bg-gray-50 py-20 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-4xl  text-black dark:text-gray-300 font-bold">
                Trending this Week
              </h2>
              {/* Feature Item */}
              <div className="flex gap-6 items-start bg-white p-4 rounded-xl shadow-sm">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={image1}
                    alt="Shoe"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-blue-600 mb-1">
                    BEST SELLER
                  </p>

                  <h4 className="font-bold text-black text-lg">
                    Nike Air Max Revival
                  </h4>

                  <p className="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">
                    The classic silhouette returns with sustainable materials
                    and improved comfort for all-day wear.
                  </p>

                  <Link
                    href="/product/shrit-3"
                    className="rounded-full mt-4 px-6 p-2 h-20 text-white bg-black shadow-xl shadow-gray-400  hover:bg-gray-800 cursor-pointer"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-4 rounded-xl shadow-sm">
                <div className="w-24 h-28 relative rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000"
                    alt="Shirt"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-orange-600 mb-1">
                    NEW DROP
                  </p>

                  <h4 className="font-bold text-black text-lg">
                    Oversized Heavy Tee
                  </h4>

                  <p className="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">
                    Designed for the modern streetwear aesthetic. 100% heavy
                    cotton.
                  </p>

                  <Link
                    href="/shop"
                    className="rounded-full mt-4 px-6 p-2 h-20 text-white bg-black shadow-xl shadow-gray-400  hover:bg-gray-800 cursor-pointer"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Large Feature Card */}
            <div className="relative rounded-3xl overflow-hidden min-h-100">
              <Image src={image1} alt="Model" fill className="object-cover" />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image src={image1} alt="User" fill />
                  </div>

                  <span className="text-sm font-semibold">Sarah Jenkins</span>
                </div>

                <p className="text-gray-800 italic text-sm">
                  "I've never felt more confident. The quality of the fabrics is
                  unmatched at this price point."
                </p>

                <div className="flex gap-1 mt-3 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />

                  <Star className="w-4 h-4 fill-current" />

                  <Star className="w-4 h-4 fill-current" />

                  <Star className="w-4 h-4 fill-current" />

                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LatestStories posts={posts} />

      {/* 6. BENEFITS MARQUEE (New Section) */}
      <SectionBenefits />

      {/* 7. BRAND STORY */}
      <SectionBrandStory />

      <SectionFAQ />

      {/* 8. NEWSLETTER  */}
      <SectionNewsletter />
    </div>
  );
}
