"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";
import { motion } from "motion/react";
import { AlignRight, Loader2, Upload, Wallet, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [loading, _setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const handleOpenClose = () => setIsOpen(!isOpen);
  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-4 py-2 "
    >
      <div>
        <Link href="/home">
          <div className="relative w-8 h-8 bg-white rounded-xl bg-blend-color-burn flex items-center">
            <Image
              src="https://patinaco.s3.ap-south-1.amazonaws.com/logo.png"
              alt="logo"
              width={100}
              height={100}
              // fill
              className="object-contain cursor-pointer "
            />
          </div>
        </Link>
      </div>
      <div className="bg-black hidden  lg:flex gap-2 fixed left-[40%] top-3 rounded-full border px-3 py-1.5">
        <ul className="flex gap-2 transition-all">
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home">Home</Link>
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home/summary">Summary</Link>
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home/pricing">Pricing</Link>
          </li>
        </ul>
      </div>
      {/* // for mobile */}

      <div
        className={`bg-black ${
          isOpen ? "flex translate-x-0" : " hidden translate-x-full"
        } lg:hidden flex-col h-[100dvh] w-full gap-2 fixed left-0 top-0`}
      >
        <div>
          {isOpen && (
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleOpenClose}
            />
          )}
        </div>
        <ul className="flex mt-10 gap-2 transition-all flex-col justify-center items-center">
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home">Home</Link>
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home/summary">Summary</Link>
          </li>
          <li className="cursor-pointer text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white hover:shadow-md hover:scale-105">
            <Link href="/home/pricing">Pricing</Link>
          </li>
          {user ? (
            <div className="w-full mt-4">
              <Button
                disabled={loading}
                className="cursor-pointer bg-black text-white border hover:bg-[#0c0c0c] 
             m-auto w-full  hover:text-white transition-all duration-300"
                onClick={logout}
              >
                Logout {loading ? <Loader2 className="animate-spin" /> : ""}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 mt-4">
              <Button className="cursor-pointer bg-white border hover:bg-gray-200 hover:text-black transition-all duration-300">
                Login
              </Button>
              <Button className="cursor-pointer bg-black text-white border hover:bg-[#0c0c0c] hover:text-white transition-all duration-300">
                Sign Up
              </Button>
            </div>
          )}
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
            <Link href="/home/upload">
              <Button className="text-base px-2 py-3 cursor-pointer">
                <Upload className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        {user ? (
          <>
            <Button
              disabled={loading}
              className="cursor-pointer bg-black 
              hidden lg:flex text-white border hover:bg-[#0c0c0c] hover:text-white transition-all duration-300"
              onClick={logout}
            >
              Logout {loading ? <Loader2 className="animate-spin" /> : ""}
            </Button>

            {!isOpen && (
              <AlignRight
                className="lg:hidden  cursor-pointer"
                onClick={handleOpenClose}
              />
            )}
          </>
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
