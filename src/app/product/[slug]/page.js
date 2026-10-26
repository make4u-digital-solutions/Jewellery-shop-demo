import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Creation Not Found | AURELLE",
    };
  }

  return {
    title: `${product.name} | AURELLE Haute Joaillerie`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | AURELLE`,
      description: product.shortDescription,
      images: [
        {
          url: product.images?.[0] || product.image,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from the same category or others
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion))
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
