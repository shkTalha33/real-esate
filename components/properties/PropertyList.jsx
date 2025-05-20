"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PropertyList() {
  const { filteredProperties } = useSelector((state) => state.propertyFilters);

  if (!filteredProperties || filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No properties found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <div
          key={property.id}
          className="bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-56">
            <Image
              src={property.images?.[0] || "/placeholder-property.jpg"}
              alt={property.title || "Property"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full cursor-pointer">
              <FaRegHeart className="text-gray-600 dark:text-gray-300" />
            </div>
            {property.isFeatured && (
              <div className="absolute top-3 left-3 bg-brand-primary text-white text-xs roboto_medium px-2.5 py-0.5 rounded">
                Featured
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg poppins_semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {property.title || "No Title"}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <IoLocationOutline className="mr-1" />
                  <span className="line-clamp-1">
                    {property.location || "Location not specified"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg roboto_semibold text-brand-primary">
                  ${property.price?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {property.priceType || ""}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-4 py-3 border-t border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaBed className="text-brand-primary" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {property.bedrooms || 0}{" "}
                  {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaBath className="text-brand-primary" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {property.bathrooms || 0}{" "}
                  {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaRulerCombined className="text-brand-primary" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {property.area ? `${property.area} sqft` : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm roboto_medium text-gray-900 dark:text-white">
                  ${property.price?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {property.priceType || ""}
                </div>
              </div>
              <Link
                href={`/properties/${property.id}`}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white text-sm nunito_medium rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
