"use client";
import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Tab,
  Tabs,
} from "@/components/ui";
import { house1, house2, house3, house4, house5 } from "@/public/assets/images";
import { notFound } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiArea, BiBuildingHouse } from "react-icons/bi";
import {
  FaBath,
  FaBed,
  FaEnvelope,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

export default function PropertyDetailPage({ params }) {
  const { id } = params;
  // In a real app, you would fetch this data from an API
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mortgageData, setMortgageData] = useState({
    homeValue: 1250000,
    downPayment: 250000,
    loanTerm: 30,
    interestRate: 4.5,
  });

  const property = {
    id: id,
    title: "Luxury Villa with Ocean View",
    price: 1250000,
    priceSuffix: "",
    address: "123 Ocean Drive, Malibu, CA 90265",
    description:
      "This stunning luxury villa offers breathtaking ocean views from every room. Featuring modern architecture with floor-to-ceiling windows, this property is designed for those who appreciate the finer things in life. The open-concept living space flows seamlessly to the outdoor entertaining area with an infinity pool and outdoor kitchen.",
    beds: 4,
    baths: 3.5,
    area: 3200,
    yearBuilt: 2020,
    propertyType: "Villa",
    status: "For Sale",
    features: [
      "Swimming Pool",
      "Garden",
      "Garage",
      "Security System",
      "Air Conditioning",
      "Heating",
      "Fireplace",
      "Walk-in Closet",
      "Hardwood Floors",
      "High Ceilings",
      "Smart Home",
      "Fitness Center",
    ],
    media: [
      { type: "image", src: house1, alt: "Front view of the villa" },
      { type: "image", src: house2, alt: "Living room with ocean view" },
      {
        type: "video",
        src: "https://example.com/video1.mp4",
        thumbnail: house3,
        alt: "Property video tour",
      },
      { type: "image", src: house4, alt: "Master bedroom" },
      { type: "image", src: house5, alt: "Infinity pool area" },
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@realestate.com",
      image: "/assets/images/agents/agent-1.jpg",
      rating: 4.9,
      properties: 42,
    },
    location: {
      lat: 34.0259,
      lng: -118.7798,
    },
  };

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

  if (!property) {
    notFound();
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          variant="light"
          startContent={<IoIosArrowBack />}
          className="text-brand-black dark:text-brand-white"
        >
          Back to Properties
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Property Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray- dark:text-brand-white mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-400 mb-4">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{property.address}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-brand-warning">
                  {formatPrice(property.price)}
                  {property.priceSuffix && (
                    <span className="text-base font-normal text-gray-500">
                      /{property.priceSuffix}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 dark:bg-brand-dark bg-gray-50 rounded-xl mb-6">
              <div className="flex flex-col items-center">
                <FaBed className="text-2xl text-primary-600 mb-1" />
                <span className="text-sm text-gray-500">Bedrooms</span>
                <span className="font-semibold">{property.beds}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaBath className="text-2xl text-primary-600 mb-1" />
                <span className="text-sm text-gray-500">Bathrooms</span>
                <span className="font-semibold">{property.baths}</span>
              </div>
              <div className="flex flex-col items-center">
                <BiArea className="text-2xl text-primary-600 mb-1" />
                <span className="text-sm text-gray-500">Area</span>
                <span className="font-semibold">{property.area} sq.ft</span>
              </div>
              <div className="flex flex-col items-center">
                <BiBuildingHouse className="text-2xl text-primary-600 mb-1" />
                <span className="text-sm text-gray-500">Year Built</span>
                <span className="font-semibold">{property.yearBuilt}</span>
              </div>
            </div>
          </div>
          {/* Media Gallery */}
          <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-100 aspect-video">
            {property.media[activeMediaIndex].type === "video" ? (
              <div className="relative w-full h-full">
                <video
                  src={property.media[activeMediaIndex].src}
                  className="w-full h-full object-cover"
                  controls
                  poster={property.media[activeMediaIndex].thumbnail}
                />
              </div>
            ) : (
              <Image
                src={property.media[activeMediaIndex].src.src}
                alt={property.media[activeMediaIndex].alt}
                className="w-full h-full object-cover"
                removeWrapper
              />
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                isIconOnly
                variant="flat"
                className="bg-white/80 backdrop-blur-sm hover:scale-110 transition-transform"
                aria-label="Share property"
              >
                <FaShareAlt className="text-gray-700" />
              </Button>
              <Button
                isIconOnly
                variant="flat"
                className="bg-white/80 backdrop-blur-sm hover:scale-110 transition-transform"
                aria-label="Add to favorites"
              >
                <FaHeart className="text-red-500" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4">
              <Chip color="primary" variant="flat" className="backdrop-blur-sm">
                {property.status}
              </Chip>
            </div>

            {property.media.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveMediaIndex(
                      (prev) =>
                        (prev - 1 + property.media.length) %
                        property.media.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Previous media"
                >
                  ❮
                </button>
                <button
                  onClick={() =>
                    setActiveMediaIndex(
                      (prev) => (prev + 1) % property.media.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Next media"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {/* Media Thumbnails */}
          {property.media.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mb-8">
              {property.media.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMediaIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                    activeMediaIndex === index
                      ? "ring-2 ring-primary-500 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View ${media.type} ${index + 1}`}
                >
                  {console.log("media", media)}
                  {media.type === "video" ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={media.thumbnail}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                        removeWrapper
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                          ▶
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={media.src.src}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                      removeWrapper
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Tabs */}
          <Tabs aria-label="Property details" className="mb-8">
            <Tab key="description" title="Description">
              <div className="p-4">
                <p className="text-gray-700 dark:text-brand-white leading-relaxed mb-6">
                  {property.description}
                </p>

                <h3 className="text-xl dark:text-brand-white font-semibold mb-4">
                  Property Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 dark:bg-brand-dark p-5 rounded-lg shadow-medium">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <AiOutlineCheckCircle className="text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-brand-white">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>
            <Tab key="details" title="Details">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-medium rounded-lg p-5">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Property ID:</span>{" "}
                      {property.id}
                    </p>
                    <p>
                      <span className="font-medium">Property Type:</span>{" "}
                      {property.propertyType}
                    </p>
                    <p>
                      <span className="font-medium">Year Built:</span>{" "}
                      {property.yearBuilt}
                    </p>
                    <p>
                      <span className="font-medium">Property Status:</span>{" "}
                      {property.status}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Area:</span> {property.area}{" "}
                      sq.ft
                    </p>
                    <p>
                      <span className="font-medium">Bedrooms:</span>{" "}
                      {property.beds}
                    </p>
                    <p>
                      <span className="font-medium">Bathrooms:</span>{" "}
                      {property.baths}
                    </p>
                    <p>
                      <span className="font-medium">Garage:</span> 2 cars
                    </p>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab key="location" title="Location">
              <div className="p-4 h-96 bg-gray-100 rounded-lg">
                {/* Map would be integrated here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map View - {property.address}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Contact Agent */}
          <Card className="mb-8 dark:bg-brand-dark">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold">Contact Agent</h3>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-4 mb-6">
                <Avatar src={property.agent.image} className="w-16 h-16" />
                <div>
                  <h4 className="font-semibold">{property.agent.name}</h4>
                  <div className="flex items-center text-base text-gray-500">
                    <span className="flex items-center gap-1 roboto_medium text-brand-warning">
                      <FaStar className="" /> {property.agent.rating}
                    </span>
                    <span className="mx-2 dark:text-brand-white">•</span>
                    <span className="dark:text-brand-white">
                      {property.agent.properties} properties
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  fullWidth
                  variant="solid"
                  color="primary"
                  startContent={<FaPhone />}
                  className="font-medium"
                >
                  {property.agent.phone}
                </Button>

                <Button
                  fullWidth
                  variant="bordered"
                  startContent={<FaEnvelope />}
                  className="font-medium"
                >
                  Send Message
                </Button>

                <Button
                  fullWidth
                  variant="flat"
                  color="success"
                  startContent={<FaWhatsapp />}
                  className="font-medium"
                >
                  WhatsApp
                </Button>
              </div>

              <Divider className="my-6" />

              <div className="space-y-3">
                <h4 className="font-semibold">Schedule a Viewing</h4>
                <p className="text-sm roboto_medium text-gray-600 dark:text-gray-400 mb-4">
                  Schedule a visit to see this property in person.
                </p>
                <Button fullWidth color="primary" className="font-medium">
                  Request Viewing
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Mortgage Calculator - Fixed Position */}
          <div className=" overflow-y-auto shadow-lg">
            <Card className="  bg-brand-white dark:bg-brand-dark border-gray-200  h-full flex flex-col shadow-md">
              <CardHeader className="bg-brand-white dark:bg-brand-dark text-brand-dark dark:text-brand-white p-6">
                <h3 className="text-lg font-semibold">Mortgage Calculator</h3>
                <p className="text-sm ">Estimate your monthly payments</p>
              </CardHeader>
              <CardBody className="p-6 flex-1 overflow-y-auto">
                <div className="space-y-6">
                  {/* Home Value */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium dark:text-gray-200">
                        Home Value
                      </label>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {formatCurrency(mortgageData.homeValue)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="5000000"
                      step="10000"
                      value={mortgageData.homeValue}
                      onChange={(e) =>
                        handleMortgageChange("homeValue", e.target.value)
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium dark:text-gray-200">
                        Down Payment (
                        {Math.round(
                          (mortgageData.downPayment / mortgageData.homeValue) *
                            100
                        )}
                        %)
                      </label>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {formatCurrency(mortgageData.downPayment)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={mortgageData.homeValue}
                      step="1000"
                      value={mortgageData.downPayment}
                      onChange={(e) =>
                        handleMortgageChange("downPayment", e.target.value)
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-200 mb-2">
                      Loan Term: {mortgageData.loanTerm} years
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[10, 15, 20, 25, 30].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleMortgageChange("loanTerm", term)}
                          className={`py-2 px-3 text-sm rounded-lg transition-colors ${
                            mortgageData.loanTerm === term
                              ? "bg-primary-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {term} yrs
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium dark:text-gray-200">
                        Interest Rate: {mortgageData.interestRate}%
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={mortgageData.interestRate}
                        onChange={(e) =>
                          handleMortgageChange("interestRate", e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gray-50 dark:bg-brand-deepdark p-4 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm dark:text-gray-200">
                          Monthly Payment
                        </p>
                        <p className="text-xl font-bold dark:text-gray-200">
                          {formatCurrency(monthlyPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Interest</p>
                        <p className="text-lg font-semibold">
                          {formatCurrency(totalInterest)}
                        </p>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Total Cost
                          </span>
                          <span className="text-lg font-bold">
                            {formatCurrency(totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      color="primary"
                      className="w-full font-medium"
                      size="lg"
                      startContent={<FaPhone />}
                    >
                      Contact a Mortgage Specialist
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
