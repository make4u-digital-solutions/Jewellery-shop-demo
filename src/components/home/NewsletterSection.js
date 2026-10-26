"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [message, setMessage] = useState("");
  const addToast = useToastStore((state) => state.addToast);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Demo feedback
    setStatus("success");
    setMessage("Thank you for joining our private circle (Demo Subscription).");
    addToast("Welcome to the AURELLE circle.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-[#211E1A] text-[#F7F3ED]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mb-3">
          The Private Circle
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-4 text-[#F7F3ED]">
          A Little Luxury, Delivered.
        </h2>
        <p className="text-sm sm:text-base text-[#A59C90] font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Discover new collections, thoughtful gifting ideas, and updates from AURELLE. Receive an exclusive ₹5,000 welcome courtesy on your maiden acquisition.
        </p>

        {status === "success" ? (
          <div className="p-6 bg-white/5 border border-[#C6A66B]/40 max-w-md mx-auto text-center rounded-sm">
            <CheckCircle2 className="w-8 h-8 text-[#C6A66B] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#F7F3ED]">{message}</p>
            <p className="text-xs text-[#A59C90] mt-1 font-light">
              Use promo code <span className="text-[#C6A66B] font-medium">AURELLE10</span> for 10% off your demo order today.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className="flex-1 bg-[#2C2723] border border-[#48423B] focus:border-[#C6A66B] text-[#F7F3ED] placeholder-[#81786F] text-xs px-4 py-3.5 focus:outline-hidden transition-colors rounded-none"
              />
              <button
                type="submit"
                className="py-3.5 px-6 bg-[#C6A66B] hover:bg-[#A98748] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {status === "error" && (
              <p className="text-xs text-rose-400 mt-2 text-left font-light">{message}</p>
            )}
            <p className="text-[10px] text-[#81786F] mt-3 font-light">
              By subscribing, you agree to receive demo correspondence. Respecting your privacy is paramount to our maison.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
