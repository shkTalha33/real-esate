"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Progress,
  Select,
  SelectItem,
  Spinner,
  Switch,
  Textarea,
} from "@/components/ui";
import {
  BiArea,
  FaBed,
  FaBuilding,
  FaCalendarAlt,
  FaPlus,
  FaRulerCombined,
  FaTags,
  FaTrash,
  FaUpload,
  HiOutlineBuildingOffice,
  HiOutlineCurrencyDollar,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  MdCurrencyExchange,
  MdElectricalServices,
  MdLocalGasStation,
  MdLocalParking,
  MdOutlineBathroom,
  MdOutlineKitchen,
  MdWater,
} from "@/public/assets/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { countriesWithCities } from "@/data/countriesCities";
import { Divider } from "antd";
import Image from "next/image";
import { uploadFile } from "../api/uploadFile";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import ApiFunction from "../api/apiFunction";
import {
  createListing,
  propertyDetail,
  updateListing,
} from "../api/apiEndpoints";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddListing() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [customAmenities, setCustomAmenities] = useState([]);
  const [customTags, setCustomTags] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [newTag, setNewTag] = useState("");
  const [completedSteps, setCompletedSteps] = useState([]); // Track completed steps
  const { post, get, put } = ApiFunction();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditMode = !!slug;

  const totalSteps = 4;

  // Predefined options
  const listingTypeOptions = [
    { key: "sell", label: "For Sale", icon: "💰" },
    { key: "rent", label: "For Rent", icon: "🏠" },
  ];

  const statusOptions = [
    { key: "available", label: "Available", color: "success" },
    { key: "sold", label: "Sold", color: "danger" },
    { key: "rented", label: "Rented", color: "warning" },
  ];

  const furnishingStatusOptions = [
    { key: "furnished", label: "Fully Furnished", icon: "🛋️" },
    { key: "semi-furnished", label: "Semi Furnished", icon: "🪑" },
    { key: "unfurnished", label: "Unfurnished", icon: "🏠" },
  ];

  const sizeUnitOptions = [
    { key: "sqft", label: "Square Feet" },
    { key: "sqm", label: "Square Meters" },
    { key: "kanal", label: "Kanal" },
    { key: "marla", label: "Marla" },
  ];

  const commonAmenities = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Garden",
    "Security",
    "Elevator",
    "Balcony",
    "Terrace",
    "Central AC",
    "Heating",
    "Fireplace",
    "Storage Room",
    "Laundry Room",
    "Study Room",
    "Servant Quarter",
    "Generator Backup",
  ];

  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Property title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    listingType: Yup.string().required("Listing type is required"),
    furnishingStatus: Yup.string().required("Furnishing status is required"),
    price: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Price must be a number")
      .required("Price is required")
      .min(1, "Price must be greater than 0"),
    sizeValue: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Size must be a number")
      .required("Size is required")
      .min(1, "Size must be greater than 0"),
    sizeUnit: Yup.string().required("Size unit is required"),
    bedrooms: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Bedrooms must be a number")
      .required("Number of bedrooms is required")
      .min(0, "Bedrooms cannot be negative"),
    bathrooms: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Bathrooms must be a number")
      .required("Number of bathrooms is required")
      .min(0, "Bathrooms cannot be negative"),
    kitchens: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Kitchens must be a number")
      .required("Number of kitchens is required")
      .min(0, "Kitchens cannot be negative"),
    floors: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Floors must be a number")
      .required("Number of floors is required")
      .min(1, "Must have at least 1 floor"),
    yearBuilt: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Year built must be a number")
      .required("Year built is required")
      .min(1800, "Year must be after 1800")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    latitude: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Latitude must be a number")
      .required("Latitude is required")
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    longitude: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Longitude must be a number")
      .required("Longitude is required")
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      listingType: "",
      furnishingStatus: "",
      price: "",
      sizeValue: "",
      sizeUnit: "",
      bedrooms: "",
      bathrooms: "",
      kitchens: "",
      floors: "",
      parkingSpaces: "",
      yearBuilt: "",
      country: "",
      city: "",
      address: "",
      latitude: "",
      longitude: "",
      hasElectricity: true,
      hasWater: true,
      hasGas: true,
      phoneContact: true,
      emailContact: true,
      inAppMessage: false,
    },
    mode: "onChange",
  });

  const selectedCountry = watch("country");
  const [availableCities, setAvailableCities] = useState([]);

  // Watch form values to calculate progress
  const watchedValues = watch();

  // Calculate progress based on current step (not form completion)
  const calculateProgress = () => {
    // Progress starts at 0% and increases as user moves through steps
    // Step 1 = 0%, Step 2 = 25%, Step 3 = 50%, Step 4 = 75%, Completed = 100%
    return ((step - 1) / totalSteps) * 100;
  };

  const progressValue = calculateProgress();

  useEffect(() => {
    if (selectedCountry) {
      const country = countriesWithCities[selectedCountry];
      setAvailableCities(country.cities || []);
      // Only reset city if it's not the initial population (or handle it gracefully)
      // For simplicity in this edit, we might want to check if the current city value is valid for the new country
      // But since we are populating data, we should be careful not to wipe it immediately if it's correct.
      // A simple check: if the form city is not in the new available cities, reset it.
      // However, for the initial load, setValue is called after this effect might run or before.
      // To be safe for edit mode, we can depend on 'isEditMode' or just let the user re-select if they change country.
      if (!isEditMode) {
        setValue("city", "");
      }
    }
  }, [selectedCountry, setValue, isEditMode]);

  // Fetch listing details if in edit mode
  useEffect(() => {
    if (isEditMode && slug) {
      const fetchListingDetails = async () => {
        setIsLoading("fetch");
        try {
          const response = await get(`${propertyDetail}/${slug}`);
          if (response?.success && response?.data) {
            const data = response.data;

            // Populate form fields
            setValue("title", data.title);
            setValue("description", data.description);
            setValue("listingType", data.listingType);
            setValue("furnishingStatus", data.furnishingStatus);
            setValue("price", data.price);
            setValue("sizeValue", data.size?.value);
            setValue("sizeUnit", data.size?.unit);
            setValue("bedrooms", data.bedrooms);
            setValue("bathrooms", data.bathrooms);
            setValue("kitchens", data.kitchens);
            setValue("floors", data.floors);
            setValue("parkingSpaces", data.parkingSpaces);
            setValue("yearBuilt", data.yearBuilt);
            setValue("country", data.location?.country);
            setValue("city", data.location?.city);
            setValue("address", data.location?.address);
            setValue("latitude", data.location?.geoLocation?.coordinates[1]);
            setValue("longitude", data.location?.geoLocation?.coordinates[0]);
            setValue("hasElectricity", data.utilities?.hasElectricity);
            setValue("hasWater", data.utilities?.hasWater);
            setValue("hasGas", data.utilities?.hasGas);
            setValue("phoneContact", data.contactPreferences?.phone);
            setValue("emailContact", data.contactPreferences?.email);
            setValue("inAppMessage", data.contactPreferences?.inAppMessage);

            // Populate state variables
            setSelectedImages(data.images || []);
            setSelectedVideos(data.videos || []);
            setCustomAmenities(data.amenities || []);
            setCustomTags(data.tags || []);

            if (data.location?.country) {
              const country = countriesWithCities[data.location?.country];
              setAvailableCities(country?.cities || []);
            }
          }
        } catch (error) {
          toast.error("Failed to fetch listing details");
          console.error(error);
        } finally {
          setIsLoading("");
        }
      };

      fetchListingDetails();
    }
  }, []);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = [];
    for (const file of files) {
      setIsLoading("image");
      try {
        const imageUrl = await uploadFile({ file, video: false });
        console.log("imageUrl", imageUrl);
        if (imageUrl?.data?.success) {
          imageUrls.push(imageUrl?.data?.data);
        }
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
    if (imageUrls.length > 0) {
      toast.success("Images uploaded successfully");
      setSelectedImages((prev) => [...prev, ...imageUrls]);
    }
    setIsLoading("");
  };

  const handleVideoUpload = async (event) => {
    const files = Array.from(event.target.files);
    const videoUrls = [];
    for (const file of files) {
      setIsLoading("video");
      try {
        const videoUrl = await uploadFile({ file, video: true });
        if (videoUrl?.data?.success) {
          videoUrls.push(videoUrl?.data?.data);
        }
      } catch (error) {
        toast.error("Failed to upload video");
      }
    }
    if (videoUrls.length > 0) {
      toast.success("Videos uploaded successfully");
      setSelectedVideos((prev) => [...prev, ...videoUrls]);
    }
    setIsLoading("");
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setSelectedVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !customAmenities.includes(newAmenity.trim())) {
      setCustomAmenities((prev) => [...prev, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setCustomAmenities((prev) => prev.filter((a) => a !== amenity));
  };

  const addCustomTag = (e) => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag) => {
    setCustomTags((prev) => prev.filter((t) => t !== tag));
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await trigger(fieldsToValidate);

    if (isValid && step < totalSteps) {
      // Add current step to completed steps
      setCompletedSteps((prev) => [...new Set([...prev, step])]);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getFieldsForStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        // Removed 'status' since it's commented out in the form
        return ["title", "description", "listingType"];
      case 2:
        return [
          "furnishingStatus",
          "price",
          "sizeValue",
          "sizeUnit",
          "bedrooms",
          "bathrooms",
          "kitchens",
          "floors",
          "yearBuilt",
        ];
      case 3:
        return ["country", "city", "address", "latitude", "longitude"];
      case 4:
        return [];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    // Validate that at least one image is uploaded
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one property image");
      return;
    }

    const {
      sizeValue,
      sizeUnit,
      phoneContact,
      emailContact,
      inAppMessage,
      country,
      city,
      address,
      latitude,
      longitude,
      hasElectricity,
      hasWater,
      hasGas,
      ...restData
    } = data;

    setIsLoading("publish");

    const formData = {
      ...restData,
      size: {
        value: sizeValue,
        unit: sizeUnit,
      },
      location: {
        country: country,
        city: city,
        address: address,
        geoLocation: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      },
      utilities: {
        hasElectricity: hasElectricity,
        hasWater: hasWater,
        hasGas: hasGas,
      },
      contactPreferences: {
        phone: phoneContact,
        email: emailContact,
        inAppMessage: inAppMessage,
      },
      amenities: customAmenities,
      tags: customTags,
      images: selectedImages,
      videos: selectedVideos,
    };

    try {
      let response;
      if (isEditMode) {
        response = await put(`${updateListing}/${slug}`, formData);
      } else {
        response = await post(createListing, formData);
      }

      if (response?.success) {
        toast.success(response?.message);

        // Reset all form data
        reset();
        setSelectedImages([]);
        setSelectedVideos([]);
        setCustomAmenities([]);
        setCustomTags([]);
        setStep(1);

        // Navigate to my-listings page
        router.push("/settings/my-listings");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading("");
    }
  };

  // Add a separate submit handler for the final step
  const handleFinalSubmit = async () => {
    // Validate that we have at least one image
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one property image");
      return;
    }

    // Trigger form validation for all fields
    const isValid = await trigger();

    console.log("isValid", isValid);

    if (isValid) {
      // Call the form submit handler
      handleSubmit(onSubmit)();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <HiOutlineHome className="mx-auto text-6xl text-brand-warning mb-4" />
        <h2 className="text-2xl poppins_semibold text-brand-dark dark:text-brand-white mb-2">
          Basic Information
        </h2>
        <p className="text-brand-muted">Tell us about your property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Property Title"
              placeholder="Enter an attractive title for your property"
              startContent={
                <HiOutlineSparkles className="text-brand-warning" />
              }
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              className="text-lg"
            />
          )}
        />
        {/* <Controller
          control={control}
          name="status"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="Property Status"
              placeholder="Select status"
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
            >
              {statusOptions.map((status) => (
                <SelectItem key={status.key} value={status.key}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          )}
        /> */}

        <Controller
          control={control}
          name="listingType"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="Listing Type"
              placeholder="Select listing type"
              startContent={
                <HiOutlineCurrencyDollar className="text-brand-warning" />
              }
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
            >
              {listingTypeOptions.map((type) => (
                <SelectItem key={type.key} value={type.key}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { invalid, error } }) => (
          <Textarea
            {...field}
            label="Property Description"
            placeholder="Describe your property in detail..."
            minRows={4}
            maxRows={8}
            errorMessage={error?.message}
            isInvalid={invalid}
            labelPlacement="outside"
            size="lg"
          />
        )}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <BiArea className="mx-auto text-6xl text-brand-warning mb-4" />
        <h2 className="text-2xl poppins_semibold text-brand-dark dark:text-brand-white mb-2">
          Property Details
        </h2>
        <p className="text-brand-muted">
          Specify the characteristics of your property
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="furnishingStatus"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="Furnishing Status"
              placeholder="Select furnishing status"
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
            >
              {furnishingStatusOptions.map((status) => (
                <SelectItem key={status.key} value={status.key}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Price"
              placeholder="Enter price"
              type="number"
              startContent={
                <MdCurrencyExchange className="text-brand-warning" />
              }
              endContent={<span className="text-brand-muted">PKR</span>}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="sizeValue"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Property Size"
              placeholder="Enter size"
              type="number"
              startContent={<FaRulerCombined className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="sizeUnit"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="Size Unit"
              placeholder="Select unit"
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
            >
              {sizeUnitOptions.map((unit) => (
                <SelectItem key={unit.key} value={unit.key}>
                  {unit.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Controller
          control={control}
          name="bedrooms"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Bedrooms"
              type="number"
              min="0"
              startContent={<FaBed className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="bathrooms"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Bathrooms"
              type="number"
              min="0"
              startContent={
                <MdOutlineBathroom className="text-brand-warning" />
              }
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="kitchens"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Kitchens"
              type="number"
              min="0"
              startContent={<MdOutlineKitchen className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="floors"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Floors"
              type="number"
              min="1"
              startContent={<FaBuilding className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="parkingSpaces"
          render={({ field }) => (
            <Input
              {...field}
              label="Parking Spaces"
              type="number"
              min="0"
              startContent={<MdLocalParking className="text-brand-warning" />}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="yearBuilt"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Year Built"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              startContent={<FaCalendarAlt className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />
      </div>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-lg poppins_medium">Utilities Available</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              control={control}
              name="hasElectricity"
              render={({ field }) => (
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <MdElectricalServices className="text-brand-warning" />
                    <span>Electricity</span>
                  </div>
                  <Switch
                    isSelected={field.value}
                    onValueChange={field.onChange}
                    color="warning"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="hasWater"
              render={({ field }) => (
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <MdWater className="text-brand-warning" />
                    <span>Water</span>
                  </div>
                  <Switch
                    isSelected={field.value}
                    onValueChange={field.onChange}
                    color="warning"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="hasGas"
              render={({ field }) => (
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <MdLocalGasStation className="text-brand-warning" />
                    <span>Gas</span>
                  </div>
                  <Switch
                    isSelected={field.value}
                    onValueChange={field.onChange}
                    color="warning"
                  />
                </div>
              )}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <HiOutlineLocationMarker className="mx-auto text-6xl text-brand-warning mb-4" />
        <h2 className="text-2xl poppins_semibold text-brand-dark dark:text-brand-white mb-2">
          Location Details
        </h2>
        <p className="text-brand-muted">Where is your property located?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="country"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="Country"
              placeholder="Select country"
              startContent={<HiOutlineGlobe className="text-brand-warning" />}
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
            >
              {Object.keys(countriesWithCities).map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label="City"
              placeholder="Select city"
              startContent={
                <HiOutlineBuildingOffice className="text-brand-warning" />
              }
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
              selectedKeys={field.value ? [field.value] : []}
              isDisabled={!selectedCountry}
            >
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Controller
        control={control}
        name="address"
        render={({ field, fieldState: { invalid, error } }) => (
          <Textarea
            {...field}
            label="Complete Address"
            placeholder="Enter the complete address of your property"
            minRows={3}
            errorMessage={error?.message}
            isInvalid={invalid}
            labelPlacement="outside"
            size="lg"
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          control={control}
          name="latitude"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Latitude"
              placeholder="Enter latitude"
              type="number"
              step="any"
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />

        <Controller
          control={control}
          name="longitude"
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Longitude"
              placeholder="Enter longitude"
              type="number"
              step="any"
              errorMessage={error?.message}
              isInvalid={invalid}
              labelPlacement="outside"
              size="lg"
            />
          )}
        />
      </div>

      <Card className="p-4">
        <CardHeader>
          <h3 className="text-lg poppins_medium">Contact Preferences</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <Controller
            control={control}
            name="phoneContact"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlinePhone className="text-brand-warning" />
                  <span>Allow phone contact</span>
                </div>
                <Switch
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  color="warning"
                />
              </div>
            )}
          />

          <Controller
            control={control}
            name="emailContact"
            render={({ field }) => (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineMail className="text-brand-warning" />
                  <span>Allow email contact</span>
                </div>
                <Switch
                  isSelected={field.value}
                  onValueChange={field.onChange}
                  color="warning"
                />
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <HiOutlinePhotograph className="mx-auto text-6xl text-brand-warning mb-4" />
        <h2 className="text-2xl poppins_semibold text-brand-dark dark:text-brand-white mb-2">
          Media & Additional Details
        </h2>
        <p className="text-brand-muted">
          Add images, videos, amenities and tags
        </p>
      </div>

      {/* Image Upload */}
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          <HiOutlinePhotograph className="text-brand-warning" />
          <h3 className="text-lg poppins_medium">Property Images</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-warning rounded-lg cursor-pointer hover:bg-brand-warning/5 transition-colors"
            >
              <FaUpload className="text-3xl text-brand-warning mb-2" />
              <span className="text-brand-muted">Click to upload images</span>
            </label>

            {isLoading === "image" ? (
              <div className="flex items-center justify-center shadow-md bg-brand-white rounded-lg w-[80px] h-[80px]">
                <Spinner color="primary" size="sm" />
              </div>
            ) : (
              selectedImages?.length > 0 && (
                <div className="flex items-center flex-wrap justify-start gap-4">
                  {selectedImages?.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`Property ${index + 1}`}
                        width={80}
                        height={80}
                        className="max-h-[80px] max-w-[80px] min-h-[80px] min-w-[80px] object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </CardBody>
      </Card>

      {/* Video Upload */}
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          <HiOutlineVideoCamera className="text-brand-warning" />
          <h3 className="text-lg poppins_medium">Property Videos</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-warning rounded-lg cursor-pointer hover:bg-brand-warning/5 transition-colors"
            >
              <HiOutlineVideoCamera className="text-3xl text-brand-warning mb-2" />
              <span className="text-brand-muted">Click to upload videos</span>
            </label>

            {isLoading === "video" ? (
              <div className="flex items-center justify-center shadow-md bg-brand-white rounded-lg w-[80px] h-[80px]">
                <Spinner color="primary" size="sm" />
              </div>
            ) : (
              selectedVideos?.length > 0 && (
                <div className="flex items-center flex-wrap justify-start gap-4">
                  {selectedVideos?.map((video, index) => (
                    <div key={index} className="relative group">
                      <video
                        src={video}
                        className="w-full h-32 object-cover rounded-lg"
                        controls
                      />
                      <button
                        onClick={() => removeVideo(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </CardBody>
      </Card>

      {/* Amenities */}
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          <HiOutlineSparkles className="text-brand-warning" />
          <h3 className="text-lg poppins_medium">Property Amenities</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {commonAmenities.map((amenity) => (
                <Chip
                  key={amenity}
                  variant={
                    customAmenities.includes(amenity) ? "solid" : "bordered"
                  }
                  color={
                    customAmenities.includes(amenity) ? "warning" : "default"
                  }
                  className="cursor-pointer"
                  classNames={{
                    content: customAmenities.includes(amenity)
                      ? "text-white"
                      : "",
                  }}
                  onClick={() => {
                    if (customAmenities.includes(amenity)) {
                      removeAmenity(amenity);
                    } else {
                      setCustomAmenities((prev) => [...prev, amenity]);
                    }
                  }}
                >
                  {amenity}
                </Chip>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom amenity"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // prevent form submission
                    addCustomAmenity();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={addCustomAmenity}
                color="warning"
                variant="bordered"
                isIconOnly
              >
                <FaPlus />
              </Button>
            </div>

            {customAmenities.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-brand-muted mb-2">
                  Selected Amenities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {customAmenities.map((amenity) => (
                    <Chip
                      key={amenity}
                      color="warning"
                      variant="solid"
                      classNames={{
                        content: "text-white",
                      }}
                      onClose={() => removeAmenity(amenity)}
                    >
                      {amenity}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Tags */}
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          <FaTags className="text-brand-warning" />
          <h3 className="text-lg poppins_medium">Property Tags</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // prevent form submission
                    addCustomTag();
                  }
                }}
                className="flex-1"
              />

              <Button
                type="button"
                onClick={addCustomTag}
                color="warning"
                variant="bordered"
                isIconOnly
              >
                <FaPlus />
              </Button>
            </div>

            {customTags.length > 0 && (
              <div>
                <p className="text-sm text-brand-muted mb-2">Property Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag) => (
                    <Chip
                      key={tag}
                      color="warning"
                      variant="solid"
                      classNames={{
                        content: "text-white",
                      }}
                      onClose={() => removeTag(tag)}
                    >
                      #{tag}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light dark:from-brand-dark dark:via-gray-900 dark:to-brand-deepdark">
      <div className="lg:container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl poppins_semibold mb-2">
            List Your <span className="text-brand-warning">Property</span>
          </h1>
          <p className="text-brand-muted text-lg">
            Showcase your property to thousands of potential buyers and renters
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm poppins_medium text-brand-muted">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm poppins_medium text-brand-warning">
                {Math.round(progressValue)}% Complete
              </span>
            </div>
            <Progress
              value={progressValue}
              color="warning"
              className="mb-4"
              size="lg"
            />
            <div className="flex justify-between text-xs text-brand-muted">
              <span
                className={step >= 1 ? "text-brand-warning poppins_medium" : ""}
              >
                Basic Info
              </span>
              <span
                className={step >= 2 ? "text-brand-warning poppins_medium" : ""}
              >
                Details
              </span>
              <span
                className={step >= 3 ? "text-brand-warning poppins_medium" : ""}
              >
                Location
              </span>
              <span
                className={step >= 4 ? "text-brand-warning poppins_medium" : ""}
              >
                Media & Tags
              </span>
            </div>
          </CardBody>
        </Card>

        {/* Form */}
        <Card className="mx-auto">
          <CardBody className="p-8">
            <form>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}

              {/* Navigation Buttons */}
              <Divider className="my-8" />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="bordered"
                  color="warning"
                  disabled={step === 1}
                  size="lg"
                  className="px-8"
                >
                  Previous
                </Button>
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    color="warning"
                    size="lg"
                    className="px-8 bg-brand-warning text-white"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinalSubmit}
                    type="button"
                    color="warning"
                    size="lg"
                    className="px-8 bg-brand-warning text-white"
                    isLoading={isLoading === "publish"}
                    loadingText="Publishing..."
                  >
                    {isEditMode ? "Update Listing" : "Publish Listing"}
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
