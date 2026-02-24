import { client } from "@/lib/sanity";
import { notFound } from "next/navigation"; // <--- 1. IMPORT THIS
import { singleProduct, relatedProducts } from "@/lib/queries";
import ProductDetailsClient from "../../../../components/ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch(singleProduct, { slug });
  const related = await client.fetch(relatedProducts, {
    category: product.category,
    currentId: product._id,
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductDetailsClient product={product} relatedProducts={related} />
    </div>
  );
}
