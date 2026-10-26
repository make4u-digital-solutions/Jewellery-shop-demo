"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/currency";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddToCart = (product) => {
    addItem(product, product.defaultSize || null, 1);
    addToast(`"${product.name}" moved to bag.`);
    openCart();
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Breadcrumbs items={[{ label: "Your Wishlist" }]} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1">
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
              Curated Wishlist ({items.length})
            </h1>
            {items.length > 0 && (
              <button
                onClick={() => {
                  clearWishlist();
                  addToast("Wishlist cleared.", "info");
                }}
                className="text-xs text-[#81786F] hover:text-rose-600 transition-colors underline self-start sm:self-auto"
              >
                Clear Wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {items.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E6DED3] p-6 sm:p-12 md:p-16 text-center max-w-2xl mx-auto my-6 sm:my-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F7F3ED] flex items-center justify-center mx-auto mb-5 text-[#C6A66B]">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#27231F] mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-sm text-[#81786F] font-light max-w-md mx-auto mb-8 leading-relaxed">
              Save your favorite solitaires, collared necklaces, and bridal sets here as you browse our collections.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 py-4 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-[#E6DED3] flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/5] bg-[#F2EDE4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => {
                        removeFromWishlist(item.id);
                        addToast(`Removed "${item.name}" from wishlist.`, "info");
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#81786F] hover:text-rose-600 transition-colors shadow-sm"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#81786F] block mb-1">
                        {item.material || item.category}
                      </span>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium leading-snug hover:text-[#C6A66B] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-semibold text-[#27231F] mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 px-4 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
