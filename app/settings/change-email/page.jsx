"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiMail, FiSave, FiArrowLeft } from "react-icons/fi";
import { Divider } from "antd";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  currentEmail: yup
    .string()
    .email("Invalid email")
    .required("Current email is required"),
  newEmail: yup
    .string()
    .email("Invalid email")
    .required("New email is required")
    .notOneOf(
      [yup.ref("currentEmail")],
      "New email must be different from current email"
    ),
});

export default function ChangeEmail() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentEmail: "john@example.com",
      newEmail: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="flex items-center text-sm text-gray-600 dark:text-gray-400 transition-colors cursor-pointer">
          <FiArrowLeft className="mr-1" onClick={() => router.back()} /> Back
        </p>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30">
              <FiMail className="text-xl text-brand-primary dark:text-brand-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Change Email Address
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your email address. We'll send you a verification link to
                your new email.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <Input
                {...register("currentEmail")}
                label="Current Email"
                placeholder="Enter your current email"
                isInvalid={!!errors.currentEmail}
                errorMessage={errors.currentEmail?.message}
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                size="lg"
                classNames={{
                  input: [
                    "dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
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

              <Input
                {...register("newEmail")}
                label="New Email Address"
                placeholder="Enter your new email"
                isInvalid={!!errors.newEmail}
                errorMessage={errors.newEmail?.message}
                variant="bordered"
                fullWidth
                labelPlacement="outside"
                size="lg"
                classNames={{
                  input: [
                    "dark:text-white",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-500",
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
                isLoading={isSubmitting}
                startContent={!isSubmitting && <FiSave className="text-lg" />}
                className="min-w-[120px] font-medium"
              >
                {isSubmitting ? "Updating..." : "Update Email"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
