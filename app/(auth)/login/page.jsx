"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Form, Button, Divider } from "@/components/ui/index";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { house14 } from "@/public/assets/images";
import Image from "next/image";
import {
  HiOutlineMail,
  LuFacebook,
  LuGithub,
  MdOutlineRemoveRedEye,
  RiEyeCloseLine,
  SiGoogle,
} from "@/public/assets/icons/index";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
  });

  const onSubmit = (data) => {
    console.log("data", data);
    const response = fetch("http://localhost:8000/api/v1/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("response", response);
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) {
      toast.error(firstError);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white dark:from-brand-dark dark:to-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative hidden md:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 to-brand-secondary/40 z-10"></div>
          <Image
            src={house14}
            alt="Luxury Real Estate"
            fill
            className="object-cover transition-transform duration-3000 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-10">
            <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl shadow-2xl border border-white/20 max-w-md">
              <h2 className="text-4xl poppins_semibold text-white mb-4">
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
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
            <div className="mb-8 text-center">
              <h1 className="text-[1.5rem] md:text-4xl roboto_bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to continue to your account
              </p>
            </div>

            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              <Controller
                control={control}
                name="identifier"
                render={({
                  field: { name, value, onChange },
                  fieldState: { invalid, error },
                }) => (
                  <div className="space-y-2 w-full">
                    <Input
                      endContent={
                        <HiOutlineMail className="text-brand-primary dark:text-brand-accent text-xl" />
                      }
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Email or Username"
                      name={name}
                      onChange={onChange}
                      labelPlacement="outside"
                      size="lg"
                      placeholder="Enter Username or Email"
                      value={value}
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
                  <div className="space-y-2 w-full">
                    <Input
                      errorMessage={error?.message}
                      isInvalid={invalid}
                      label="Password"
                      name={name}
                      size="lg"
                      onChange={onChange}
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      endContent={
                        <div
                          onClick={toggleVisibility}
                          className="cursor-pointer"
                        >
                          {isVisible ? (
                            <RiEyeCloseLine className="text-2xl text-brand-primary dark:text-brand-accent" />
                          ) : (
                            <MdOutlineRemoveRedEye className="text-2xl text-brand-primary dark:text-brand-accent" />
                          )}
                        </div>
                      }
                      labelPlacement="outside"
                      value={value}
                      className="dark:text-white text-gray-800 rounded-medium focus:border-brand-primary"
                    />
                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-brand-primary dark:text-brand-accent hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r bg-brand-warning hover:bg-brand-warningdark text-white nunito_medium py-3 rounded-medium transition-all duration-300 hover:shadow-lg"
              >
                Sign In
              </Button>

              <Divider
                orientation="horizontal"
                title="Talha"
                className="text-white dark:bg-brand-secondary"
              />

              <div className="grid grid-cols-3 gap-3">
                {/* Facebook Button */}
                <Button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-medium transition-all gap-1 duration-300 hover:shadow-md">
                  <LuFacebook size={20} />
                  Facebook
                </Button>

                {/* GitHub Button */}
                <Button className="flex items-center justify-center bg-black hover:bg-gray-900 text-white p-3 rounded-medium transition-all gap-1 duration-300 hover:shadow-md">
                  <LuGithub size={20} />
                  Github
                </Button>

                {/* Google Button */}
                <Button className="flex items-center gap-1 justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded-medium transition-all duration-300 hover:shadow-md">
                  <SiGoogle size={18} />
                  Google
                </Button>
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-brand-primary dark:text-brand-accent nunito_medium hover:underline"
                  >
                    Create Account
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
