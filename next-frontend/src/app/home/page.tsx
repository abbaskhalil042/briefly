"use client";
import ComparisonCards from "@/components/ComparisonCards";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { Spotlight } from "@/components/ui/Spotlight";
import React, { useEffect } from "react";
import StatHighlight from "@/components/StatHighlight";
import PlanCard from "@/components/PlanCard";
import DiagramWithSlogan from "@/components/DiagramWithSlogan";
import { AccordionDemo } from "@/components/Accordion";

const page = () => {
  return (
    <div className="relative flex-col flex min-h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <StatHighlight />
      <Hero />

      <HowItWorks />
      <ComparisonCards />
      <DiagramWithSlogan />
      <PlanCard />
      <AccordionDemo />
    </div>
  );
};

export default page;
