"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { SlidersHorizontal, X, RotateCcw, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const materials = ["18K Yellow Gold", "18K Rose Gold", "Platinum 950"];
const occasions = [
  { id: "wedding", name: "Wedding & Bridal" },
  { id: "anniversary", name: "Anniversary" },
  { id: "birthday-gifts", name: "Birthday Gifts" },
  { id: "festive", name: "Festive Jewellery" },
];

const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "under-75k", label: "Under ₹75,000", min: 0, max: 75000 },
  { id: "75k-150k", label: "₹75,000 - ₹1,50,000", min: 75000, max: 150000 },
  { id: "150k-250k", label: "₹1,50,000 - ₹2,50,000", min: 150000, max: 250000 },
  { id: "above-250k", label: "Above ₹2,50,000", min: 250000, max: Infinity },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get values from URL query parameters
  const queryCategory = searchParams.get("category");
  const queryOccasion = searchParams.get("occasion");
  const querySort = searchParams.get("sort");
  const initialCollection = searchParams.get("collection") || "";

  const [userCategory, setUserCategory] = useState(null);
  const [userMaterial, setUserMaterial] = useState("all");
  const [userPriceRange, setUserPriceRange] = useState("all");
  const [userOccasion, setUserOccasion] = useState(null);
  const [userSort, setUserSort] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedCategory = userCategory !== null ? userCategory : (queryCategory || "all");
  const selectedMaterial = userMaterial;
  const selectedPriceRange = userPriceRange;
  const selectedOccasion = userOccasion !== null ? userOccasion : (queryOccasion || "");
  const sortBy = userSort !== null ? userSort : (querySort || "featured");

  const setSelectedCategory = setUserCategory;
  const setSelectedMaterial = setUserMaterial;
  const setSelectedPriceRange = setUserPriceRange;
  const setSelectedOccasion = setUserOccasion;
  const setSortBy = setUserSort;

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== "all" && !item.material.includes(selectedMaterial)) {
        return false;
      }

      // Occasion filter
      if (selectedOccasion && item.occasion !== selectedOccasion) {
        return false;
      }

      // Collection filter from query
      if (initialCollection && item.collection !== initialCollection) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "all") {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range && (item.price < range.min || item.price > range.max)) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedMaterial,
    selectedOccasion,
    selectedPriceRange,
    initialCollection,
  ]);

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "bestseller") {
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [filteredProducts, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedMaterial !== "all" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0) +
    (selectedOccasion ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSelectedPriceRange("all");
    setSelectedOccasion("");
    setSortBy("featured");
    router.push("/shop");
  };

  return (
    <div className="bg-[#F7F3ED] min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="border-b border-[#E6DED3] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <Breadcrumbs items={[{ label: "The Collections" }]} />
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#27231F] font-normal tracking-tight mt-2 mb-3">
            {initialCollection
              ? `${initialCollection} Collection`
              : "Fine Jewellery Catalogue"}
          </h1>
          <p className="text-sm sm:text-base text-[#81786F] font-light max-w-xl mx-auto leading-relaxed">
            Meticulously sculpted in hallmarked 18K gold and adorned with natural or ethically created diamonds, each piece reflects eternal elegance.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar (Product Count, Mobile Filter Trigger, Sort Select) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#E6DED3] gap-3 sm:gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 py-2 px-3 border border-[#27231F] text-[#27231F] text-[11px] sm:text-xs uppercase tracking-widest font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#81786F]">
              Showing <span className="text-[#27231F] font-medium">{sortedProducts.length}</span> Creations
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] sm:text-xs text-[#81786F] hover:text-[#27231F] flex items-center gap-1 transition-colors underline underline-offset-4"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
            <div className="relative flex items-center ml-auto sm:ml-0">
              <label htmlFor="sort-select" className="text-[11px] sm:text-xs uppercase tracking-wider text-[#81786F] mr-1.5 sm:mr-2">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-medium text-[#27231F] bg-[#FFFFFF] border border-[#E6DED3] py-2 pl-2.5 pr-7 rounded-none focus:outline-hidden focus:border-[#C6A66B] appearance-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="bestseller">Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#81786F] absolute right-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            {/* Category Filter */}
            <div>
              <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium pb-2 border-b border-[#E6DED3] mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block text-xs uppercase tracking-wider text-left w-full py-1 transition-colors ${
                    selectedCategory === "all"
                      ? "text-[#C6A66B] font-semibold"
                      : "text-[#81786F] hover:text-[#27231F]"
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category === c.slug).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`block text-xs uppercase tracking-wider text-left w-full py-1 transition-colors ${
                        selectedCategory === c.slug
                          ? "text-[#C6A66B] font-semibold"
                          : "text-[#81786F] hover:text-[#27231F]"
                      }`}
                    >
                      {c.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium pb-2 border-b border-[#E6DED3] mb-4">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`block text-xs tracking-wide text-left w-full py-1 transition-colors ${
                      selectedPriceRange === range.id
                        ? "text-[#C6A66B] font-semibold"
                        : "text-[#81786F] hover:text-[#27231F]"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div>
              <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium pb-2 border-b border-[#E6DED3] mb-4">
                Precious Metal
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMaterial("all")}
                  className={`block text-xs uppercase tracking-wider text-left w-full py-1 transition-colors ${
                    selectedMaterial === "all"
                      ? "text-[#C6A66B] font-semibold"
                      : "text-[#81786F] hover:text-[#27231F]"
                  }`}
                >
                  All Metals
                </button>
                {materials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`block text-xs tracking-wide text-left w-full py-1 transition-colors ${
                      selectedMaterial === mat
                        ? "text-[#C6A66B] font-semibold"
                        : "text-[#81786F] hover:text-[#27231F]"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <h3 className="font-serif-luxury text-lg text-[#27231F] font-medium pb-2 border-b border-[#E6DED3] mb-4">
                Occasion
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedOccasion("")}
                  className={`block text-xs uppercase tracking-wider text-left w-full py-1 transition-colors ${
                    selectedOccasion === ""
                      ? "text-[#C6A66B] font-semibold"
                      : "text-[#81786F] hover:text-[#27231F]"
                  }`}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`block text-xs tracking-wide text-left w-full py-1 transition-colors ${
                      selectedOccasion === occ.id
                        ? "text-[#C6A66B] font-semibold"
                        : "text-[#81786F] hover:text-[#27231F]"
                    }`}
                  >
                    {occ.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#E6DED3] p-12 text-center">
                <h3 className="font-serif-luxury text-2xl text-[#27231F] mb-3">
                  No Matching Creations
                </h3>
                <p className="text-sm text-[#81786F] max-w-md mx-auto mb-6 font-light">
                  We could not find any jewellery matching your chosen filter criteria. Try clearing some filters to explore our full atelier.
                </p>
                <button
                  onClick={resetFilters}
                  className="py-3 px-8 bg-[#211E1A] hover:bg-[#C6A66B] text-white text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Filter Drawer for Mobile */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#211E1A]/60 backdrop-blur-xs z-[990]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#FFFFFF] border-l border-[#E6DED3] z-[999] flex flex-col justify-between shadow-2xl"
            >
              <div className="p-5 border-b border-[#E6DED3] flex items-center justify-between">
                <h2 className="font-serif-luxury text-xl font-medium tracking-wide">
                  Filter Creations
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-[#81786F] hover:text-[#27231F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Category */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-medium text-[#27231F] mb-3">
                    Category
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`py-2 px-3 text-xs border text-center ${
                        selectedCategory === "all"
                          ? "border-[#C6A66B] bg-[#C6A66B] text-white"
                          : "border-[#E6DED3] text-[#27231F]"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`py-2 px-3 text-xs border text-center ${
                          selectedCategory === c.slug
                            ? "border-[#C6A66B] bg-[#C6A66B] text-white"
                            : "border-[#E6DED3] text-[#27231F]"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-medium text-[#27231F] mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-1.5">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setSelectedPriceRange(range.id)}
                        className={`w-full py-2 px-3 text-xs border text-left flex justify-between items-center ${
                          selectedPriceRange === range.id
                            ? "border-[#C6A66B] bg-[#C6A66B]/10 text-[#27231F] font-semibold"
                            : "border-[#E6DED3] text-[#81786F]"
                        }`}
                      >
                        <span>{range.label}</span>
                        {selectedPriceRange === range.id && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metal */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-medium text-[#27231F] mb-3">
                    Precious Metal
                  </h4>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedMaterial("all")}
                      className={`w-full py-2 px-3 text-xs border text-left ${
                        selectedMaterial === "all"
                          ? "border-[#C6A66B] bg-[#C6A66B]/10 font-semibold text-[#27231F]"
                          : "border-[#E6DED3] text-[#81786F]"
                      }`}
                    >
                      All Metals
                    </button>
                    {materials.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`w-full py-2 px-3 text-xs border text-left ${
                          selectedMaterial === mat
                            ? "border-[#C6A66B] bg-[#C6A66B]/10 font-semibold text-[#27231F]"
                            : "border-[#E6DED3] text-[#81786F]"
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-5 border-t border-[#E6DED3] bg-[#F7F3ED] flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 border border-[#27231F] text-xs uppercase tracking-widest font-medium text-[#27231F]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#211E1A] text-white text-xs uppercase tracking-widest font-medium"
                >
                  Show Results ({sortedProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
