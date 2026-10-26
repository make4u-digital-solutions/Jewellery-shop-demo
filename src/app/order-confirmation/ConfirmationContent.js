"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/currency";
import {
  CheckCircle,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Printer,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "AUR-20261026-DEMO";
  const [order, setOrder] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("lastAurelleOrder");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C6A66B", "#DFC89B", "#211E1A", "#81786F"],
      });
    } catch {
      // Ignore if canvas-confetti fails in test environment
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-white border border-[#E6DED3] p-5 sm:p-12 shadow-sm">
          {/* Header */}
          <div className="text-center pb-6 sm:pb-8 border-b border-[#E6DED3]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F7F3ED] border border-[#C6A66B] flex items-center justify-center mx-auto mb-3 sm:mb-4 text-[#C6A66B]">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-1">
              Acquisition Confirmed • Demo Order
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal tracking-tight mb-2">
              Thank You for Your Order
            </h1>
            <p className="text-xs sm:text-sm text-[#81786F] font-light max-w-md mx-auto">
              Your acquisition has been entered into the AURELLE atelier system. An insured white-glove parcel is being prepared.
            </p>
          </div>

          {/* Reference & Date Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-[#E6DED3] text-xs">
            <div>
              <span className="text-[#81786F] block">Order Reference:</span>
              <span className="font-mono text-sm font-semibold text-[#27231F]">
                {order?.orderId || orderId}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="text-[#81786F] block">Estimated White-Glove Dispatch:</span>
              <span className="font-medium text-[#27231F]">
                Within 48 hours via Armoured Transit
              </span>
            </div>
          </div>

          {/* Ordered Items */}
          {order?.items && order.items.length > 0 && (
            <div className="py-6 border-b border-[#E6DED3]">
              <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium mb-4">
                Purchased Pieces
              </h3>
              <div className="divide-y divide-[#E6DED3]/60">
                {order.items.map((item) => (
                  <div key={item.itemId} className="py-3 flex items-center gap-4">
                    <div className="relative w-14 h-16 bg-[#F2EDE4] overflow-hidden border border-[#E6DED3] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif-luxury text-base text-[#27231F] font-medium">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#81786F]">
                        Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                      </p>
                    </div>
                    <span className="font-medium text-xs text-[#27231F]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Breakdown */}
          {order && (
            <div className="py-6 border-b border-[#E6DED3] space-y-2 text-xs text-[#81786F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#27231F] font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Privilege Courtesy ({order.couponCode})</span>
                  <span>- {formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({order.deliveryMethod})</span>
                <span>
                  {order.shippingFee === 0 ? "Complimentary" : formatPrice(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6DED3] text-sm text-[#27231F] font-semibold">
                <span>Total Amount</span>
                <span className="font-serif-luxury text-xl font-bold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          {/* Delivery & Payment Metadata */}
          {order?.customer && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E6DED3] text-xs">
              <div>
                <h4 className="font-medium uppercase tracking-wider text-[#27231F] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Delivery Address</span>
                </h4>
                <p className="text-[#81786F] font-light leading-relaxed">
                  {order.customer.firstName} {order.customer.lastName}
                  <br />
                  {order.customer.address}
                  <br />
                  {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                  <br />
                  Phone: {order.customer.phone}
                </p>
              </div>

              <div>
                <h4 className="font-medium uppercase tracking-wider text-[#27231F] mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Payment Information</span>
                </h4>
                <p className="text-[#81786F] font-light leading-relaxed">
                  Method: {order.paymentMethod}
                  <br />
                  Status: Simulated Demo Settlement (Success)
                  <br />
                  Receipt: Sent to {order.customer.email}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="py-3 px-6 border border-[#27231F] text-[#27231F] hover:bg-[#27231F] hover:text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Printer className="w-4 h-4" />
              <span>Print Demo Receipt</span>
            </button>

            <Link
              href="/shop"
              className="py-3.5 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center shadow-md"
            >
              <span>Explore More Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-8 text-center text-xs text-[#81786F] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C6A66B]" />
          <span>AURELLE Haute Joaillerie Demo Storefront • No real monetary charge</span>
        </div>
      </div>
    </div>
  );
}
