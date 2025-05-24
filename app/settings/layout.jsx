"use client";
import DesktopLayout from "@/components/settings/desktopLayout";
import MobileLayout from "@/components/settings/mobileLayout";
import { useMediaQuery } from "react-responsive";

export default function layout({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isDesktop = useMediaQuery({ minWidth: 640 });
  return (
    <>
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout children={children} />}
    </>
  );
}
