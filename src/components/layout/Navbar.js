"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import CartDrawer from "./CartDrawer";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const wishlistItems = useWishlistStore((state) => state.items);

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products for search modal
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.material.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="w-full z-[100] sticky top-0 transition-all duration-300">
        {/* 1. Announcement Bar */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#211E1A] text-[#F7F3ED] text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase py-2 px-3 sm:px-4 flex items-center justify-between border-b border-[#C6A66B]/20"
            >
              <div className="flex-1 text-center font-light leading-snug">
                Complimentary White-Glove Shipping on Orders Above ₹5,000 | Code:{" "}
                <span className="text-[#C6A66B] font-medium">AURELLE10</span> for 10% Off
              </div>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="text-[#81786F] hover:text-[#F7F3ED] transition-colors p-1 shrink-0 ml-2"
                aria-label="Dismiss announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Main Navigation Bar */}
        <nav
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#F7F3ED]/95 backdrop-blur-md shadow-sm border-b border-[#E6DED3] py-3.5"
              : "bg-[#F7F3ED] border-b border-[#E6DED3]/60 py-4 sm:py-5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-[#27231F] hover:text-[#C6A66B] transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Navigation Links (Left) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative text-xs uppercase tracking-widest font-normal text-[#27231F] hover:text-[#C6A66B] transition-colors py-1 group"
                  >
                    <span>{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#C6A66B] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Centered Brand Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group">
                <span className="font-serif-luxury text-xl sm:text-3xl tracking-[0.2em] sm:tracking-[0.25em] font-light text-[#27231F] group-hover:text-[#C6A66B] transition-colors uppercase">
                  AURELLE
                </span>
                <span className="block text-[8px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#81786F] font-light -mt-1">
                  Haute Joaillerie
                </span>
              </Link>
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-[#27231F] hover:text-[#C6A66B] transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-1.5 text-[#27231F] hover:text-[#C6A66B] transition-colors hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C6A66B] text-white text-[10px] font-medium flex items-center justify-center">
                    {totalWishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                href="/account"
                className="p-1.5 text-[#27231F] hover:text-[#C6A66B] transition-colors hidden sm:block"
                aria-label="Client Portal"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={toggleCart}
                className="relative p-1.5 text-[#27231F] hover:text-[#C6A66B] transition-colors"
                aria-label="Open shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#211E1A] text-white text-[10px] font-medium flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Drawer Component */}
      <CartDrawer />

      {/* 3. Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-[#211E1A]/60 backdrop-blur-xs z-[990]"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 inset-x-0 bg-[#FFFFFF] border-b border-[#E6DED3] z-[995] shadow-xl p-6 sm:p-10"
            >
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-[#E6DED3]">
                  <div className="flex items-center gap-3 flex-1">
                    <Search className="w-6 h-6 text-[#C6A66B]" />
                    <input
                      type="text"
                      placeholder="Search solitaire rings, emeralds, necklaces..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full text-lg sm:text-xl font-light text-[#27231F] placeholder-[#81786F] focus:outline-hidden bg-transparent"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-[#81786F] hover:text-[#27231F]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Quick suggestions or results */}
                <div className="mt-6">
                  {searchQuery.trim() ? (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#81786F] mb-3">
                        Matching Jewels ({searchResults.length})
                      </p>
                      {searchResults.length === 0 ? (
                        <p className="text-sm text-[#81786F] py-4">
                          No creations found matching &quot;{searchQuery}&quot;. Try exploring &quot;rings&quot; or &quot;diamond&quot;.
                        </p>
                      ) : (
                        <div className="divide-y divide-[#E6DED3]">
                          {searchResults.map((item) => (
                            <Link
                              key={item.id}
                              href={`/product/${item.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="py-3 flex items-center justify-between group hover:bg-[#F7F3ED] px-2 rounded-sm transition-colors"
                            >
                              <div>
                                <h4 className="font-serif-luxury text-base text-[#27231F] group-hover:text-[#C6A66B]">
                                  {item.name}
                                </h4>
                                <span className="text-xs text-[#81786F]">
                                  {item.material} • ₹{item.price.toLocaleString("en-IN")}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#81786F] group-hover:text-[#C6A66B] transition-transform group-hover:translate-x-1" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#81786F] mb-3">
                        Popular Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Solitaire Diamond", "Emerald Choker", "Tennis Bracelet", "Bridal Suite", "18K Gold Huggies"].map(
                          (tag) => (
                            <button
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="text-xs py-1.5 px-3 border border-[#E6DED3] text-[#27231F] hover:border-[#C6A66B] hover:text-[#C6A66B] transition-colors"
                            >
                              {tag}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#211E1A]/60 backdrop-blur-xs z-[990]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[#FFFFFF] border-r border-[#E6DED3] z-[999] flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E6DED3]">
                  <span className="font-serif-luxury text-2xl tracking-[0.2em] font-light text-[#27231F]">
                    AURELLE
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#81786F] hover:text-[#27231F]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif-luxury text-xl text-[#27231F] hover:text-[#C6A66B] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {/* Categories Quick Links */}
                  <div className="pt-3 pb-2 border-t border-[#E6DED3]/60">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-semibold mb-2.5">
                      Explore Categories
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#81786F]">
                      <Link href="/shop?category=rings" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Solitaire Rings
                      </Link>
                      <Link href="/shop?category=necklaces" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Necklaces
                      </Link>
                      <Link href="/shop?category=earrings" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Earrings
                      </Link>
                      <Link href="/shop?category=bracelets" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Tennis Bracelets
                      </Link>
                      <Link href="/shop?category=pendants" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Pendants
                      </Link>
                      <Link href="/shop?category=bridal" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#27231F]">
                        • Bridal Suites
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif-luxury text-lg text-[#27231F] hover:text-[#C6A66B] transition-colors flex items-center justify-between pt-1 border-t border-[#E6DED3]/60"
                  >
                    <span>Curated Wishlist</span>
                    {totalWishlistCount > 0 && (
                      <span className="text-xs bg-[#C6A66B] text-white px-2 py-0.5 rounded-full font-sans">
                        {totalWishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif-luxury text-lg text-[#27231F] hover:text-[#C6A66B] transition-colors"
                  >
                    Client Concierge Portal
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E6DED3] text-xs text-[#81786F] space-y-2">
                <p className="font-light">Private Appointments & Inquiries:</p>
                <p className="text-[#27231F] font-medium">+91 (0) 22 8900 4400</p>
                <p className="text-[11px] text-[#81786F]">concierge@aurelle-haute.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
