"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingFee,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#211E1A]/60 backdrop-blur-xs z-[990]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FFFFFF] border-l border-[#E6DED3] z-[999] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#E6DED3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C6A66B]" />
                <h2 className="font-serif-luxury text-xl font-medium tracking-wide">
                  Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#81786F] hover:text-[#27231F] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complimentary Shipping Progress */}
            <div className="px-5 py-3 bg-[#F7F3ED] border-b border-[#E6DED3] text-xs">
              {subtotal >= freeShippingThreshold ? (
                <p className="text-[#27231F] font-medium text-center">
                  ✨ Complimentary White-Glove Shipping Unlocked
                </p>
              ) : (
                <div>
                  <p className="text-[#81786F] text-center mb-1.5">
                    Add{" "}
                    <span className="font-medium text-[#27231F]">
                      {formatPrice(freeShippingThreshold - subtotal)}
                    </span>{" "}
                    more for Complimentary Delivery
                  </p>
                  <div className="w-full bg-[#E6DED3] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C6A66B] h-full transition-all duration-300"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E6DED3]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F7F3ED] flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[#C6A66B]" />
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#27231F] mb-2">
                    Your Shopping Bag is Empty
                  </h3>
                  <p className="text-sm text-[#81786F] max-w-xs mb-6 font-light">
                    Explore our handcrafted collections of fine jewellery designed for lifelong moments.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="py-3 px-6 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest transition-colors font-medium"
                  >
                    Explore Creations
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.itemId} className="py-4 flex gap-4">
                    <div className="relative w-20 h-24 bg-[#F2EDE4] shrink-0 overflow-hidden border border-[#E6DED3]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif-luxury text-base text-[#27231F] hover:text-[#C6A66B] transition-colors line-clamp-1 font-medium"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.itemId)}
                            className="text-[#81786F] hover:text-rose-600 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.size && (
                          <p className="text-xs text-[#81786F] mt-0.5">
                            Size: <span className="text-[#27231F]">{item.size}</span>
                          </p>
                        )}
                        <p className="text-xs font-semibold text-[#27231F] mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#E6DED3]">
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                            className="p-1.5 text-[#81786F] hover:text-[#27231F] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-medium text-[#27231F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            className="p-1.5 text-[#81786F] hover:text-[#27231F] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-[#81786F]">
                          Total:{" "}
                          <span className="font-medium text-[#27231F]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Actions */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#E6DED3] bg-[#F7F3ED]/50 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#81786F]">
                    <span>Subtotal</span>
                    <span className="text-[#27231F] font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#81786F]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-[#C6A66B] font-medium">Complimentary</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6DED3] flex justify-between items-baseline">
                  <span className="text-sm font-medium uppercase tracking-wider text-[#27231F]">
                    Estimated Total
                  </span>
                  <span className="text-lg font-semibold text-[#27231F]">
                    {formatPrice(subtotal + shipping)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="py-3 px-4 border border-[#27231F] text-[#27231F] hover:bg-[#27231F] hover:text-white text-xs uppercase tracking-widest text-center transition-colors font-medium"
                  >
                    View Bag
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="py-3 px-4 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest text-center transition-colors font-medium flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
