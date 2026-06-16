import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedCars from "@/components/sections/FeaturedCars";
import Brands from "@/components/sections/Brands";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedCars />
      <Brands />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
