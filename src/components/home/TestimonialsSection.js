"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-12 sm:py-24 bg-[#FFFFFF] border-b border-[#E6DED3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1.5 sm:mb-2">
            Patron Reflections
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
            Words from Our Circle
          </h2>
          <p className="text-xs text-[#81786F] mt-1.5 italic font-light">
            (Illustrative Demo Feedback)
          </p>
        </div>

        {/* Carousel / Editorial Quote Box */}
        <div className="relative bg-[#F7F3ED] border border-[#E6DED3] p-5 sm:p-14 shadow-xs">
          <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[#C6A66B]/20 absolute top-4 left-4 sm:top-8 sm:left-8" />

          <div className="min-h-[160px] sm:min-h-[180px] flex flex-col justify-center text-center relative z-10 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Star rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C6A66B] text-[#C6A66B]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif-luxury text-base sm:text-2xl text-[#27231F] italic font-light leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="font-medium text-sm tracking-wider uppercase text-[#27231F]">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#81786F] mt-0.5">
                    {current.location} • Acquired: {current.piece}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E6DED3]">
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-8 bg-[#C6A66B]"
                      : "w-2 bg-[#D1C8BC] hover:bg-[#81786F]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-[#E6DED3] bg-white text-[#27231F] hover:bg-[#27231F] hover:text-white transition-colors flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-[#E6DED3] bg-white text-[#27231F] hover:bg-[#27231F] hover:text-white transition-colors flex items-center justify-center"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
