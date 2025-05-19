"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import { motion } from "motion/react";
import { Loader2, Wallet } from "lucide-react";

const Navbar = () => {
  const [loading, setLoading] = React.useState(false);
  const { user, logout } = useAuth();
  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-4 py-2 "
    >
      <div>
        <div className="relative w-8 h-8 bg-white rounded-xl bg-blend-color-burn">
          <Image
            src="https://patinaco.s3.ap-south-1.amazonaws.com/logo.png"
            alt="logo"
            fill
            className="object-cover cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-black hidden  lg:flex gap-2 fixed left-[40%] top-3 rounded-full border px-3 py-1.5">
        <ul className="flex gap-2 transition-all">
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            Home
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            Summary
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            Pricing
          </li>
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        {user && (
          <div className="flex gap-2 items-center">
            <h1 className="text-sm flex gap-2 items-center border p-2 rounded-full">
              <Wallet className="w-4 h-4" />
              <span className="text-[#f3f3ac] font-bold"> {user?.credits}</span>
            </h1>
            <h1 className="text-sm">Hello, {user?.email.split("@")[0]}</h1>
          </div>
        )}

        {user ? (
          <Button
            disabled={loading}
            className="cursor-pointer bg-black text-white border hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
            onClick={logout}
          >
            Logout {loading ? <Loader2 className="animate-spin" /> : ""}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button className="cursor-pointer bg-white border hover:bg-gray-200 hover:text-black transition-all duration-300">
              Login
            </Button>
            <Button className="cursor-pointer bg-black text-white border hover:bg-[#0c0c0c] hover:text-white transition-all duration-300">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
