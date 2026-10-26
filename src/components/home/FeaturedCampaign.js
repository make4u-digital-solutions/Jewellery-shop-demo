"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedCampaign() {
  const containerRef = useRef(null);
  const parallaxImageRef = useRef(null);

  useGSAP(
    () => {
      // Register ScrollTrigger only on client
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!prefersReducedMotion && parallaxImageRef.current) {
          gsap.to(parallaxImageRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[550px] lg:min-h-[620px] flex items-center overflow-hidden bg-[#211E1A] text-[#F7F3ED]"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 -top-20 -bottom-20 w-full overflow-hidden">
        <div ref={parallaxImageRef} className="relative w-full h-[120%]">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1800&q=85"
            alt="The Golden Hour Collection by AURELLE"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#211E1A] via-[#211E1A]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C6A66B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium">
              Curated Editorial Campaign
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F3ED] font-normal tracking-tight leading-[1.15] mb-6">
            The Golden Hour Collection
          </h2>

          <p className="text-sm sm:text-base text-[#D1C8BC] font-light leading-relaxed mb-8">
            Inspired by the sun sinking into the Aegean horizon, casting amber reflections across sculpted 18K gold and warm brilliant diamonds. An homage to quiet warmth and eternal grace.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/shop?collection=Golden+Hour"
              className="py-4 px-8 bg-[#C6A66B] hover:bg-[#A98748] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-lg flex items-center gap-2 group"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="py-4 px-8 border border-[#E6DED3]/40 text-[#F7F3ED] hover:bg-white/10 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              The Inspiration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
