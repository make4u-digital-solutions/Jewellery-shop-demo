import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestsellersSection from "@/components/home/BestsellersSection";
import FeaturedCampaign from "@/components/home/FeaturedCampaign";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import WhyChooseAurelle from "@/components/home/WhyChooseAurelle";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata = {
  title: "AURELLE | Fine Luxury Jewellery — Made to Be Kept",
  description: "Jewellery That Becomes Part of Your Story. Discover handcrafted rings, necklaces, earrings, and bridal jewellery in 18K gold and diamonds.",
};

export default function HomePage() {
  return (
    <>
      {/* 3. Hero section */}
      <HeroSection />

      {/* 4. Shop by Category */}
      <CategoryGrid />

      {/* 5. Bestsellers */}
      <BestsellersSection />

      {/* 6. Featured collection banner */}
      <FeaturedCampaign />

      {/* 7. New Arrivals */}
      <NewArrivalsSection />

      {/* 8. Our Story / Craftsmanship */}
      <CraftsmanshipSection />

      {/* 9. Shop by Occasion */}
      <ShopByOccasion />

      {/* 10. Why Choose AURELLE */}
      <WhyChooseAurelle />

      {/* 11. Customer testimonials */}
      <TestimonialsSection />

      {/* 12. Newsletter section */}
      <NewsletterSection />
    </>
  );
}
