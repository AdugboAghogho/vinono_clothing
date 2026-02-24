import { client } from "@/lib/sanity";
import { allBlogs } from "@/lib/queries";
import BlogClient from "./BlogClient";

// 1. Fetch data on the server (SEO friendly + Fast)
export default async function BlogPage() {
  const posts = await client.fetch(allBlogs);

  // 2. Pass data to the interactive client component
  return <BlogClient posts={posts} />;
}