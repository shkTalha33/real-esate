"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function SettingsPage() {
  const router = useRouter();
  const isDesktop = useMediaQuery({ minWidth: 640 });

  useEffect(() => {
    // On desktop, redirect to account-details as the default page
    if (isDesktop) {
      router.replace("/settings/account-details");
    }
    // On mobile, the layout will show the MobileLayout menu instead
  }, [isDesktop, router]);

  // This component won't actually render on mobile (layout shows MobileLayout)
  // On desktop, it will redirect before rendering
  return null;
}
