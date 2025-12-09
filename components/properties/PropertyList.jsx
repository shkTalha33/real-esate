"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Chip,
  Tooltip,
} from "@/components/ui";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaCouch,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  MdElectricBolt,
  MdWaterDrop,
  MdLocalFireDepartment,
} from "react-icons/md";
import { BsBuilding, BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { useRouter } from "next/navigation";

export default function PropertyList({ data }) {
  const [favorites, setFavorites] = useState({});
  const router = useRouter();

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Get listing type badge styling with gradients
  const getListingTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case "sell":
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-green-600",
          text: "For Sale",
          icon: "💰",
        };
      case "rent":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
          text: "For Rent",
          icon: "🏠",
        };
      default:
        return { bg: "bg-gray-500", text: type || "N/A", icon: "" };
    }
  };

  // Get status badge styling with gradients
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return {
          bg: "bg-gradient-to-r from-teal-400 to-emerald-500",
          text: "Available",
          pulse: true,
        };
      case "sold":
        return {
          bg: "bg-gradient-to-r from-red-500 to-rose-600",
          text: "Sold",
          pulse: false,
        };
      case "rented":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-orange-600",
          text: "Rented",
          pulse: false,
        };
      default:
        return { bg: "bg-gray-500", text: status || "N/A", pulse: false };
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-brand-dark dark:to-brand-deepdark border-0">
        <CardBody className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 rounded-2xl flex items-center justify-center">
            <BsBuilding className="text-5xl text-brand-primary" />
          </div>
          <p className="text-xl text-foreground poppins_semibold mb-2">
            No Properties Found
          </p>
          <p className="text-sm text-foreground-400 roboto_regular">
            Try adjusting your filters to see more results.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((property) => {
        return (
          <Card
            key={property?._id}
            className="overflow-hidden border-0 bg-white dark:bg-brand-dark shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:shadow-brand-primary/20 transition-all duration-500 group"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={property.images?.[0] || "/placeholder-property.jpg"}
                alt={property.title || "Property"}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                removeWrapper
              />
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Title & Location */}
              <div className="mb-4">
                <h3 className="text-lg poppins_semibold text-foreground line-clamp-1 capitalize group-hover:text-brand-primary transition-colors duration-300">
                  {property?.title || "No Title"}
                </h3>
                <div className="flex items-center text-sm text-foreground-500 mt-2">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center mr-2">
                    <IoLocationOutline className="text-brand-primary text-sm shrink-0" />
                  </div>
                  <span className="truncate capitalize roboto_regular">
                    {property.location?.address
                      ? `${property.location.address}, ${property.location.city}`
                      : property.location?.city || "Location not specified"}
                  </span>
                </div>
              </div>

              {/* Features Grid - Simple with orange icons */}
              <div className="grid grid-cols-4 gap-2 py-3 border-y border-divider mb-4">
                <div className="flex flex-col items-center">
                  <FaBed className="text-brand-warning text-lg mb-1" />
                  <span className="text-xs text-foreground-500 font-medium">
                    {property?.bedrooms || 0} Beds
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <FaBath className="text-brand-warning text-lg mb-1" />
                  <span className="text-xs text-foreground-500 font-medium">
                    {property?.bathrooms || 0} Baths
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <FaRulerCombined className="text-brand-warning text-lg mb-1" />
                  <span className="text-xs text-foreground-500 font-medium">
                    {property?.size?.value || 0}{" "}
                    {property?.size?.unit || "sqft"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <BsBuilding className="text-brand-warning text-lg mb-1" />
                  <span className="text-xs text-foreground-500 font-medium">
                    {property?.floors || 1} Floor
                    {property?.floors > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Details Row */}
              <div className="flex items-center justify-between text-xs mb-4">
                {/* Year & Furnishing */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-foreground-500 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                    <FaCalendarAlt className="text-brand-primary shrink-0 text-xs" />
                    <span className="font-semibold text-xs">
                      {property?.yearBuilt || "N/A"}
                    </span>
                  </div>
                  {property?.furnishingStatus && (
                    <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                      <FaCouch className="text-brand-primary text-sm shrink-0" />
                      <span className="text-foreground-500 text-xs capitalize font-semibold">
                        {property.furnishingStatus}
                      </span>
                    </div>
                  )}
                </div>

                {/* Utilities - Simple icons */}
                <div className="flex items-center gap-2">
                  <Tooltip
                    content={
                      property?.utilities?.hasElectricity
                        ? "Electricity ✓"
                        : "No Electricity"
                    }
                  >
                    <div className="flex items-center gap-1">
                      <MdElectricBolt
                        className={`text-lg ${
                          property?.utilities?.hasElectricity
                            ? "text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip
                    content={
                      property?.utilities?.hasWater ? "Water ✓" : "No Water"
                    }
                  >
                    <div className="flex items-center gap-1">
                      <MdWaterDrop
                        className={`text-lg ${
                          property?.utilities?.hasWater
                            ? "text-blue-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip
                    content={property?.utilities?.hasGas ? "Gas ✓" : "No Gas"}
                  >
                    <div className="flex items-center gap-1">
                      <MdLocalFireDepartment
                        className={`text-lg ${
                          property?.utilities?.hasGas
                            ? "text-orange-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Amenities */}
              {/* {property?.amenities && property.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-[11px] px-3 py-1.5 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full capitalize font-semibold"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-[11px] px-3 py-1.5 bg-gradient-to-r from-brand-primary to-indigo-600 text-white rounded-full font-semibold shadow-sm">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              )} */}

              {/* CTA Button */}
              <Button
                onClick={() => router.push(`/properties/${property?.slug}`)}
                className="w-full h-10 bg-brand-primary text-white roboto_medium text-base group/btn transition-all duration-500 shadow-lg"
                size="md"
              >
                <span>View Details</span>
                <BsArrowRight className="ml-2 text-lg group-hover/btn:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
