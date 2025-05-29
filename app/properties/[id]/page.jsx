"use client";
import { use, useEffect, useState } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Square,
  Building,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";
import {
  getRecommendedListings,
  propertyDetail,
} from "@/components/api/apiEndpoints";
import ApiFunction from "@/components/api/apiFunction";
import debounce from "debounce";
import { FaBath, FaBed, FaRulerCombined, FaStar } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock data for demonstration

export default function PropertyDetailPage({ params }) {
  const { id } = params;
  const { get } = ApiFunction();
  const [property, setProperty] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [listings, setListings] = useState([]);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mortgageData, setMortgageData] = useState({
    homeValue: 1250000,
    downPayment: 250000,
    loanTerm: 30,
    interestRate: 4.5,
  });

  const mockProperty = {
    id: "prop-123",
    title: "Modern Luxury Villa",
    address: "123 Oak Street, Beverly Hills, CA 90210",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    size: { value: 2500, unit: "sq ft" },
    yearBuilt: 2020,
    status: "For Sale",
    description:
      "This stunning modern villa features an open-concept design with high-end finishes throughout. The spacious living areas flow seamlessly into the gourmet kitchen, perfect for entertaining. The master suite boasts panoramic views and a luxurious en-suite bathroom.",
    features: [
      "Hardwood Floors",
      "Granite Countertops",
      "Stainless Steel Appliances",
      "Walk-in Closets",
      "Central Air Conditioning",
      "Private Garden",
      "Swimming Pool",
      "2-Car Garage",
    ],
    propertyType: "Villa",
    area: 2500,
    beds: 4,
    baths: 3,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600",
        alt: "Living room",
        type: "image",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600",
        alt: "Kitchen",
        type: "image",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600",
        alt: "Bedroom",
        type: "image",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600",
        alt: "Bathroom",
        type: "image",
      },
    ],
    agent: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100",
      rating: 4.8,
      properties: 25,
      phone: "+1 (555) 123-4567",
    },
  };

  const fetchProperty = debounce(async () => {
    try {
      setIsLoading(true);
      await get(`${propertyDetail}/${id}`)
        .then((response) => {
          setPropertyData(response?.data);
          setProperty(mockProperty);
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
  const fetchListings = debounce(async () => {
    setIsLoading(true);
    await get(`${getRecommendedListings}/${id}`)
      .then((response) => {
        console.log("reponse", response);
        setListings(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching property:", error);
      })
      .finally(() => setIsLoading(false));
  });

  // Simulate API call
  useEffect(() => {
    fetchProperty();
  }, [id]);
  useEffect(() => {
    fetchListings();
  }, []);

  const calculateMonthlyPayment = () => {
    const { homeValue, downPayment, loanTerm, interestRate } = mortgageData;
    const principal = homeValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalInterest =
    monthlyPayment * (mortgageData.loanTerm * 12) -
    (mortgageData.homeValue - mortgageData.downPayment);
  const totalCost = mortgageData.homeValue + totalInterest;

  const handleMortgageChange = (field, value) => {
    setMortgageData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-brand-deepdark">
      <div className="mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-300"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Property Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                  {propertyData?.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{propertyData?.address}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                  {formatCurrency(propertyData?.price)}
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-brand-deepdark rounded-xl mb-6">
              <div className="flex flex-col items-center">
                <Bed className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-sm text-gray-500">Bedrooms</span>
                <span className="font-semibold">{propertyData?.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center">
                <Bath className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-sm text-gray-500">Bathrooms</span>
                <span className="font-semibold">{propertyData?.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center">
                <Square className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-sm text-gray-500">Area</span>
                <span className="font-semibold">
                  {propertyData?.size.value} {propertyData?.size.unit}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Building className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-sm text-gray-500">Year Built</span>
                <span className="font-semibold">{propertyData?.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-100 aspect-video">
            <img
              src={propertyData?.images[activeMediaIndex]}
              alt={propertyData?.images[activeMediaIndex]}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                {propertyData?.listingType}
              </span>
            </div>

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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Previous image"
                >
                  ❮
                </button>
                <button
                  onClick={() =>
                    setActiveMediaIndex(
                      (prev) => (prev + 1) % propertyData?.images.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Next image"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {/* Media Thumbnails */}
          {propertyData?.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mb-8">
              {propertyData?.images?.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMediaIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    activeMediaIndex === index
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={media}
                    alt={media.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Tabs Content */}
          <div className="bg-white dark:bg-brand-deepdark rounded-lg border">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                <button
                  className="py-4 px-2 border-b-2 border-blue-500 text-blue-600 font-medium"
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
              </nav>
            </div>

            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6 dark:text-gray-400">
                {propertyData?.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 dark:bg-brand-deepdark p-5 rounded-lg">
                {propertyData?.amenities?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-4">Property Tags</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 dark:bg-brand-deepdark p-5 rounded-lg">
                {propertyData?.tags?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-2xl roboto_semibold my-5 dark:text-white">
            Recommended Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings?.map((property) => (
              <div
                key={property?._id}
                className="group bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="bg-white dark:bg-brand-primary text-dark-900 dark:text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                      {property?.listingType}
                    </span>
                  </div>
                  {/* Price Tag */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-white/80">Starting From</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(property?.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl poppins_semibold text-dark-900 dark:text-white mb-2 line-clamp-1 capitalize">
                        {property?.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                        <FaMapMarkerAlt className="mr-1.5 text-brand-primary" />
                        <span className="truncate capitalize">
                          {property?.location?.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-1.5">
                        <FaBed className="text-brand-primary text-xl" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {property?.bedrooms} Beds
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-1.5">
                        <FaBath className="text-brand-primary text-xl" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {property?.bathrooms} Baths
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-1.5">
                        <FaRulerCombined className="text-brand-primary text-lg" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {property?.size?.value} {property?.size?.unit}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Year Built
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {property?.yearBuilt}
                      </p>
                    </div>
                    <button
                      className="text-sm font-medium text-brand-warning hover:text-brand-warningdark transition-colors"
                      onClick={() =>
                        router.push(`/properties/${property?.slug}`)
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Contact Agent */}
          <div className="bg-white dark:bg-brand-deepdark rounded-lg border p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 ">Contact Agent</h3>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={propertyData?.owner.avatar}
                alt={propertyData?.owner.fullname}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">
                  {propertyData?.owner?.fullname}
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onPress={() =>
                  (window.location.href = `tel:${propertyData?.owner?.phone}`)
                }
              >
                <Phone className="w-4 h-4" />
                {propertyData?.owner?.phone}
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                onPress={() =>
                  (window.location.href = `mailto:${propertyData?.owner?.email}`)
                }
              >
                <Mail className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
