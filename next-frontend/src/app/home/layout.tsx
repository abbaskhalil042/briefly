// app/home/layout.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthenticatedRoute from "@/auth/AuthenticatedRoute";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedRoute>
      <div className="overflow-hidden">
      <Navbar />
      {children}
      <Footer />
      </div>
    </AuthenticatedRoute>
  );
}
