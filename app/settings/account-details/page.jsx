"use client";

import { Button, Card, CardBody, CardHeader } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiSave } from "react-icons/fi";
import FormInput from "@/components/forms/FormInput";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
  bio: yup.string().max(200, "Bio must be less than 200 characters"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("Postal code is required"),
});

export default function AccountDetails() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "",
      bio: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Account Details
          </h2>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                control={control}
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                errors={errors}
              />
              <FormInput
                control={control}
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                errors={errors}
                isDisabled
              />
              <FormInput
                control={control}
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                errors={errors}
              />
              <FormInput
                control={control}
                name="country"
                label="Country"
                placeholder="Select your country"
                errors={errors}
              />
              <FormInput
                control={control}
                name="city"
                label="City"
                placeholder="Enter your city"
                errors={errors}
              />
              <FormInput
                control={control}
                name="postalCode"
                label="Postal Code"
                placeholder="Enter your postal code"
                errors={errors}
              />
              <div className="md:col-span-2">
                <FormInput
                  control={control}
                  name="address"
                  label="Address"
                  placeholder="Enter your full address"
                  errors={errors}
                />
              </div>
              <div className="md:col-span-2">
                <FormInput
                  control={control}
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  errors={errors}
                  isTextarea
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                color="primary"
                size="lg"
                isLoading={isSubmitting}
                startContent={!isSubmitting && <FiSave className="text-lg" />}
                className="min-w-[120px] font-medium"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
