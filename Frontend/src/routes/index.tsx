import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  useEffect(() => {
    document.title = "Votera — Your Smart Election Guide";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </div>
  );
}
