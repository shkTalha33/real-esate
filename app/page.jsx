"use client";

// Import components with dynamic loading for better performance
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/hero";
import LatestProperties from "@/components/home/LatestProperties";
import RecentlySold from "@/components/home/RecentlySold";
import TopSellers from "@/components/home/TopSellers";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <main className="mx-auto">
      <Hero />
      <FeaturedProperties />
      {/* <TopSellers /> */}
      <LatestProperties />
      <RecentlySold />
    </main>
  );
}
