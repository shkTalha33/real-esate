"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavHeader from "@/components/navHeader";
import Footer from "./footer";
import MobileBottomNav from "./MobileBottomNav";
import { useMediaQuery } from "react-responsive";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const headerLessRoutes = [
    "/login",
    "/signup",
    "/provider/callback",
    "/settings",
    "/settings/account-details",
    "/settings/change-email",
    "/settings/change-username",
    "/settings/change-password",
    "/settings/deactivate-account",
  ];
  return (
    <div>
      <div className={`relative flex flex-col h-screen`}>
        {!headerLessRoutes.includes(pathname) && <NavHeader />}
        <main className={`w-full mx-auto ${isMobile ? "pb-16" : ""}`}>
          {children}
        </main>
        <MobileBottomNav />
        {!headerLessRoutes.includes(pathname) && !isMobile && <Footer />}
      </div>
    </div>
  );
}
