import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export default function NewArrivalsSection() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1.5 sm:mb-2">
              Fresh from the Atelier
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?sort=newest"
            className="group flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#27231F] hover:text-[#C6A66B] transition-colors self-start sm:self-auto"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
