import { HeroSection } from "@/sections/hero-section";
import { StatementSection } from "@/sections/statement-section";
import { CollectionsSection } from "@/sections/collections-section";
import { FeaturedSection } from "@/sections/featured-section";
import { CraftsmanshipSection } from "@/sections/craftsmanship-section";
import { RatesSection } from "@/sections/rates-section";
import { CustomDesignSection } from "@/sections/custom-design-section";
import { AboutSection } from "@/sections/about-section";
import { PatternDivider } from "@/components/pattern-divider";
import { CatalogueSection } from "@/sections/catalogue-section";
import { VisitSection } from "@/sections/visit-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatementSection />
      <CollectionsSection />
      <FeaturedSection />
      <CatalogueSection />
      <CraftsmanshipSection />
      <RatesSection />
      <CustomDesignSection />
      <AboutSection />
      <PatternDivider />
      <VisitSection />
    </main>
  );
}
