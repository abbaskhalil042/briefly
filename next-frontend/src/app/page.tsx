"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();

  const handelClick = () => {
    router.push("https://github.com/abbaskhalil042");
  };
  return (
    <div className="font-quicksand">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In saepe quam
      ipsam odio rem eius est corrupti placeat facere distinctio sunt, minus
      nam, fugit ullam dicta corporis omnis! Iure, cum.
    </div>
  );
};

export default Home;
