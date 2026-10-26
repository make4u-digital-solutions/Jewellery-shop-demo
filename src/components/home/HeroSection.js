"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(heroImageRef.current, {
        scale: 1.12,
        opacity: 0.8,
        duration: 1.8,
      })
        .from(
          tagRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=1.2"
        )
        .from(
          headingRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          textRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center bg-[#F7F3ED] overflow-hidden border-b border-[#E6DED3]"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-6 z-10 flex flex-col justify-center">
          {/* Collection Label */}
          <div ref={tagRef} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#C6A66B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#C6A66B]">
              Haute Joaillerie Atelier • Collection 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headingRef}
            className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#27231F] font-normal tracking-tight leading-[1.12] mb-6"
          >
            Jewellery That Becomes Part of Your Story.
          </h1>

          {/* Supporting Text */}
          <p
            ref={textRef}
            className="text-base sm:text-lg text-[#81786F] font-light leading-relaxed max-w-lg mb-8"
          >
            Discover thoughtfully designed pieces that celebrate your individuality, your milestones, and the moments that matter. Handcrafted in sculpted 18K solid gold and luminous gemstones.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="py-4 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-[#F7F3ED] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="py-4 px-8 border border-[#27231F] text-[#27231F] hover:bg-[#27231F] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
            >
              Discover Our Story
            </Link>
          </div>

          {/* Subtle Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-[#E6DED3]/80 grid grid-cols-3 gap-4 text-xs text-[#81786F]">
            <div>
              <p className="font-serif-luxury text-lg text-[#27231F] font-medium">18K Solid</p>
              <p className="font-light">Recycled Gold</p>
            </div>
            <div>
              <p className="font-serif-luxury text-lg text-[#27231F] font-medium">Conflict-Free</p>
              <p className="font-light">Ethical Diamonds</p>
            </div>
            <div>
              <p className="font-serif-luxury text-lg text-[#27231F] font-medium">Bespoke</p>
              <p className="font-light">Atelier Finishing</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Image with Editorial Frame */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[4/5] overflow-hidden shadow-2xl border border-[#E6DED3]">
            <div ref={heroImageRef} className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85"
                alt="AURELLE Haute Joaillerie Fine Diamonds and Gold"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Editorial Floating Accent Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md border border-[#E6DED3] flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-medium">
                  Signature Creation
                </p>
                <p className="font-serif-luxury text-sm sm:text-base text-[#27231F] font-medium">
                  The Soleil Medallion & Celestia Solitaire
                </p>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest font-medium text-[#27231F] hover:text-[#C6A66B] flex items-center gap-1"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[#81786F]">
        <span className="text-[9px] uppercase tracking-[0.25em]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#C6A66B]" />
        </motion.div>
      </div>
    </section>
  );
}
