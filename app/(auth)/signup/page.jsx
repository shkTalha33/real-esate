"use client";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Form, Select, SelectItem } from "@/components/ui/index";
import { Button } from "@/components/ui/index";
import toast from "react-hot-toast";
import { house14 } from "@/public/assets/images";
import Image from "next/image";
import {
  HiOutlineMail,
  HiOutlineUser,
  LuFacebook,
  LuGithub,
  MdOutlineRemoveRedEye,
  RiEyeCloseLine,
  SiGoogle,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlineLocationMarker,
} from "@/public/assets/icons/index";
import { Divider } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { countriesWithCities } from "@/data/countriesCities";
import { signup } from "@/components/api/apiEndpoints";
import { handleError } from "@/components/api/errorHandler";
import ApiFunction from "@/components/api/apiFunction";

export default function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { post } = ApiFunction();

  // Fix for hydration errors - only run client-side code after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only handle URL params after component is mounted on client
  useEffect(() => {
    if (!isMounted) return;

    const error = searchParams.get("error");
    if (error) {
      const timer = setTimeout(() => {
        toast.error(decodeURIComponent(error));

        // Clean up URL after showing error
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("error");
          window.history.replaceState({}, "", url);
        }
      }, 100); // Small delay to ensure client hydration completes

      return () => clearTimeout(timer);
    }
  }, [searchParams, isMounted]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be 10 to 15 digits and only numbers"
      ),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password cannot exceed 30 characters")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // This will validate on change
  });

  // Watch the password field to trigger confirmPassword validation when password changes
  const password = watch("password");
  const selectedCountryWatch = watch("country");

  // Update available cities when country changes
  useEffect(() => {
    if (selectedCountryWatch) {
      setSelectedCountry(selectedCountryWatch);
      setAvailableCities(
        countriesWithCities[selectedCountryWatch]?.cities || []
      );
      setCountryCode(countriesWithCities[selectedCountryWatch]?.code || "");
      setCountryFlag(countriesWithCities[selectedCountryWatch]?.flag || "");
      // Reset city value when country changes
      setValue("city", "");
      // Re-trigger validation for city field
      trigger("city");
    }
  }, [selectedCountryWatch, setValue, trigger]);

  // Re-validate confirmPassword when password changes
  useEffect(() => {
    if (password) {
      trigger("confirmPassword");
    }
  }, [password, trigger]);

  const onSubmit = async (data) => {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...submitData } = data;
    setIsLoading("email");
    await post(signup, submitData)
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          router.push("/login");
        }
      })
      .catch((err) => {
        handleError(err);
      })
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
    <div className="min-h-screen signup bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-gray-900">
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
                Join Our Community
              </h2>
              <p className="text-white/90 text-lg">
                Create an account to access exclusive properties and
                personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center w-full p-2 md:p-6">
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
            <div className="mb-4 text-center">
              <h1 className="text-[2.25rem] roboto_bold text-brand-primary mb-1">
                Create Account
              </h1>
              <p className="text-gray-500 poppins_medium text-base dark:text-gray-400">
                Sign up to discover your dream property
              </p>
            </div>

            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-3"
            >
              {/* Username */}
              <Controller
                control={control}
                name="username"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      endContent={
                        <HiOutlineUser className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Username"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Enter Username"
                      value={value || ""}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    />
                  </div>
                )}
              />

              {/* Full Name */}
              <Controller
                control={control}
                name="fullname"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      endContent={
                        <HiOutlineUser className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Full Name"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Enter Full Name"
                      value={value || ""}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    />
                  </div>
                )}
              />

              {/* Email */}
              <Controller
                control={control}
                name="email"
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
                      label="Email"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Enter Email"
                      value={value || ""}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    />
                  </div>
                )}
              />
              {/* Country */}
              <Controller
                control={control}
                name="country"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Select
                      endContent={
                        <HiOutlineGlobe className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Country"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Select Country"
                      selectedKeys={value ? [value] : []}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    >
                      {Object.keys(countriesWithCities).map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              />

              {/* City */}
              <Controller
                control={control}
                name="city"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Select
                      endContent={
                        <HiOutlineLocationMarker className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="City"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Select City"
                      selectedKeys={value ? [value] : []}
                      isDisabled={!selectedCountry}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                    >
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              />

              {/* Phone */}
              <Controller
                control={control}
                name="phone"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      startContent={
                        <div className="flex items-center">
                          <span className="mr-1">{countryFlag}</span>
                          <span className="text-small text-default-400 pr-1 border-r border-default-200">
                            {countryCode || "+xx"}
                          </span>
                        </div>
                      }
                      endContent={
                        <HiOutlinePhone className="text-brand-muted text-lg" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Phone Number"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="md"
                      placeholder="Enter Phone Number"
                      value={value || ""}
                      className="dark:text-white text-gray-800 w-full focus:border-brand-primary"
                      disabled={!countryCode}
                    />
                    {!countryCode && (
                      <span className="text-xs text-amber-500">
                        Select a country first to enable phone input
                      </span>
                    )}
                  </div>
                )}
              />

              {/* Password */}
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
                      onChange={(e) => {
                        onChange(e);
                        // Explicitly trigger confirmPassword validation when password changes
                        setTimeout(() => trigger("confirmPassword"), 0);
                      }}
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      endContent={
                        <div
                          onClick={toggleVisibility}
                          className="cursor-pointer"
                        >
                          {isVisible ? (
                            <RiEyeCloseLine className="text-lg text-brand-primary dark:text-brand-accent" />
                          ) : (
                            <MdOutlineRemoveRedEye className="text-lg text-brand-primary dark:text-brand-accent" />
                          )}
                        </div>
                      }
                      labelPlacement="outside"
                      value={value || ""}
                      className="dark:text-white text-gray-800 rounded-medium focus:border-brand-primary"
                    />
                  </div>
                )}
              />

              {/* Confirm Password */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-1 w-full">
                    <Input
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Confirm Password"
                      name={name}
                      size="md"
                      onChange={onChange}
                      type={isConfirmVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      endContent={
                        <div
                          onClick={toggleConfirmVisibility}
                          className="cursor-pointer"
                        >
                          {isConfirmVisible ? (
                            <RiEyeCloseLine className="text-lg text-brand-primary dark:text-brand-accent" />
                          ) : (
                            <MdOutlineRemoveRedEye className="text-lg text-brand-primary dark:text-brand-accent" />
                          )}
                        </div>
                      }
                      labelPlacement="outside"
                      value={value || ""}
                      className="dark:text-white text-gray-800 rounded-medium focus:border-brand-primary"
                    />
                  </div>
                )}
              />

              {/* Submit Button */}
              <Button
                isLoading={isLoading === "email"}
                loadingText="Creating account..."
                type="submit"
                className="w-full bg-brand-warning hover:bg-brand-warningdark text-white nunito_medium text-[1rem] py-2 rounded-medium transition-all duration-300 hover:shadow-lg mt-2"
                disabled={isLoading}
              >
                Create Account
              </Button>

              <Divider
                orientation="center"
                style={{ borderColor: "#FBFBFB" }}
                className="dark:text-gray-500 text-brand-black poppins_medium !text-[1.2rem] my-2"
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
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-brand-primary dark:text-brand-accent nunito_medium hover:underline"
                  >
                    Sign In
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
