"use client";

import { Button, Card, CardBody, CardHeader, Spinner } from "@/components/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiSave } from "react-icons/fi";
import FormInput from "@/components/forms/FormInput";
import { useSelector } from "react-redux";
import ApiFunction from "@/components/api/apiFunction";
import { updateAvatar, updateDetails } from "@/components/api/apiEndpoints";
import { handleError } from "@/components/api/errorHandler";
import { setUserData } from "@/redux/slices/loginSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadFile } from "@/components/api/uploadFile";
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
  const user = useSelector((state) => state.auth.userData);
  const { put } = ApiFunction()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState({
    updateDetails: false,
    updateAvatar: false,
  })
  const [avatar, setAvatar] = useState(null)
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      address: user?.address || "",
      city: user?.city || "",
      country: user?.country || "",
      postalCode: user?.zipCode || "",
      avatar: user?.avatar || "",
    },
  });


  const onSubmit = (data) => {
    const apiData = {
      fullname: data.fullName,
      bio: data.bio,
      address: data.address,
      city: data.city,
      country: data.country,
      zipCode: data.postalCode,
    }
    setIsLoading({ updateDetails: true })
    put(updateDetails, apiData)
      .then((result) => {
        if (result?.success) {
          dispatch(setUserData(result?.data));
          toast.success(result?.message);
        }
      }).catch((err) => {
        handleError(err)
      }).finally(() => setIsLoading({ updateDetails: false }));
  };
  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user?.avatar)
    }
  }, [user]);
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading({ updateAvatar: true })
      const newFile = await uploadFile({ file });
      setAvatar(newFile?.data?.data);

      setIsLoading({ updateAvatar: false })
      await put(updateAvatar, { avatar: newFile?.data?.data })
        .then((result) => {
          if (result?.success) {
            dispatch(setUserData(result?.data));
            toast.success(result?.message);
          }
        }).catch((err) => {
          handleError(err)
        }).finally(() => setIsLoading({ updateAvatar: false }));
    }
  };
  console.log('user', user)

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

            <div className="text-center">
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto",
                  border: "3px solid #f8f9fa",
                }}
              >
                <img
                  src={avatar || user?.avatar}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="mt-3">
                <label
                  className="btn cursor-pointer text-sm btn-primary flex items-center justify-center"
                  style={{ opacity: isLoading.updateAvatar ? 0.7 : 1 }}
                >
                  {isLoading.updateAvatar ? (
                    <>
                      <Spinner className="mr-2" size="sm" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Avatar
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
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
                isReadOnly
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

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                color="primary"
                variant="flat"
                isLoading={isLoading.updateDetails}
                startContent={!isLoading.updateDetails && <FiSave className="text-lg" />}
                className="min-w-[120px] font-medium"
              >
                 Save Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
