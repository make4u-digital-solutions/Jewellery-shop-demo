import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function NewArrivalsSection() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-2">
              Fresh from the Atelier
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#27231F] hover:text-[#C6A66B] transition-colors self-start md:self-auto"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
