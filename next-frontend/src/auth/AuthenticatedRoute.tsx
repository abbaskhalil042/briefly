"use client";
import { useAuth } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/login");
      } else if (pathname === "/") {
        router.push("/home");
      }
    }
  }, [token, pathname, router, loading]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );

  return <>{children}</>;
};

export default AuthenticatedRoute;
