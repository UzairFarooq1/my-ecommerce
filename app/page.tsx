import { HeroSection } from "@/components/hero-section";
import { FeaturedCategories } from "@/components/featured-categories";
import { NewArrivals } from "@/components/new-arrivals";
import { Newsletter } from "@/components/newsletter";
import { PromoSection } from "@/components/promo-section";
import { FeaturedCollection } from "@/components/featured-collection";
import { Testimonials } from "@/components/testimonials";
import { BrandSection } from "@/components/brand-section-colored";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
      <PromoSection />
      <FeaturedCollection />
      <Testimonials />
      <BrandSection />
      <Newsletter />
    </div>
  );
}
