"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration);

          // Check for updates
          registration.update();

          // Listen for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            console.log("🔄 New Service Worker found");

            newWorker?.addEventListener("statechange", () => {
              if (newWorker.state === "activated") {
                console.log("✅ New Service Worker activated");
              }
            });
          });
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
