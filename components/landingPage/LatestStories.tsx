import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LatestStories({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  const featuredPost = posts[0];
  const listPosts = posts.slice(1, 4);

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 shadow-xl shadow-gray-900/50 rounded-3xl">
        <div className="flex items-center justify-between gap-4 mb-10 w-full">
          {/* Added whitespace-nowrap and slightly reduced mobile text to text-2xl to ensure it fits */}
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-300 tracking-tight whitespace-nowrap">
            Latest Stories
          </h2>

          {/* Added shrink-0 and whitespace-nowrap so the button never breaks or squishes */}
          <Link
            href="/blog"
            className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full  border border-transparent dark:border-zinc-800 text-sm font-medium text-gray-900 dark:text-gray-300 hover:opacity-80 transition-all shrink-0 whitespace-nowrap"
          >
            Read more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* --- LEFT SIDE: Featured Post --- */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="lg:col-span-7 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/3] md:aspect-video bg-gray-100 rounded-[2rem] overflow-hidden mb-6">
                {featuredPost.image && (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-500 uppercase tracking-wider">
                  {featuredPost.category}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-300 mb-3 group-hover: transition-colors leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-sm text-gray-400 font-medium mb-4">
                {featuredPost.publishedAt} <span className="mx-2">•</span>{" "}
                {featuredPost.readTime}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-10 leading-relaxed line-clamp-3 md:line-clamp-2">
                {featuredPost.excerpt}
              </p>
            </Link>
          )}

          {/* --- RIGHT SIDE: List Posts --- */}
          {listPosts.length > 0 && (
            <div className="lg:col-span-5 flex flex-col justify-start gap-8 md:gap-4">
              {listPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post._id}
                  className="flex gap-5 rounded-2xl mb-5 shadow-xl shadow-gray-900/50 group cursor-pointer items-center"
                >
                  <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center flex-1 py-1">
                    <span className="text-xs font-bold text-orange-500 dark:text-red-300 uppercase tracking-wider mb-2">
                      {post.category}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-300 mb-2 group-hover: transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-gray-300 font-medium">
                      {post.publishedAt} <span className="mx-1.5">•</span>{" "}
                      {post.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
