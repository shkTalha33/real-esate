"use client";
import { propertyDetail } from "@/components/api/apiEndpoints";
import ApiFunction from "@/components/api/apiFunction";
import debounce from "debounce";
import {
  ArrowLeft,
  Award,
  Bath,
  Bed,
  Building,
  Calendar,
  Car,
  CheckCircle,
  Droplet,
  Eye,
  Flame,
  Heart,
  Home,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sofa,
  Square,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function PropertyDetailPage({ params }) {
  const { id } = use(params);
  const { get } = ApiFunction();
  const [propertyData, setPropertyData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const fetchProperty = debounce(async () => {
    try {
      setIsLoading(true);
      await get(`${propertyDetail}/${id}`)
        .then((response) => {
          setPropertyData(response?.data);
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error("Error fetching property:", error);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-brand-white dark:bg-brand-dark min-h-screen">
        <div className="lg:container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Header Skeleton */}
              <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="sm:text-right">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-brand-light dark:bg-brand-dark rounded-xl p-2 sm:p-4 text-center"
                    >
                      <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-1"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Skeleton */}
              <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                <div className="grid grid-cols-6 gap-3 p-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Property Details Skeleton */}
              <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-brand-light dark:bg-brand-dark rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </div>
                  ))}
                </div>

                {/* Utilities Skeleton */}
                <div className="mb-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Description Skeleton */}
                <div className="mb-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>

                {/* Amenities Skeleton */}
                <div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-12 bg-brand-light dark:bg-brand-dark rounded-lg"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="max-w-[500px] w-full mx-auto lg:max-w-full lg:col-span-1">
              <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6"></div>

                {/* Agent Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
                </div>

                {/* Agent Details */}
                <div className="space-y-3 mb-6 bg-brand-light dark:bg-brand-dark rounded-xl p-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                  ))}
                </div>

                {/* Contact Methods */}
                <div className="mb-6">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-3"></div>
                  <div className="flex gap-5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>

                {/* Posted Date */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl poppins_semibold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Property stats data
  const propertyStats = [
    { icon: Bed, label: "Bedrooms", value: propertyData?.bedrooms },
    { icon: Bath, label: "Bathrooms", value: propertyData?.bathrooms },
    {
      icon: Square,
      label: "Area",
      value: `${propertyData?.size?.value} ${propertyData?.size?.unit}`,
    },
    { icon: Building, label: "Year Built", value: propertyData?.yearBuilt },
  ];

  // Property details data
  const propertyDetails = [
    { icon: UtensilsCrossed, label: "Kitchens", value: propertyData?.kitchens },
    {
      icon: Car,
      label: "Parking",
      value: `${propertyData?.parkingSpaces} ${
        propertyData?.parkingSpaces === 1 ? "Space" : "Spaces"
      }`,
    },
    { icon: Layers, label: "Floors", value: propertyData?.floors },
    {
      icon: Sofa,
      label: "Furnishing",
      value: propertyData?.furnishingStatus,
      capitalize: true,
    },
    { icon: Eye, label: "Views", value: propertyData?.viewCount },
    { icon: Heart, label: "Favorites", value: propertyData?.favoriteCount },
  ];

  // Contact preferences data
  const contactMethods = [
    { key: "phone", icon: Phone, label: "Phone" },
    { key: "email", icon: Mail, label: "Email" },
    { key: "inAppMessage", icon: MessageSquare, label: "Message" },
  ].filter((method) => propertyData?.contactPreferences?.[method.key]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-brand-white dark:bg-brand-dark min-h-screen">
      <div className="lg:container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="px-4 py-1.5 bg-blue-100 poppins_regular dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full capitalize">
                      {propertyData?.listingType}
                    </span>
                    <span
                      className={`px-4 py-1.5 text-sm poppins_regular rounded-full capitalize ${
                        propertyData?.status === "available"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {propertyData?.status}
                    </span>
                    {propertyData?.isFeatured && (
                      <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm poppins_medium rounded-full flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl poppins_semibold text-gray-900 mb-3 dark:text-white capitalize">
                    {propertyData?.title}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-brand-primary" />
                    <span className="text-base capitalize poppins_regular">
                      {propertyData?.location?.address},{" "}
                      {propertyData?.location?.city},{" "}
                      {propertyData?.location?.country}
                    </span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm poppins_regular text-gray-500 dark:text-gray-400 mb-1">
                    Price
                  </p>
                  <p className="text-2xl poppins_medium dark:text-brand-white text-brand-dark">
                    {propertyData?.currency}{" "}
                    {propertyData?.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
                {propertyStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-brand-light dark:bg-brand-dark rounded-xl p-2 sm:p-4 text-center transition-shadow"
                    >
                      <Icon className="w-7 h-7 text-brand-primary mb-2 mx-auto" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1 poppins_regular">
                        {stat.label}
                      </span>
                      <span className="text-xl poppins_medium text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Media Gallery */}
            <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
                <img
                  src={propertyData?.images[activeMediaIndex]}
                  alt={propertyData?.title}
                  className="w-full h-full object-cover"
                />

                {propertyData?.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveMediaIndex(
                          (prev) =>
                            (prev - 1 + propertyData?.images.length) %
                            propertyData?.images.length
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all shadow-xl"
                      aria-label="Previous image"
                    >
                      <span className="text-gray-800 dark:text-white text-xl poppins_semibold">
                        <FaChevronLeft />
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveMediaIndex(
                          (prev) => (prev + 1) % propertyData?.images.length
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all shadow-xl"
                      aria-label="Next image"
                    >
                      <span className="text-gray-800 dark:text-white text-xl poppins_semibold">
                        <FaChevronRight />
                      </span>
                    </button>
                  </>
                )}
              </div>

              {/* Media Thumbnails */}
              {propertyData?.images.length > 1 && (
                <div className="grid grid-cols-6 gap-3 p-4">
                  {propertyData?.images?.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveMediaIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                        activeMediaIndex === index
                          ? "scale-105"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={media}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl poppins_semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Home className="w-6 h-6 text-brand-primary" />
                Property Details
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {propertyDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={index}
                      className="bg-brand-light dark:bg-brand-dark rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-brand-primary" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                          {detail.label}
                        </span>
                      </div>
                      <p
                        className={`text-lg poppins_semibold text-gray-900 dark:text-white ${
                          detail.capitalize ? "capitalize" : ""
                        }`}
                      >
                        {detail.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Utilities */}
              <div className="mb-6">
                <h3 className="text-lg poppins_medium text-gray-900 dark:text-white mb-4">
                  Utilities Available
                </h3>
                <div className="flex flex-wrap gap-3">
                  {propertyData?.utilities?.hasElectricity && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm poppins_medium">
                        Electricity
                      </span>
                    </div>
                  )}
                  {propertyData?.utilities?.hasWater && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-full border border-cyan-200 dark:border-cyan-800">
                      <Droplet className="w-4 h-4" />
                      <span className="text-sm poppins_medium">Water</span>
                    </div>
                  )}
                  {propertyData?.utilities?.hasGas && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full border border-orange-200 dark:border-orange-800">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm poppins_medium">Gas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg poppins_medium text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed poppins_regular">
                  {propertyData?.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg poppins_medium text-gray-900 dark:text-white mb-4">
                  Amenities & Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {propertyData?.amenities?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center poppins_regular gap-2 bg-brand-light dark:bg-brand-dark p-3 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {propertyData?.tags && propertyData.tags.length > 0 && (
                <div>
                  <h3 className="text-lg poppins_medium text-gray-900 dark:text-white mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyData?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm poppins_medium rounded-full capitalize"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="max-w-[500px] w-full mx-auto lg:max-w-full lg:col-span-1">
            {/* Contact Agent Card */}
            <div className="bg-brand-white dark:bg-brand-deepdark rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl poppins_medium text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-primary" />
                Property Agent
              </h3>

              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={propertyData?.owner?.avatar}
                    alt={propertyData?.owner?.fullname}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {propertyData?.owner?.isBestSeller && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs poppins_semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Award className="w-3 h-3" />
                      Best Seller
                    </div>
                  )}
                </div>

                <h4 className="text-xl poppins_semibold text-gray-900 dark:text-white mb-1 capitalize">
                  {propertyData?.owner?.fullname}
                </h4>
                <p className="text-sm text-gray-500 poppins_regular dark:text-gray-400 mb-1">
                  @{propertyData?.owner?.username}
                </p>
              </div>

              {/* Agent Details */}
              <div className="space-y-3 mb-6 bg-brand-light dark:bg-brand-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-brand-white truncate">
                    {propertyData?.owner?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-brand-white">
                    {propertyData?.owner?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-brand-white capitalize">
                    {propertyData?.owner?.city}, {propertyData?.owner?.country}
                  </span>
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="mb-6">
                <p className="text-base poppins_medium text-gray-500 dark:text-gray-400 capitalize tracking-wider mb-3">
                  Preferred Contact Methods
                </p>
                <div className="flex items-center gap-5">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-lg"
                      >
                        <Icon className="w-6 h-6 text-brand-primary" />
                        <span className="text-sm text-gray-600 poppins_regular dark:text-gray-400">
                          {method.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <a
                  href={`tel:${propertyData?.owner?.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3.5 px-4 rounded-xl poppins_medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>

                <a
                  href={`mailto:${propertyData?.owner?.email}`}
                  className="w-full flex items-center justify-center gap-2 bg-brand-light dark:bg-brand-dark text-gray-700 dark:text-gray-200 py-3.5 px-4 rounded-xl poppins_medium"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>

              {/* Property Posted Date */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 poppins_regular dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Posted on{" "}
                    {new Date(propertyData?.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
