"use client";

import { ReduxProvider } from "@/redux/reduxProvider";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Providers({ children, themeProps }) {
  const router = useRouter();

  return (
    <ReduxProvider>
      <HeroUIProvider navigate={router.push}>
        <ToastProvider
          placement="top-center"
          toastProps={{
            radius: "sm",
            variant: "flat",
            timeout: 1000,
          }}
        />
        <Toaster />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </ReduxProvider>
  );
}
