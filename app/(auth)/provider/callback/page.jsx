"use client";
import { setLogin, setUserData } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthCallback() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const user = params.get("user");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(setUserData(user));
      dispatch(setLogin(true));
      router.push("/");
    } else {
      console.error("Authentication failed - missing tokens");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <div className="w-16 h-16 border-4 border-t-brand-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">
          Authentication in progress...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we complete your authentication
        </p>
      </div>
    </div>
  );
}
