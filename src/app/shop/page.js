import { Suspense } from "react";
import ShopContent from "./ShopContent";

export const metadata = {
  title: "Shop All Creations | AURELLE Haute Joaillerie",
  description:
    "Explore the complete collection of AURELLE fine jewellery. Handcrafted rings, necklaces, earrings, and bracelets in 18K gold and diamonds.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F7F3ED]">
          <div className="font-serif-luxury text-xl text-[#81786F] animate-pulse">
            Loading AURELLE Collection...
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
