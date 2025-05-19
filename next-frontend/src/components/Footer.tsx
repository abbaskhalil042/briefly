"use client"
import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn button
import { useState } from "react";
import { Input } from "./ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className=" text-gray-400 py-8 px-6 w-full overflow-hidden">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-[#ffffcf] font-bold text-lg">Briefly</div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white"
          >
            <Twitter />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white"
          >
            <Github />
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-md mx-auto flex gap-2"
      >
        <Input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button type="submit" className="px-6">
          Subscribe
        </Button>
      </form>

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Briefly. All rights reserved.
      </div>
    </footer>
  );
}
