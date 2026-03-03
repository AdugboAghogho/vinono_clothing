"use client";

import { useState } from "react";
import { Search, Bell, X, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BlogCard, BlogRowCard } from "@/components/BlogComponents";
import FeaturedPostSlider from "@/components/FeaturedPostSlider";
import Link from "next/link";

export default function BlogClient({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  // 2. Filter Logic (Search + Category)
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 3. Layout Data
  const featuredPost = filteredPosts[0]; // First matching post
  const otherPosts = filteredPosts.slice(0); // The rest of the matching posts
  const popularPosts = posts.slice(0, 3); // Static "Popular" list (just the newest 3 for now)

  // Helper to clear search
  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 sm:mt-10">
        <header className="pb-8 border-b border-gray-200/60 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <Link href="/" className="mt-5 md:hidden">
            <button className="w-10 h-10 shadow-xl bg-white rounded-full flex items-center justify-center cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
              Our Blog
            </h1>
            <p className="text-gray-500 text-lg max-w-md">
              Stories, trends, and insights from the world of Vinono Clothing.
            </p>
          </div>

          {/* Desktop Search & Tools */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <Input
                placeholder="Search articles..."
                className="pl-10 pr-10 rounded-full bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* ================= MOBILE VIEW (Stacked) ================= */}
        <div className="md:hidden space-y-8 mb-20">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for articles..."
              className="pl-12 h-12 rounded-2xl bg-white border-gray-200 shadow-xl text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Pills (Scrollable) */}
          <div className="flex gap-3 shadow-xl overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-6 py-2.5 mb-7 rounded-full shadow-xl text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {cat as string}
              </button>
            ))}
          </div>

          {/* Mobile Content */}
          {featuredPost ? (
            <div className="space-y-8">
              <section className="mb-5">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Featured Story
                </h2>
                <FeaturedPostSlider
                  posts={
                    popularPosts.length > 0 ? popularPosts : [featuredPost]
                  }
                />
                {/* <BlogCard post={featuredPost} /> */}
              </section>

              {otherPosts.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Latest Articles
                  </h2>
                  <div className="flex flex-col gap-6">
                    {otherPosts.map((post) => (
                      <BlogRowCard key={post._id} post={post} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-500">
                No stories found matching "{searchQuery}"
              </p>
              <button
                onClick={clearSearch}
                className="text-orange-500 font-bold mt-2 text-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* ================= DESKTOP VIEW (Grid) ================= */}
        <div className="hidden md:grid grid-cols-12 gap-10 lg:gap-14 pb-20">
          {/* Main Content Area (Left) */}
          <div className="col-span-8 space-y-14">
            {featuredPost ? (
              <>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                      Featured
                    </h2>
                  </div>
                  <BlogCard post={featuredPost} isLarge={true} />
                </section>

                {otherPosts.length > 0 && (
                  <>
                    <div className="h-px bg-gray-200 w-full" />
                    <section>
                      <h2 className="text-2xl font-bold mb-8">
                        Latest Articles
                      </h2>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                        {otherPosts.map((post) => (
                          <BlogCard key={post._id} post={post} />
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No matches found
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any articles for "{searchQuery}"
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Area (Right) */}
          <aside className="col-span-4 shadow-xl space-y-12 pl-4 border-l border-gray-100">
            {/* Categories */}
            <section>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                Categories
              </h3>
              <div className="flex flex-col items-start gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as string)}
                    className={`text-base px-4 py-2 rounded-lg transition-all w-full text-left ${
                      activeCategory === cat
                        ? "bg-orange-50 text-orange-600 font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {cat as string}
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Posts */}
            <section>
              <h3 className="text-lg font-bold mb-6">Trending Now</h3>
              <div className="flex flex-col gap-6">
                {popularPosts.map((post) => (
                  <BlogRowCard key={post._id} post={post} small={true} />
                ))}
              </div>
            </section>

            {/* Sticky Ad Banner */}
            <div className="sticky top-24 w-full aspect-3/4 bg-[#111] rounded-3xl flex flex-col items-center justify-center text-white p-8 text-center overflow-hidden relative group cursor-pointer">
              <div className="relative z-10">
                <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
                  New Collection
                </p>
                <h4 className="text-2xl font-serif mb-4">
                  Summer Drops <br /> Available Now
                </h4>
                <span className="text-sm underline decoration-orange-500 underline-offset-4 group-hover:text-orange-500 transition-colors">
                  Shop the Look
                </span>
              </div>
              {/* Abstract BG shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
