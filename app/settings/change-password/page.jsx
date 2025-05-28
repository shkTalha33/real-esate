"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import {
  FiLock,
  FiSave,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ApiFunction from "@/components/api/apiFunction";
import { handleError } from "@/components/api/errorHandler";
import { setUserData } from "@/redux/slices/loginSlice";
import toast from "react-hot-toast";
import { changePassword } from "@/components/api/apiEndpoints";
const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Must contain at least one uppercase, one lowercase, one number and one special character"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ChangePassword() {
  const [isCurrentVisible, setIsCurrentVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const { put } = ApiFunction()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const newPassword = watch("newPassword", "");
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[@$!%*?&]/.test(newPassword);
  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  const onSubmit = (data) => {
    const apiData = {
      newPassword: data?.newPassword,
      oldPassword: data?.currentPassword,
    }
    setIsLoading(true)
    put(changePassword, apiData)
      .then((result) => {
        if (result?.success) {
          dispatch(setUserData(result?.data));
          toast.success(result?.message);
          setValue("currentPassword", "");
          setValue("newPassword", "");
          setValue("confirmPassword", "");
        }
      }).catch((err) => {
        handleError(err)
      }).finally(() => setIsLoading(false));
  };

  const toggleCurrentVisibility = () => setIsCurrentVisible(!isCurrentVisible);
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="mr-1" /> Back
        </p>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30">
              <FiLock className="text-xl text-brand-primary dark:text-brand-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Change Password
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create a strong and secure password to protect your account.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <Input
                {...register("currentPassword")}
                label="Current Password"
                placeholder="Enter your current password"
                isInvalid={!!errors.currentPassword}
                errorMessage={errors.currentPassword?.message}
                variant="bordered"
                labelPlacement="outside"
                fullWidth
                size="lg"
                type={isCurrentVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleCurrentVisibility}
                  >
                    {isCurrentVisible ? (
                      <FiEyeOff className="text-xl text-gray-500 dark:text-gray-400" />
                    ) : (
                      <FiEye className="text-xl text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                }
                classNames={{
                  input: [
                    "dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                    "pr-10",
                  ],
                  inputWrapper: [
                    "bg-white dark:bg-gray-700",
                    "border border-gray-300 dark:border-gray-600",
                    "hover:border-brand-primary/50 dark:hover:border-brand-accent/50",
                    "focus-within:border-brand-primary dark:focus-within:border-brand-accent",
                    "focus-within:ring-1 focus-within:ring-brand-primary/30 dark:focus-within:ring-brand-accent/30",
                    "transition-all duration-200",
                    "rounded-xl",
                    "px-3",
                  ],
                  label: [
                    "text-gray-700 dark:text-gray-300",
                    "text-sm",
                    "font-medium",
                    "mb-1",
                  ],
                  errorMessage: ["text-red-500", "text-sm", "mt-1"],
                }}
              />

              <Divider className="my-6" />

              <div className="space-y-4">
                <Input
                  {...register("newPassword")}
                  label="New Password"
                  placeholder="Create a new password"
                  isInvalid={!!errors.newPassword}
                  errorMessage={errors.newPassword?.message}
                  variant="bordered"
                  labelPlacement="outside"
                  fullWidth
                  size="lg"
                  type={isNewVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleNewVisibility}
                    >
                      {isNewVisible ? (
                        <FiEyeOff className="text-xl text-gray-500 dark:text-gray-400" />
                      ) : (
                        <FiEye className="text-xl text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                  }
                  classNames={{
                    input: [
                      "dark:text-white",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                      "pr-10",
                    ],
                    inputWrapper: [
                      "bg-white dark:bg-gray-700",
                      "border border-gray-300 dark:border-gray-600",
                      "hover:border-brand-primary/50 dark:hover:border-brand-accent/50",
                      "focus-within:border-brand-primary dark:focus-within:border-brand-accent",
                      "focus-within:ring-1 focus-within:ring-brand-primary/30 dark:focus-within:ring-brand-accent/30",
                      "transition-all duration-200",
                      "rounded-xl",
                      "px-3",
                    ],
                    label: [
                      "text-gray-700 dark:text-gray-300",
                      "text-sm",
                      "font-medium",
                      "mb-1",
                    ],
                    errorMessage: ["text-red-500", "text-sm", "mt-1"],
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div
                    className={`flex items-center ${hasMinLength ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {hasMinLength ? (
                      <FiCheck className="mr-2 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    At least 8 characters
                  </div>
                  <div
                    className={`flex items-center ${hasUppercase ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {hasUppercase ? (
                      <FiCheck className="mr-2 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Uppercase letter
                  </div>
                  <div
                    className={`flex items-center ${hasLowercase ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {hasLowercase ? (
                      <FiCheck className="mr-2 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Lowercase letter
                  </div>
                  <div
                    className={`flex items-center ${hasNumber ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {hasNumber ? (
                      <FiCheck className="mr-2 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Number
                  </div>
                  <div
                    className={`flex items-center ${hasSpecialChar ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    {hasSpecialChar ? (
                      <FiCheck className="mr-2 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Special character (@$!%*?&)
                  </div>
                </div>
              </div>

              <Divider className="my-6" />

              <Input
                {...register("confirmPassword")}
                label="Confirm New Password"
                placeholder="Confirm your new password"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                size="lg"
                type={isConfirmVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleConfirmVisibility}
                  >
                    {isConfirmVisible ? (
                      <FiEyeOff className="text-xl text-gray-500 dark:text-gray-400" />
                    ) : (
                      <FiEye className="text-xl text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                }
                classNames={{
                  input: [
                    "dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                    "pr-10",
                  ],
                  inputWrapper: [
                    "bg-white dark:bg-gray-700",
                    "border border-gray-300 dark:border-gray-600",
                    "hover:border-brand-primary/50 dark:hover:border-brand-accent/50",
                    "focus-within:border-brand-primary dark:focus-within:border-brand-accent",
                    "focus-within:ring-1 focus-within:ring-brand-primary/30 dark:focus-within:ring-brand-accent/30",
                    "transition-all duration-200",
                    "rounded-xl",
                    "px-3",
                  ],
                  label: [
                    "text-gray-700 dark:text-gray-300",
                    "text-sm",
                    "font-medium",
                    "mb-1",
                  ],
                  errorMessage: ["text-red-500", "text-sm", "mt-1"],
                }}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isLoading}
                isDisabled={!isPasswordValid || !!errors.confirmPassword}
                startContent={!isLoading && <FiSave className="text-lg" />}
                className="min-w-[120px] font-medium"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
