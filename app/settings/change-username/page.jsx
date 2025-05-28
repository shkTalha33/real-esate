"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUser, FiSave, FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ApiFunction from "@/components/api/apiFunction";
import { updateUserName } from "@/components/api/apiEndpoints";
import { handleError } from "@/components/api/errorHandler";
import { setUserData } from "@/redux/slices/loginSlice";
import { useState } from "react";
import toast from "react-hot-toast";
const schema = yup.object().shape({
  // currentUsername: yup.string().required("Current username is required"),
  newUsername: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    )
    .required("New username is required")
    .notOneOf([yup.ref("currentUsername")], "New username must be different"),
});

export default function ChangeUsername() {
  const user = useSelector((state) => state.auth.userData);
  const { put } = ApiFunction()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentUsername: user?.username || '',
      newUsername: "",
    },
  });

  const newUsername = watch("newUsername");
  const isUsernameValid =
    newUsername?.length >= 3 &&
    newUsername?.length <= 20 &&
    /^[a-zA-Z0-9_]+$/.test(newUsername);

  const onSubmit = (data) => {
    const apiData = {
      username: data?.newUsername,
    }
    setIsLoading(true)
    put(updateUserName, apiData)
      .then((result) => {
        if (result?.success) {
          dispatch(setUserData(result?.data));
          toast.success(result?.message);
          setValue("currentUsername", data?.username);
          setValue("newUsername", "");
        }
      }).catch((err) => {
        handleError(err)
      }).finally(() => setIsLoading(false));
  };

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
              <FiUser className="text-xl text-brand-primary dark:text-brand-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Change Username
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose a new username for your account. This will be visible to
                other users.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <Input
                {...register("currentUsername")}
                label="Current Username"
                placeholder="Enter your current username"
                isInvalid={!!errors.currentUsername}
                errorMessage={errors.currentUsername?.message}
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                size="lg"
                isReadOnly
                classNames={{
                  input: [
                    "dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                  ],
                  inputWrapper: [
                    "bg-gray-100 dark:bg-gray-700/50",
                    "border border-gray-300 dark:border-gray-600",
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

              <div className="relative">
                <Input
                  {...register("newUsername")}
                  label="New Username"
                  placeholder="Enter a new username"
                  isInvalid={!!errors.newUsername}
                  errorMessage={errors.newUsername?.message}
                  variant="bordered"
                  labelPlacement="outside"
                  fullWidth
                  size="lg"
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
                {newUsername && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isUsernameValid ? (
                      <FiCheck className="text-green-500 text-xl" />
                    ) : (
                      <FiX className="text-red-500 text-xl" />
                    )}
                  </div>
                )}
              </div>

              {newUsername && (
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p
                    className={`flex items-center ${newUsername.length >= 3
                      ? "text-green-500"
                      : "text-gray-500"
                      }`}
                  >
                    {newUsername.length >= 3 ? (
                      <FiCheck className="mr-2" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    At least 3 characters
                  </p>
                  <p
                    className={`flex items-center ${newUsername.length <= 20
                      ? "text-green-500"
                      : "text-gray-500"
                      }`}
                  >
                    {newUsername.length <= 20 ? (
                      <FiCheck className="mr-2" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Maximum 20 characters
                  </p>
                  <p
                    className={`flex items-center ${/^[a-zA-Z0-9_]+$/.test(newUsername)
                      ? "text-green-500"
                      : "text-gray-500"
                      }`}
                  >
                    {/^[a-zA-Z0-9_]+$/.test(newUsername) ? (
                      <FiCheck className="mr-2" />
                    ) : (
                      <span className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2"></span>
                    )}
                    Letters, numbers, and underscores only
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isLoading}
                isDisabled={!isUsernameValid || !!errors.confirmUsername}
                startContent={!isLoading && <FiSave className="text-lg" />}
                className="min-w-[120px] font-medium"
              >
                {isLoading ? "Updating..." : "Update Username"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
