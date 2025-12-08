"use client";
import DesktopLayout from "@/components/settings/desktopLayout";
import MobileLayout from "@/components/settings/mobileLayout";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import NavHeader from "@/components/navHeader";

export default function layout({ children }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const isSettingsRoot = pathname === "/settings";

  return (
    <>
      {/* Mobile: Show menu at /settings root, show content on sub-pages */}
      {isMobile && isSettingsRoot && <MobileLayout />}
      {isMobile && !isSettingsRoot && (
        <>
          <NavHeader />
          <div className="min-h-screen bg-gray-50 dark:bg-brand-deepdark">
            {children}
          </div>
        </>
      )}

      {/* Desktop: Always show desktop layout with sidebar + content */}
      {isDesktop && <DesktopLayout children={children} />}
    </>
  );
}
