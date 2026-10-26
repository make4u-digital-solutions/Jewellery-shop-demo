import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-[#FFFFFF] border-b border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-2">
            Curated Categories
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-[#81786F] font-light leading-relaxed">
            Every category represents an ode to timeless geometry, sculpted precious metals, and luminous stones.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden bg-[#F2EDE4] border border-[#E6DED3] flex flex-col justify-end aspect-[4/5] p-6 sm:p-8"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Gradient Overlay for Editorial Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A]/85 via-[#211E1A]/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              {/* Text Content */}
              <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-medium block mb-1">
                  {cat.itemCount}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FFFFFF] font-normal tracking-wide mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#D1C8BC] font-light line-clamp-2 mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#C6A66B] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
