"use client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Login from "./login/page";

const Home = () => {
  const router = useRouter();

  const handelClick = () => {
    router.push("https://github.com/abbaskhalil042");
  };
  return (
    <div className="font-quicksand">
      <Login />
    </div>
  );
};

export default Home;
