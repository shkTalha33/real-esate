"use client";
import { login } from "@/components/api/apiEndpoints";
import ApiFunction from "@/components/api/apiFunction";
import { handleError } from "@/components/api/errorHandler";
import { Button, Form, Input } from "@/components/ui/index";
import {
  HiOutlineMail,
  LuGithub,
  MdOutlineRemoveRedEye,
  RiEyeCloseLine,
  SiGoogle,
} from "@/public/assets/icons/index";
import { house14 } from "@/public/assets/images";
import {
  setAccessToken,
  setLogin,
  setRefreshToken,
  setUserData,
} from "@/redux/slices/loginSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Cookies from "js-cookie";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const { post } = ApiFunction();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      const timer = setTimeout(() => {
        toast.error(decodeURIComponent(error));

        // Rebuild the current path without the error param
        const params = new URLSearchParams(searchParams.toString());
        params.delete("error");

        // Replace the current route without reloading the page
        router.replace(`?${params.toString()}`);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  const schema = Yup.object().shape({
    identifier: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading("email");
    await post(login, data)
      .then((response) => {
        if (response?.success) {
          dispatch(setLogin(true));
          dispatch(setAccessToken(response?.data?.accessToken));
          dispatch(setRefreshToken(response?.data?.refreshToken));
          Cookies.set("estate_loop_token", response?.data?.accessToken, {
            expires: 1,
          });
          localStorage.setItem(
            "estate_loop_token",
            response?.data?.accessToken
          );
          router.push("/");
          toast.success(response?.message);
        }
      })
      .catch((err) => handleError(err))
      .finally(() => setIsLoading(""));
  };

  // Modified error handler to prevent duplicate toasts
  const onError = (errors) => {
    console.error("Form validation errors:", errors);
  };

  // Handle social login by redirecting to the auth endpoints
  const handleSocialLogin = (provider) => {
    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(provider);

    if (typeof window !== "undefined") {
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/${provider}`;
    }
  };

  return (
    <div className="min-h-screen login bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative hidden md:block overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>

          {/* Image */}
          <Image
            src={house14}
            alt="Luxury Real Estate"
            fill
            className="object-cover transition-transform duration-3000 hover:scale-105"
            priority
          />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-10">
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl shadow-2xl border border-white/20 max-w-md">
              <h2 className="text-[2rem] poppins_semibold text-white mb-4">
                Find Your Dream Home
              </h2>
              <p className="text-white/90 text-lg">
                Discover premium properties with our exclusive real estate
                marketplace.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center w-full p-2 md:p-6">
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-4 text-center">
              <h1 className="text-[2.25rem] roboto_bold text-brand-primary mb-1">
                Welcome Back
              </h1>
              <p className="text-gray-500 poppins_medium text-base dark:text-gray-400">
                Sign in to continue to your account
              </p>
            </div>

            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-3"
            >
              <Controller
                control={control}
                name="identifier"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      endContent={
                        <HiOutlineMail className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Email or Username"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Enter Username or Email"
                      value={value || ""}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    />
                  </div>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Password"
                      name={name}
                      size="md"
                      onChange={onChange}
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      endContent={
                        <div
                          onClick={toggleVisibility}
                          className="cursor-pointer"
                        >
                          {isVisible ? (
                            <RiEyeCloseLine className="text-lg text-brand-muted " />
                          ) : (
                            <MdOutlineRemoveRedEye className="text-lg text-brand-muted " />
                          )}
                        </div>
                      }
                      labelPlacement="outside"
                      value={value || ""}
                      className="dark:text-white text-gray-800 rounded-medium focus:border-brand-primary"
                    />
                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-brand-muted hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                )}
              />

              {/* Submit Button */}
              <Button
                isLoading={isLoading === "email"}
                loadingText="Signing in..."
                type="submit"
                className="w-full bg-brand-warning hover:bg-brand-warningdark text-white nunito_medium text-[1rem] py-2 rounded-medium transition-all duration-300 hover:shadow-lg mt-2"
                disabled={isLoading}
              >
                Sign In
              </Button>

              <Divider
                orientation="center"
                style={{ borderColor: "#FBFBFB" }}
                className="dark:text-gray-500 h-1 text-brand-black poppins_medium text-lg my-2"
              >
                OR{" "}
              </Divider>

              <div className="flex flex-row gap-2 w-full">
                {/* GitHub Button */}
                {/* <Button
                  className={`w-full flex items-center justify-center bg-black ${
                    !isLoading ? "hover:bg-gray-900" : ""
                  } text-white p-2 rounded-medium transition-all gap-1 duration-300 hover:shadow-md disabled:opacity-50`}
                  onClick={() => handleSocialLogin("github")}
                  type="button"
                  isLoading={isLoading === "github"}
                  disabled={isLoading}
                >
                  <LuGithub className="text-[1rem]" />
                  <span className="poppins_medium text-sm">Github</span>
                </Button> */}

                {/* Google Button */}
                <Button
                  className={`w-full flex items-center justify-center bg-red-500 ${
                    !isLoading ? "hover:bg-red-600" : ""
                  } text-white p-2 rounded-medium transition-all gap-1 duration-300 hover:shadow-md disabled:opacity-50`}
                  onClick={() => handleSocialLogin("google")}
                  type="button"
                  isLoading={isLoading === "google"}
                  disabled={isLoading}
                >
                  <SiGoogle className="text-[1rem]" />
                  <span className="poppins_medium text-sm">Google</span>
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-brand-primary dark:text-brand-accent nunito_medium hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
