import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables from .env.local
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

async function createCategory(category, counter) {
  try {
    const categoryId = "category-" + counter;
    await client.createOrReplace({
      _id: categoryId,
      _type: "category",
      title: category.name,
      slug: {
        _type: "slug",
        current: category.slug,
      },
    });
    console.log(`Category created: ${category.name}`);
    return categoryId;
  } catch (error) {
    console.error("Category creation failed:", error);
  }
}

async function importData() {
  try {
    console.log("Fetching products from API...");
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Categorize products
    const categories = new Map();

    // Process products
    for (const product of products) {
      let categoryId = categories.get(product.category);

      if (!categoryId) {
        const category = {
          name: product.category,
          slug: product.category.toLowerCase().replace(/\s+/g, "-"),
        };
        categoryId = await createCategory(category, categories.size + 1);
        categories.set(product.category, categoryId);
      }

      const imageId = await uploadImageToSanity(product.image);

      if (imageId) {
        const productDoc = {
          _type: "product",
          name: product.title,
          slug: {
            _type: "slug",
            current: product.title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .slice(0, 96),
          },
          price: product.price,
          description: product.description,
          category: {
            _type: "reference",
            _ref: categoryId,
          },
          images: [
            {
              _key: `image-${Date.now()}`,
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageId,
              },
            },
          ],
          sizes: ["S", "M", "L", "XL"], // Adding mock sizes
          colors: ["Black", "Orange", "White"], // Adding mock colors
        };

        await client.create(productDoc);
        console.log(`Product created: ${product.title}`);
      }
    }

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

importData();
