import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Votera — Your Smart Election Guide" },
      { name: "description", content: "AI-powered civic education platform. Learn about elections, voter registration, eligibility, and more." },
      { property: "og:title", content: "Votera — Your Smart Election Guide" },
      { property: "og:description", content: "AI-powered civic education platform helping citizens understand elections easily." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
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
