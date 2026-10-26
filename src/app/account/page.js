"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/currency";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  User,
  Package,
  Heart,
  MapPin,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AccountPage() {
  const wishlistItems = useWishlistStore((state) => state.items);

  const demoOrders = [
    {
      id: "AUR-20260214-G8P1L",
      date: "February 14, 2026",
      items: "The Celestia Diamond Solitaire Ring (US 6)",
      total: 148000,
      status: "Delivered & Inspected",
    },
    {
      id: "AUR-20260102-K3N9Q",
      date: "January 2, 2026",
      items: "Aura Freshwater Baroque Pearl Earrings",
      total: 48500,
      status: "Delivered & Inspected",
    },
  ];

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Breadcrumbs items={[{ label: "Client Portal" }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1">
                Private Client Circle • Demo Portal
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
                Welcome, Priya Kapoor
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F7F3ED] border border-[#C6A66B]/50 text-xs text-[#27231F] self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="font-medium">Atelier Circle Tier: Sovereign</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-[#211E1A] text-[#F7F3ED] py-2 px-4 text-xs text-center border-b border-[#C6A66B]/30 flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-[#C6A66B]" />
        <span>
          Illustrative Client Portal Demonstration. Simulated profile for sample browsing and demonstration.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Client Profile & Addresses */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E6DED3] p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E6DED3]">
                <div className="w-12 h-12 rounded-full bg-[#F7F3ED] border border-[#C6A66B] flex items-center justify-center text-[#27231F] font-serif-luxury text-xl">
                  PK
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium">
                    Priya Kapoor
                  </h3>
                  <p className="text-xs text-[#81786F]">priya.kapoor@example.com</p>
                </div>
              </div>

              <div className="text-xs text-[#81786F] space-y-1.5">
                <p>
                  <strong className="text-[#27231F] font-medium">Salon Advisor:</strong>{" "}
                  Mme. Devika Merchant
                </p>
                <p>
                  <strong className="text-[#27231F] font-medium">Patron Since:</strong>{" "}
                  October 2024
                </p>
                <p>
                  <strong className="text-[#27231F] font-medium">Primary Salon:</strong>{" "}
                  Mumbai Flagship Atelier
                </p>
              </div>
            </div>

            {/* Saved Address */}
            <div className="bg-white border border-[#E6DED3] p-6 space-y-3">
              <h4 className="font-serif-luxury text-base text-[#27231F] font-medium pb-2 border-b border-[#E6DED3] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6A66B]" />
                <span>Primary Delivery Residence</span>
              </h4>
              <p className="text-xs text-[#81786F] font-light leading-relaxed">
                B-402, Sea Green Mansions,
                <br />
                Worli Sea Face, Mumbai 400018,
                <br />
                Maharashtra, India
              </p>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="bg-white border border-[#E6DED3] p-6 flex items-center justify-between hover:border-[#C6A66B] transition-colors group block"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#C6A66B]" />
                <div>
                  <h4 className="font-serif-luxury text-base text-[#27231F] group-hover:text-[#C6A66B] font-medium">
                    Curated Wishlist
                  </h4>
                  <p className="text-xs text-[#81786F]">{wishlistItems.length} saved creations</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#81786F] group-hover:text-[#C6A66B] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Acquisition History */}
          <div className="lg:col-span-8 bg-white border border-[#E6DED3] p-6 sm:p-8 space-y-6">
            <h2 className="font-serif-luxury text-2xl text-[#27231F] font-medium pb-4 border-b border-[#E6DED3] flex items-center justify-between">
              <span>Past Acquisitions (Demo)</span>
              <Package className="w-5 h-5 text-[#C6A66B]" />
            </h2>

            <div className="space-y-4">
              {demoOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 border border-[#E6DED3] bg-[#F7F3ED]/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[#C6A66B]/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#27231F]">
                        {ord.id}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-xs font-medium">
                        {ord.status}
                      </span>
                    </div>
                    <p className="font-serif-luxury text-base text-[#27231F] font-medium">
                      {ord.items}
                    </p>
                    <p className="text-xs text-[#81786F]">{ord.date}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-serif-luxury text-lg font-bold text-[#27231F] block">
                      {formatPrice(ord.total)}
                    </span>
                    <span className="text-[11px] text-[#C6A66B] font-light">
                      Certificate Archival Available
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E6DED3] flex items-center justify-between">
              <span className="text-xs text-[#81786F]">
                Need assistance with past acquisitions?
              </span>
              <Link
                href="/contact"
                className="text-xs uppercase tracking-widest text-[#27231F] hover:text-[#C6A66B] font-medium transition-colors"
              >
                Inquire with Concierge →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
