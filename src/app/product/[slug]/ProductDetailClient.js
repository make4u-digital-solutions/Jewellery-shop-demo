"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/currency";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import {
  Heart,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  Check,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailClient({ product, relatedProducts = [] }) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.defaultSize || product.sizes?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState("specs"); // 'specs' | 'care' | 'shipping' | null

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const addToast = useToastStore((state) => state.addToast);

  const isFavorited = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    if (added) {
      addToast(`Added "${product.name}" to wishlist.`);
    } else {
      addToast(`Removed from wishlist.`, "info");
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    addToast(`"${product.name}" added to your bag.`);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, quantity);
    addToast(`Proceeding to checkout...`);
    router.push("/checkout");
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setDeliveryResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code.",
      });
      return;
    }
    setDeliveryResult({
      valid: true,
      message: `Delivery available for ${pincode}: Estimated arrival within 2-4 business days via Insured Armoured Courier.`,
    });
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              {
                label: product.category,
                href: `/shop?category=${product.category}`,
              },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all ${
                      idx === selectedImageIndex
                        ? "border-[#C6A66B] ring-1 ring-[#C6A66B]"
                        : "border-[#E6DED3] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[4/5] bg-white border border-[#E6DED3] overflow-hidden shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[selectedImageIndex]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border border-[#E6DED3] shadow-sm hover:bg-white transition-all active:scale-95"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorited ? "fill-rose-600 text-rose-600" : "text-[#27231F]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Collection */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#81786F] mb-2 font-medium">
                <span>{product.collection || "Signature Atelier"}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#27231F] font-normal leading-tight mb-2.5 sm:mb-3">
                {product.name}
              </h1>

              {/* Rating and Demo Note */}
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="flex items-center text-[#C6A66B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#C6A66B] text-[#C6A66B]"
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-[#27231F]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#81786F]">
                  ({product.reviewCount} Demo Reviews)
                </span>
              </div>

              {/* Price Block */}
              <div className="py-3 sm:py-4 border-y border-[#E6DED3] flex flex-wrap sm:flex-nowrap items-baseline gap-2 sm:gap-4 mb-5 sm:mb-6">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#27231F]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs sm:text-sm text-[#81786F] line-through font-light">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] sm:text-[11px] text-[#81786F] sm:ml-auto uppercase tracking-wider block w-full sm:w-auto">
                  Inclusive of all demo taxes
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#81786F] font-light leading-relaxed mb-6">
                {product.description || product.shortDescription}
              </p>

              {/* Metal & Stone Highlights */}
              <div className="bg-white p-4 border border-[#E6DED3] mb-6 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#81786F]">Precious Metal:</span>
                  <span className="text-[#27231F] font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#81786F]">Primary Stone:</span>
                  <span className="text-[#27231F] font-medium text-right max-w-[240px]">
                    {product.stone}
                  </span>
                </div>
              </div>

              {/* Sizing Selector (If product has sizing) */}
              {product.hasSizing && product.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs uppercase tracking-widest font-medium text-[#27231F]">
                      Select Size
                    </span>
                    <span className="text-xs text-[#81786F] underline cursor-pointer hover:text-[#C6A66B]">
                      Sizing Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-4 text-xs font-medium border transition-all ${
                          selectedSize === sz
                            ? "border-[#211E1A] bg-[#211E1A] text-white shadow-xs"
                            : "border-[#E6DED3] bg-white text-[#27231F] hover:border-[#C6A66B]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest font-medium text-[#27231F]">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#E6DED3] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#81786F] hover:text-[#27231F]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-[#27231F]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#81786F] hover:text-[#27231F]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-4 px-6 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="py-4 px-6 bg-[#C6A66B] hover:bg-[#A98748] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md active:scale-[0.99]"
                  >
                    Buy Now (Demo)
                  </button>
                </div>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="bg-white p-4 border border-[#E6DED3] mb-8">
                <p className="text-xs uppercase tracking-wider font-medium text-[#27231F] mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C6A66B]" />
                  <span>Check White-Glove Delivery</span>
                </p>
                <form onSubmit={handleCheckDelivery} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 text-xs border border-[#E6DED3] px-3 py-2 focus:outline-hidden focus:border-[#C6A66B]"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#F7F3ED] border border-[#E6DED3] text-xs font-medium hover:border-[#27231F] text-[#27231F] transition-colors"
                  >
                    Check
                  </button>
                </form>
                {deliveryResult && (
                  <p
                    className={`text-xs mt-2 font-light ${
                      deliveryResult.valid ? "text-emerald-700" : "text-rose-600"
                    }`}
                  >
                    {deliveryResult.message}
                  </p>
                )}
              </div>

              {/* Accordions */}
              <div className="border-t border-[#E6DED3] divide-y divide-[#E6DED3]">
                {/* Specifications */}
                <div>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === "specs" ? null : "specs")
                    }
                    className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest font-medium text-[#27231F]"
                  >
                    <span>Creation Specifications</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === "specs" ? "rotate-180 text-[#C6A66B]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "specs" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4"
                      >
                        <div className="space-y-2 text-xs text-[#81786F]">
                          {product.specifications?.map((spec, i) => (
                            <div
                              key={i}
                              className="flex justify-between py-1 border-b border-[#E6DED3]/40"
                            >
                              <span className="font-light">{spec.label}</span>
                              <span className="font-medium text-[#27231F]">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Craftsmanship & Care */}
                <div>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === "care" ? null : "care")
                    }
                    className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest font-medium text-[#27231F]"
                  >
                    <span>Craftsmanship & Care</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === "care" ? "rotate-180 text-[#C6A66B]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "care" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4"
                      >
                        <p className="text-xs text-[#81786F] font-light leading-relaxed">
                          {product.care}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === "shipping" ? null : "shipping")
                    }
                    className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest font-medium text-[#27231F]"
                  >
                    <span>White-Glove Shipping & Returns</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openAccordion === "shipping" ? "rotate-180 text-[#C6A66B]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === "shipping" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-4"
                      >
                        <p className="text-xs text-[#81786F] font-light leading-relaxed">
                          Complimentary white-glove insured delivery across India for all creations above ₹5,000. Each package requires an adult signature. 15-day return window in unworn original salon presentation condition with seals intact.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#E6DED3]">
            <div className="text-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A66B] font-medium block mb-2">
                Harmonious Pairings
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#27231F] font-normal tracking-tight">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
