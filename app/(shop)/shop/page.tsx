import ShopClient from "./ShopClient";
import { client } from "@/lib/sanity";
import { allProducts, allCategories } from "@/lib/queries";

export default async function ShopPage() {
  const products = await client.fetch(allProducts);
  const categories = await client.fetch(allCategories);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans pb-20 md:pb-0">
      <ShopClient products={products} categories={categories} />
    </div>
  );
}
