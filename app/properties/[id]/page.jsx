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
      <div className=" mx-auto lg:container px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-brand-deepdark rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 dark:bg-brand-deepdark rounded-xl mb-6"></div>
              <div className="h-32 bg-gray-200 dark:bg-brand-deepdark rounded mb-4"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-64 bg-gray-200 dark:bg-brand-deepdark rounded"></div>
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

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="lg:container mx-auto">
        {/* <div className="mb-6">
          <button
            className="flex items-center poppins_regular gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-300 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </button>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
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
                <div className="text-right">
                  <p className="text-lg poppins_regular text-gray-500 dark:text-gray-400 mb-1">
                    Price
                  </p>
                  <p className="text-2xl poppins_medium text-orange-600 dark:text-orange-400">
                    {propertyData?.currency}{" "}
                    {propertyData?.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-6">
                <div className="bg-white dark:bg-gray-700/30 rounded-xl p-2 sm:p-4 text-center transition-shadow">
                  <Bed className="w-7 h-7 text-brand-primary mb-2 mx-auto" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1 poppins_regular">
                    Bedrooms
                  </span>
                  <span className="text-xl poppins_medium text-gray-900 dark:text-white">
                    {propertyData?.bedrooms}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-700/30 rounded-xl p-2 sm:p-4 text-center transition-shadow">
                  <Bath className="w-7 h-7 text-brand-primary mb-2 mx-auto" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1 poppins_regular">
                    Bathrooms
                  </span>
                  <span className="text-xl poppins_medium text-gray-900 dark:text-white poppins_regular">
                    {propertyData?.bathrooms}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-700/30 rounded-xl p-2 sm:p-4 text-center transition-shadow">
                  <Square className="w-7 h-7 text-brand-primary mb-2 mx-auto" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1 poppins_regular">
                    Area
                  </span>
                  <span className="text-xl poppins_medium text-gray-900 dark:text-white">
                    {propertyData?.size?.value} {propertyData?.size?.unit}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-700/30 rounded-xl p-2 sm:p-4 text-center transition-shadow">
                  <Building className="w-7 h-7 text-brand-primary mb-2 mx-auto" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1 poppins_regular">
                    Year Built
                  </span>
                  <span className="text-xl poppins_medium text-gray-900 dark:text-white">
                    {propertyData?.yearBuilt}
                  </span>
                </div>
              </div>
            </div>

            {/* Media Gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
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
                          ? "ring-4 ring-blue-500 scale-105"
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl poppins_semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Home className="w-6 h-6 text-brand-primary" />
                Property Details
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Kitchens
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white">
                    {propertyData?.kitchens}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Parking
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white">
                    {propertyData?.parkingSpaces}{" "}
                    {propertyData?.parkingSpaces === 1 ? "Space" : "Spaces"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Floors
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white">
                    {propertyData?.floors}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sofa className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Furnishing
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white capitalize">
                    {propertyData?.furnishingStatus}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Views
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white">
                    {propertyData?.viewCount}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 poppins_regular">
                      Favorites
                    </span>
                  </div>
                  <p className="text-lg poppins_semibold text-gray-900 dark:text-white">
                    {propertyData?.favoriteCount}
                  </p>
                </div>
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
                      className="flex items-center poppins_regular gap-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg hover:shadow-md transition-shadow"
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
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
              <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-gray-300 truncate">
                    {propertyData?.owner?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-gray-300">
                    {propertyData?.owner?.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-base text-gray-700 poppins_regular dark:text-gray-300 capitalize">
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
                  {propertyData?.contactPreferences?.phone && (
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg">
                      <Phone className="w-6 h-6 text-brand-primary" />
                      <span className="text-sm text-gray-600 poppins_regular dark:text-gray-400">
                        Phone
                      </span>
                    </div>
                  )}
                  {propertyData?.contactPreferences?.email && (
                    <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg">
                      <Mail className="w-6 h-6 text-brand-primary" />
                      <span className="text-sm text-gray-600 poppins_regular dark:text-gray-400">
                        Email
                      </span>
                    </div>
                  )}
                  {propertyData?.contactPreferences?.inAppMessage && (
                    <div className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-brand-primary" />
                      <span className="text-xs text-gray-600 poppins_regular dark:text-gray-400">
                        Message
                      </span>
                    </div>
                  )}
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
                  className="w-full flex items-center justify-center gap-2 bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-200 py-3.5 px-4 rounded-xl poppins_medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
