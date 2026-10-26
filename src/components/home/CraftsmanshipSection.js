"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Compass } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CraftsmanshipSection() {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!prefersReducedMotion) {
          gsap.from(imageWrapperRef.current, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            opacity: 0,
            x: -30,
            duration: 1.2,
            ease: "power2.out",
          });

          gsap.from(contentRef.current, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            opacity: 0,
            x: 30,
            duration: 1.2,
            delay: 0.2,
            ease: "power2.out",
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#F7F3ED] border-b border-[#E6DED3] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Craftsmanship Photography */}
          <div
            ref={imageWrapperRef}
            className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden border border-[#E6DED3] shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1400&q=85"
              alt="Artisanal Jewellery Craftsmanship at AURELLE"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Minimalist Inset Caption */}
            <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur-sm border border-[#E6DED3] max-w-xs">
              <p className="text-[10px] uppercase tracking-widest text-[#C6A66B] font-medium">
                Atelier Philosophy
              </p>
              <p className="font-serif-luxury text-xs text-[#27231F] mt-1 font-light italic">
                Over 120 hours of hand-filing, microscopic pavé setting, and custom polishing per creation.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#C6A66B]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium">
                The AURELLE Distinction
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#27231F] font-normal tracking-tight leading-[1.15] mb-6">
              Made to Be Kept. Designed to Be Remembered.
            </h2>

            <p className="text-base text-[#81786F] font-light leading-relaxed mb-6">
              In a world of fleeting trends, AURELLE crafts with archival intent. We reject the ephemeral in pursuit of enduring poise. Each solitaire cradle, each articulating necklace link, and each polished bezel is sculpted to hold memory and emotion across lifetimes.
            </p>

            <p className="text-sm text-[#81786F] font-light leading-relaxed mb-8">
              We source only verified 18K recycled gold and conflict-free gemstones, ensuring that every ounce of beauty we create leaves an honorable legacy for generations to come.
            </p>

            {/* Three Pillar Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pt-4 border-t border-[#E6DED3]">
              <div className="space-y-1">
                <Sparkles className="w-5 h-5 text-[#C6A66B] mb-2" />
                <h4 className="font-serif-luxury text-base text-[#27231F] font-medium">
                  Micro-Pavé Precision
                </h4>
                <p className="text-xs text-[#81786F] font-light">
                  Settings crafted under 40x magnification.
                </p>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#C6A66B] mb-2" />
                <h4 className="font-serif-luxury text-base text-[#27231F] font-medium">
                  Ethical Provenance
                </h4>
                <p className="text-xs text-[#81786F] font-light">
                  Traceable origins and responsibly sourced alloys.
                </p>
              </div>
              <div className="space-y-1">
                <Compass className="w-5 h-5 text-[#C6A66B] mb-2" />
                <h4 className="font-serif-luxury text-base text-[#27231F] font-medium">
                  Quiet Geometry
                </h4>
                <p className="text-xs text-[#81786F] font-light">
                  Ergonomically weighted for unyielding comfort.
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 py-4 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-[#F7F3ED] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
