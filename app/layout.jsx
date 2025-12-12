import "@/styles/globals.css";
import "@/styles/main.scss";
import clsx from "clsx";

import Providers from "./providers";

import MainLayout from "@/components/mainLayout";
import PWARegister from "@/components/PWARegister";
import { nunito, poppins, roboto } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  // ✅ PWA META
  manifest: "/manifest.json",
  applicationName: siteConfig.name,
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  mobileWebAppCapable: true,

  // icon set (update paths as needed)
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-512x512.png",
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable,
          roboto.variable,
          nunito.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <PWARegister />
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
