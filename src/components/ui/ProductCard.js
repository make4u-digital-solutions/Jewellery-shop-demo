"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import { motion } from "framer-motion";

export default function ProductCard({ product, priority = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);

  const isFavorited = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      addToast(`Added "${product.name}" to your wishlist.`);
    } else {
      addToast(`Removed from your wishlist.`, "info");
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.defaultSize || null, 1);
    addToast(`"${product.name}" added to bag.`);
    openCart();
  };

  const primaryImage = product.images?.[0] || product.image;
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] border border-[#E6DED3] transition-all duration-300 hover:shadow-lg hover:border-[#C6A66B]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F2EDE4]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestseller && (
            <span className="bg-[#211E1A] text-[#F7F3ED] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#C6A66B] text-[#FFFFFF] text-[10px] tracking-widest uppercase px-2.5 py-1 font-medium">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border border-[#E6DED3] shadow-sm hover:bg-white transition-transform active:scale-90"
        >
          <motion.div
            animate={{ scale: isFavorited ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.25 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? "fill-rose-600 text-rose-600" : "text-[#27231F]"
              }`}
            />
          </motion.div>
        </button>

        {/* Product Images with Crossfade & Gentle Zoom */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100"
              }`}
            />
            {secondaryImage !== primaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </Link>

        {/* Quick Add Overlay on Desktop / Touch Friendly Bar on Mobile */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#211E1A] hover:bg-[#C6A66B] text-[#F7F3ED] hover:text-white text-[11px] uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="w-10 bg-white/95 hover:bg-white text-[#27231F] border border-[#E6DED3] flex items-center justify-center transition-colors shadow-md"
            aria-label="View product details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Material */}
          <div className="flex items-center justify-between text-[11px] text-[#81786F] uppercase tracking-wider mb-1">
            <span>{product.material || product.category}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-[#27231F]">
                <Star className="w-3 h-3 fill-[#C6A66B] text-[#C6A66B]" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-[10px] text-[#81786F]">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif-luxury text-base sm:text-lg text-[#27231F] font-normal leading-snug line-clamp-1 hover:text-[#C6A66B] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Occasion */}
        <div className="pt-2 border-t border-[#E6DED3]/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#27231F]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#81786F] line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#81786F] tracking-wide capitalize">
            {product.occasion ? product.occasion.replace("-", " ") : "Atelier"}
          </span>
        </div>
      </div>
    </div>
  );
}
