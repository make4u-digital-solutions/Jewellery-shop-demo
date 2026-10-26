"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Orders & Authenticity",
    questions: [
      {
        q: "What metals does AURELLE utilize in its creations?",
        a: "We work exclusively in 18K solid yellow, rose, and white gold, as well as Platinum 950. All gold alloys are prepared in-house to achieve our signature warm undertone, ensuring long-lasting strength and resistance to tarnish.",
      },
      {
        q: "Are the diamonds ethically sourced?",
        a: "Yes. Every natural diamond is strictly Kimberley Process certified and conflict-free. For select modern solitaires, we also offer sustainably cultivated lab-grown diamonds of exceptional VVS clarity and D-E colour grades.",
      },
      {
        q: "Can I customize a piece or commission bespoke creations?",
        a: "Our atelier welcomes bespoke commissions for engagement solitaires, anniversary necklaces, and bridal sets. You may arrange a consultation through our Contact Concierge.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    questions: [
      {
        q: "How do I determine my correct ring size?",
        a: "We recommend measuring an existing ring's inner diameter in millimeters or consulting a local jeweller. Most of our solitaire and eternity bands are available in standard US sizes 5 through 9. Complimentary resizing is offered once within 30 days of purchase.",
      },
      {
        q: "Can tennis bracelets and collar necklaces be lengthened or shortened?",
        a: "Our collar necklaces feature built-in 2-inch extender rings. Tennis bracelets are handcrafted with removable links that can be adjusted by our salon goldsmiths upon request.",
      },
    ],
  },
  {
    category: "Shipping & Returns",
    questions: [
      {
        q: "Is shipping insured?",
        a: "Yes. Every shipment is 100% insured from the moment it leaves our atelier until delivered. For security, delivery requires an adult signature and an OTP verification.",
      },
      {
        q: "What is your return policy?",
        a: "We provide a 15-day return and exchange period for unworn pieces returned in original presentation packaging with security tags intact. Bespoke and custom-engraved pieces are final sale.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({ "0-0": true });

  const toggleItem = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Breadcrumbs items={[{ label: "Client Assistance & FAQ" }]} />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C6A66B] font-medium block mt-2 mb-2">
            Frequently Addressed Topics
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight">
            Client Assistance & FAQ
          </h1>
          <p className="text-sm sm:text-base text-[#81786F] font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Everything you need to know about our gold standards, gemstone grading, custom commissions, and white-glove shipping.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {faqs.map((group, catIdx) => (
          <div key={group.category} className="bg-white border border-[#E6DED3] p-6 sm:p-8">
            <h2 className="font-serif-luxury text-2xl text-[#27231F] font-medium pb-4 border-b border-[#E6DED3] mb-4">
              {group.category}
            </h2>

            <div className="divide-y divide-[#E6DED3]">
              {group.questions.map((faq, qIdx) => {
                const isOpen = !!openItems[`${catIdx}-${qIdx}`];
                return (
                  <div key={qIdx} className="py-4">
                    <button
                      onClick={() => toggleItem(catIdx, qIdx)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <h3 className="font-serif-luxury text-lg text-[#27231F] font-normal group-hover:text-[#C6A66B] transition-colors pr-4">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 text-[#81786F] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#C6A66B]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#81786F] font-light leading-relaxed pt-3">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-[#211E1A] text-[#F7F3ED] p-8 text-center space-y-4 border border-[#C6A66B]/30">
          <h3 className="font-serif-luxury text-2xl font-normal">
            Still Have an Unresolved Question?
          </h3>
          <p className="text-xs sm:text-sm text-[#A59C90] max-w-md mx-auto font-light">
            Our salon concierge will be delighted to guide you individually.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 py-3 px-6 bg-[#C6A66B] hover:bg-[#A98748] text-white text-xs uppercase tracking-widest font-medium transition-colors"
          >
            <span>Contact Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
