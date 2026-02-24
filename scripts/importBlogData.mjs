import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Create Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-08-31",
});

// --- MOCK DATA ---
const MOCK_POSTS = [
  {
    title: "The Future of Fashion Design: Digital & Sustainable",
    category: "Design",
    author: "Donnie Dawson",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    authorImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    publishedAt: "2026-10-24T12:00:00Z",
    body: "Digital fashion is reshaping how we view clothing. From 3D modeling to virtual runways, the future is here.",
  },
  {
    title: "5 Essential Tips for Summer Layering",
    category: "Style Tips",
    author: "Sarah Jenkins",
    imageUrl:
      "https://images.unsplash.com/photo-1523798724321-84c1518313ea?q=80&w=1000",
    authorImageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    publishedAt: "2026-10-20T10:00:00Z",
    body: "Staying cool doesn't mean sacrificing style. Here is how to layer lightweight fabrics effectively.",
  },
  {
    title: "Understanding Color Theory in Your Wardrobe",
    category: "Fashion",
    author: "Donnie Dawson",
    imageUrl:
      "https://images.unsplash.com/photo-1507915977619-6987c2566786?q=80&w=1000",
    authorImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    publishedAt: "2026-10-18T14:30:00Z",
    body: "Color can change your mood and your look. Learn the basics of the color wheel to upgrade your style.",
  },
  {
    title: "A Beginner's Guide to a Minimalist Wardrobe",
    category: "Sustainability",
    author: "Sarah Jenkins",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000",
    authorImageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    publishedAt: "2026-10-15T09:15:00Z",
    body: "Less is more. A capsule wardrobe focuses on versatility and quality over quantity.",
  },
];

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);
    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);
    const asset = await client.assets.upload("image", bufferImage, {
      filename: imageUrl.split("/").pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imageUrl, error);
    return null;
  }
}

async function importBlogData() {
  try {
    console.log("🚀 Importing blog posts...");

    for (const post of MOCK_POSTS) {
      console.log(`Processing post: ${post.title}`);

      const imageId = await uploadImageToSanity(post.imageUrl);
      const authorImageId = await uploadImageToSanity(post.authorImageUrl);

      if (imageId && authorImageId) {
        const document = {
          _type: "blog",
          title: post.title,
          // UPDATED: Better slug generation (removes apostrophes and special chars)
          slug: {
            _type: "slug",
            current: post.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .slice(0, 96),
          },
          author: post.author,
          category: post.category,
          publishedAt: post.publishedAt,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageId,
            },
          },
          authorImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: authorImageId,
            },
          },
          // UPDATED: Added _key to fix "Missing keys" warning
          content: [
            {
              _type: "block",
              _key: Math.random().toString(36).substring(7),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: Math.random().toString(36).substring(7),
                  text: post.body,
                },
              ],
            },
          ],
        };

        await client.create(document);
        console.log(`✅ Blog Post created: ${post.title}`);
      }
    }
    console.log("🎉 Blog data import completed!");
  } catch (error) {
    console.error("❌ Error importing blog data:", error);
  }
}

importBlogData();
