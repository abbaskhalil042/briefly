// app/home/layout.tsx
"use client";
import Navbar from "@/components/Navbar";
import AuthenticatedRoute from "@/auth/AuthenticatedRoute";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedRoute>
      <Navbar />
      {children}
  
    </AuthenticatedRoute>
  );
}
