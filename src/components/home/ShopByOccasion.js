import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { occasions } from "@/data/categories";

export default function ShopByOccasion() {
  return (
    <section className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E6DED3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1.5 sm:mb-2">
            Moments of Significance
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal tracking-tight mb-3 sm:mb-4">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-base text-[#81786F] font-light leading-relaxed">
            From life-altering wedding vows to heartfelt milestone celebrations, discover jewellery conceived for your most treasured chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/shop?occasion=${occ.id}`}
              className="group relative aspect-[3/4] overflow-hidden border border-[#E6DED3] bg-[#F2EDE4] flex flex-col justify-end p-5 sm:p-6"
            >
              <div className="absolute inset-0">
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A]/85 via-[#211E1A]/35 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
              </div>

              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-medium block mb-1">
                  Occasion Curation
                </span>
                <h3 className="font-serif-luxury text-2xl text-white font-medium mb-1">
                  {occ.name}
                </h3>
                <p className="text-xs text-[#D1C8BC] font-light mb-4 line-clamp-1">
                  {occ.tagline}
                </p>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#C6A66B] group-hover:text-white transition-colors">
                  <span>Explore Pieces</span>
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
