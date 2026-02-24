import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { client } from "@/lib/sanity";
import { singleBlog } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  /// 1. AWAIT THE PARAMS
  const { slug } = await params;

  // 2. Pass the awaited slug to Sanity
  const post = await client.fetch(singleBlog, { slug });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );
  }

  // Define how to render Sanity content blocks
  const ptComponents = {
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-5 mb-4">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal pl-5 mb-4">{children}</ol>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* HEADER */}
      <header className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <Link href="/blog">
          <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        </Link>
        <div className="flex gap-3">
          <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:text-orange-500 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:text-orange-500 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </header>

      <article className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* META */}
        <div className="text-center mb-8">
          <span className="inline-block bg-orange-100 text-orange-500 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative border border-white shadow-sm">
                {post.authorImage && (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <span className="font-medium text-gray-900">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-xl mb-12 bg-gray-100">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-sm border border-gray-50">
          <PortableText value={post.content} components={ptComponents} />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="text-gray-500 mb-6">
            Subscribe to our newsletter for more fashion insights.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              placeholder="Enter your email"
              className="rounded-full bg-white h-12 border-gray-200"
            />
            <Button className="rounded-full h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
