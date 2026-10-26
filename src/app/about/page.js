import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ArrowRight, Sparkles, Gem, Compass, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Our Story & Craftsmanship | AURELLE Haute Joaillerie",
  description:
    "Discover the heritage, design philosophy, and master craftsmanship behind AURELLE. Dedicated to timeless beauty in 18K solid gold and diamonds.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Editorial Hero */}
      <div className="bg-white border-b border-[#E6DED3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 text-center">
          <Breadcrumbs items={[{ label: "Our Story" }]} />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#C6A66B] font-medium block mt-3 mb-2">
            Maison Philosophy & Heritage
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-6xl text-[#27231F] font-normal tracking-tight max-w-3xl mx-auto leading-tight">
            Quiet Luxury Handcrafted with Archival Intent.
          </h1>
          <p className="text-sm sm:text-lg text-[#81786F] font-light max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed">
            Founded with the belief that fine jewellery should be as personal as the skin it graces, AURELLE redefines heirloom ornaments for the discerning modern aesthete.
          </p>
        </div>
      </div>

      {/* Magazine Split Story 1: The Origin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] border border-[#E6DED3] overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80"
              alt="Goldsmith at the workbench sculpting 18K gold"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C6A66B] font-medium block">
              Chapter I — Genesis
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal leading-snug">
              Born from a Reverence for Sculpture & Light
            </h2>
            <p className="text-xs sm:text-base text-[#81786F] font-light leading-relaxed">
              AURELLE was established in our Mumbai atelier with a single mandate: to remove the ostentatious noise from fine jewellery and resurrect the calm dignity of quiet luxury. We view gold not merely as a precious commodity, but as a fluid, tactile medium capable of holding time.
            </p>
            <p className="text-xs sm:text-base text-[#81786F] font-light leading-relaxed">
              Every curve of our rings and each hand-filed basket of our solitaires begins as a hand-drawn pencil silhouette. Our master goldsmiths spend decades refining the balance between structural weight and effortless weightlessness on the skin.
            </p>
          </div>
        </div>
      </div>

      {/* Three Core Pillars Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-[#211E1A] text-[#F7F3ED] p-6 sm:p-16 border border-[#C6A66B]/30">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mb-2">
              The Three Tenets
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-normal">
              Our Guiding Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <Sparkles className="w-6 h-6 text-[#C6A66B]" />
              <h4 className="font-serif-luxury text-xl font-medium text-[#F7F3ED]">
                Microscopic Precision
              </h4>
              <p className="text-xs text-[#A59C90] font-light leading-relaxed">
                Prongs and bezels are calibrated to tenths of a millimeter under stereoscopic benches to guarantee stone security without sacrificing optical brilliance.
              </p>
            </div>
            <div className="space-y-3">
              <Gem className="w-6 h-6 text-[#C6A66B]" />
              <h4 className="font-serif-luxury text-xl font-medium text-[#F7F3ED]">
                Ethical Provenance
              </h4>
              <p className="text-xs text-[#A59C90] font-light leading-relaxed">
                We work strictly with conflict-free natural diamonds, certified lab-grown solitaires, and 100% recycled 18K gold alloyed to our proprietary warm hue.
              </p>
            </div>
            <div className="space-y-3">
              <Compass className="w-6 h-6 text-[#C6A66B]" />
              <h4 className="font-serif-luxury text-xl font-medium text-[#F7F3ED]">
                Permanent Relevancy
              </h4>
              <p className="text-xs text-[#A59C90] font-light leading-relaxed">
                We reject seasonal trend cycles. Our designs are conceived to remain effortlessly chic fifty years from now as they are on the day of acquisition.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Magazine Split Story 2: The Metallurgy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C6A66B] font-medium block">
              Chapter II — Metallurgy & Gems
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal leading-snug">
              Materials Chosen with Deep Respect
            </h2>
            <p className="text-sm sm:text-base text-[#81786F] font-light leading-relaxed">
              Gold is alloyed with copper and silver in precise ratios to create our signature Aurelle Warm Gold—a nuanced champagne undertone that flatters all skin tones under natural daylight.
            </p>
            <p className="text-sm sm:text-base text-[#81786F] font-light leading-relaxed">
              Our emeralds come directly from the venerable mines of Zambia, celebrated for their deep verdant crystalline fire. Each baroque freshwater pearl is hand-paired for harmonious organic asymmetry.
            </p>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-4 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-md"
              >
                <span>Explore the Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/5] border border-[#E6DED3] overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
              alt="AURELLE fine jewellery craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
