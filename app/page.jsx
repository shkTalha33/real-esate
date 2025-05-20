"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Import components with dynamic loading for better performance
import Hero from "@/components/home/hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import TopSellers from "@/components/home/TopSellers";
import LatestProperties from "@/components/home/LatestProperties";
import RecentlySold from "@/components/home/RecentlySold";

export default function Home() {
  return (
    <main className="lg:container mx-auto">
      <Hero />
      <FeaturedProperties />
      <TopSellers />
      <LatestProperties />
      <RecentlySold />
    </main>
  );
}
