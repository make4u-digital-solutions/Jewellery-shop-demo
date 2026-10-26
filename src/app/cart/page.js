"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const addToast = useToastStore((state) => state.addToast);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotal();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      addToast(res.message);
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Breadcrumbs items={[{ label: "Shopping Bag" }]} />
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight mt-1">
            Your Shopping Bag
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-[#FFFFFF] border border-[#E6DED3] p-12 sm:p-20 text-center max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#F7F3ED] flex items-center justify-center mx-auto mb-5 text-[#C6A66B]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#27231F] mb-3">
              Your Shopping Bag is Currently Empty
            </h2>
            <p className="text-sm text-[#81786F] font-light max-w-md mx-auto mb-8 leading-relaxed">
              Explore our handcrafted fine jewellery creations, from brilliant solitaire rings to heirloom emerald necklaces.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-4 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors"
            >
              <span>Explore The Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#FFFFFF] border border-[#E6DED3] p-6 divide-y divide-[#E6DED3]">
                <div className="flex justify-between items-center pb-4 text-xs uppercase tracking-widest text-[#81786F]">
                  <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <button
                    onClick={() => {
                      clearCart();
                      addToast("Shopping bag cleared.", "info");
                    }}
                    className="hover:text-rose-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.itemId} className="py-4 sm:py-6 flex flex-row gap-3.5 sm:gap-6">
                    {/* Item Image */}
                    <div className="relative w-20 h-24 sm:w-28 sm:h-32 bg-[#F2EDE4] overflow-hidden border border-[#E6DED3] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif-luxury text-lg sm:text-xl text-[#27231F] hover:text-[#C6A66B] transition-colors font-medium leading-snug"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-[#81786F] mt-1">
                            {item.material}
                            {item.size && (
                              <span className="ml-2 font-medium text-[#27231F]">
                                • Size: {item.size}
                              </span>
                            )}
                          </p>
                        </div>
                        <span className="font-semibold text-base sm:text-lg text-[#27231F]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Quantity & Remove controls */}
                      <div className="flex items-center justify-between pt-4 mt-2">
                        <div className="flex items-center border border-[#E6DED3]">
                          <button
                            onClick={() => {
                              updateQuantity(item.itemId, item.quantity - 1);
                              if (item.quantity === 1) {
                                addToast(`Removed "${item.name}" from bag.`, "info");
                              }
                            }}
                            className="p-2 text-[#81786F] hover:text-[#27231F]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#27231F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            className="p-2 text-[#81786F] hover:text-[#27231F]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            removeItem(item.itemId);
                            addToast(`Removed "${item.name}" from bag.`, "info");
                          }}
                          className="text-xs text-[#81786F] hover:text-rose-600 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest text-[#27231F] hover:text-[#C6A66B] flex items-center gap-2 font-medium"
                >
                  <span>← Continue Exploring Collections</span>
                </Link>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary Card */}
              <div className="bg-[#FFFFFF] border border-[#E6DED3] p-6 space-y-5">
                <h3 className="font-serif-luxury text-xl text-[#27231F] font-medium pb-3 border-b border-[#E6DED3]">
                  Order Summary
                </h3>

                {/* Subtotal, Discount, Shipping */}
                <div className="space-y-3 text-xs text-[#81786F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#27231F] font-medium text-sm">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Code ({coupon.code})</span>
                      <span className="font-medium">- {formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>White-Glove Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-[#C6A66B] font-medium">Complimentary</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-[#E6DED3] flex justify-between items-baseline">
                  <span className="font-serif-luxury text-lg text-[#27231F] font-medium">
                    Grand Total
                  </span>
                  <span className="font-serif-luxury text-2xl font-bold text-[#27231F]">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-[#E6DED3]">
                  {coupon ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{coupon.label || coupon.code}</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <label className="text-[11px] uppercase tracking-wider text-[#81786F] block">
                        Privilege Code / Gift Voucher
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Try 'AURELLE10'"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 text-xs border border-[#E6DED3] px-3 py-2.5 focus:outline-hidden focus:border-[#C6A66B] uppercase"
                        />
                        <button
                          type="submit"
                          className="py-2.5 px-4 bg-[#F7F3ED] border border-[#E6DED3] hover:border-[#27231F] text-xs font-medium text-[#27231F] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-rose-500 font-light">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust guarantee badge */}
                <div className="pt-4 border-t border-[#E6DED3] flex items-center gap-2 text-[11px] text-[#81786F]">
                  <ShieldCheck className="w-4 h-4 text-[#C6A66B] shrink-0" />
                  <span>Insured transit & discreet bespoke presentation box.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
