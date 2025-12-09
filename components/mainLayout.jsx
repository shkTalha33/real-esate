"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavHeader from "@/components/navHeader";
import Footer from "./footer";
import MobileBottomNav from "./MobileBottomNav";

export default function MainLayout({ children }) {
  const pathname = usePathname();

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
    "/settings/my-listings",
    "/settings/add-listing",
  ];

  // Auth pages that don't need bottom padding
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(pathname);

  return (
    <div>
      <div className={`relative flex flex-col h-screen`}>
        {!headerLessRoutes.includes(pathname) && <NavHeader />}
        <main className={`w-full mx-auto ${isAuthPage ? "" : "pb-16 sm:pb-0"}`}>
          {children}
        </main>
        <MobileBottomNav />
        {!headerLessRoutes.includes(pathname) && <Footer />}
      </div>
    </div>
  );
}
