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
    <div className="flex flex-col gap-3.5 h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        <kbd className="mr-2 text-xl rounded border p-1">Next.js</kbd>
        starter with{" "}
        <kbd className="mr-2 text-xl rounded border p-1">Shadcn UI</kbd>
      </h1>
      <Button
        variant="default"
        className="w-1/4 cursor-pointer"
        onClick={handelClick}
      >
        <Github className="mr-2 h-4 w-4" />
        abbakhalil042
      </Button>
    </div>
  );
};

export default Home;
