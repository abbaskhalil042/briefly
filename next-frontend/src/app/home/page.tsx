"use client";

import React, { useEffect } from "react";
import ComparisonCards from "@/components/ComparisonCards";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Spotlight } from "@/components/ui/Spotlight";
import StatHighlight from "@/components/StatHighlight";
import PlanCard from "@/components/PlanCard";
import DiagramWithSlogan from "@/components/DiagramWithSlogan";
import { AccordionDemo } from "@/components/Accordion";

const Page = () => {
  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex-col flex min-h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <StatHighlight />
      
      {/* Add id for scroll targeting if needed */}
      <div id="hero">
        <Hero />
      </div>
      <HowItWorks />
      <ComparisonCards />
      <DiagramWithSlogan />
      <PlanCard />
      <AccordionDemo />
    </div>
  );
};

export default Page;
