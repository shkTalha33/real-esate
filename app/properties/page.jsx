"use client";

import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyList from "@/components/properties/PropertyList";
import { Select, SelectItem } from "@/components/ui";
import { house9 } from "@/public/assets/images";
import { setSortOption } from "@/redux/slices/propertyFilterSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PropertiesPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    search,
    priceRange,
    rating,
    bedrooms,
    bathrooms,
    hasKitchen,
    sortOption,
    activeFilters,
  } = useSelector((state) => state.propertyFilters);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // In a real app, this would be an API call with the filters
  useEffect(() => {
    console.log("Fetching properties with filters:", activeFilters);
    // Here you would make an API call with the activeFilters
    // For now, we'll just log the filters that would be sent to the API

    // Simulate API call
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // This would be your actual API call
        // const response = await fetch(`/api/properties?${new URLSearchParams(activeFilters)}`);
        // const data = await response.json();
        // setFilteredProperties(data);

        // For demo purposes, we'll just log the filters
        console.log("API would be called with:", activeFilters);

        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFilteredProperties([]); // Empty since we're not actually fetching
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [activeFilters]);

  // Skeleton loader component
  const PropertySkeleton = () => (
    <div className="bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-md">
      <div className="h-56 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-3 gap-4 my-4 py-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1 animate-pulse"></div>
            <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-28"
        style={{ backgroundImage: `url(${house9.src})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl poppins_semibold mb-4">
            Find Your <span className="text-brand-warning">Dream Property</span>
          </h1>
          <p className="text-lg text-white/90 nunito_regular">
            Browse our exclusive collection of premium properties
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <PropertyFilters />
          </div>

          {/* Property List */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                <h2 className="text-2xl poppins_semibold text-dark-900 dark:text-white">
                  {isLoading
                    ? "Loading..."
                    : `${filteredProperties.length} Properties Found`}
                </h2>
                <div className="flex items-center">
                  <label
                    htmlFor="sort"
                    className="text-sm text-gray-600 dark:text-gray-300 mr-2"
                  >
                    Sort by:
                  </label>
                  <Select
                    id="sort"
                    className="w-[200px]"
                    classNames={{
                      trigger:
                        "h-10 min-h-10 bg-white dark:bg-brand-deepdark border-gray-300 dark:border-gray-700",
                      value: "text-sm text-gray-700 dark:text-white",
                    }}
                    selectedKeys={[sortOption]}
                    onChange={(e) => dispatch(setSortOption(e.target.value))}
                  >
                    <SelectItem key="latest" value="latest">
                      Newest First
                    </SelectItem>
                    <SelectItem key="oldest" value="oldest">
                      Oldest First
                    </SelectItem>
                    <SelectItem key="price-high-low" value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem key="price-low-high" value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem key="name-asc" value="name-asc">
                      Name: A to Z
                    </SelectItem>
                    <SelectItem key="name-desc" value="name-desc">
                      Name: Z to A
                    </SelectItem>
                  </Select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <PropertySkeleton key={index} />
                ))}
              </div>
            ) : (
              <PropertyList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
