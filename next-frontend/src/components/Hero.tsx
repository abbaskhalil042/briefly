import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { FlipWords } from "./ui/flip-words";
import { motion } from "motion/react";
import Link from "next/link";
const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-20 py-[3.5rem] gap-10"
    >
      {/* Left Text Content */}
      {/* <div className=""> */}
      <div className="w-full md:w-2/3">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-left text-4xl font-bold text-transparent md:text-6xl leading-tight">
          Instantly Summarize <br /> Any PDF with Briefly
          <div className="text-3xl md:text-4xl mx-auto font-semibold text-neutral-800  leading-tight">
            Summarize&nbsp;
            <FlipWords
              className="text-[#FFFFE3]"
              words={["faster", "smarter", "effortlessly", "instantly"]}
            />
            <br />
            your PDFs with Briefly AI
          </div>
        </h1>
        <p className="mt-6 max-w-xl text-left text-base font-normal text-neutral-300">
          Tired of reading long documents? <strong>Briefly</strong> uses
          cutting-edge AI to distill entire PDFs into clear, actionable
          summaries — so you can save time and focus on what really matters.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/home/upload">
            <Button className="text-base px-6 py-3 cursor-pointer">Get Started</Button>
          </Link>
          <Button
            variant="outline"
            className="text-base px-6 py-3 border-white/20 text-white hover:bg-white/10"
          >
            View Demo
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src="https://tinywow.com/v3/img/tw-laptop.svg"
          alt="spotlight"
          width={800}
          height={800}
          className="object-cover rounded-2xl shadow-lg"
        />
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default Hero;
