"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavHeader from "@/components/navHeader";
import Footer from "./footer";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const headerLessRoutes = ["/login", "/signup", "/provider/callback"];
  return (
    <div>
      <div className="relative flex flex-col h-screen">
        {!headerLessRoutes.includes(pathname) && <NavHeader />}
        <main className="w-full mx-auto">{children}</main>
        {!headerLessRoutes.includes(pathname) && <Footer />}
      </div>
    </div>
  );
}
