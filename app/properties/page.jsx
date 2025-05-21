"use client";

import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyList from "@/components/properties/PropertyList";
import {
  Card,
  CardBody,
  Container,
  Select,
  SelectItem,
  Skeleton,
} from "@/components/ui";
import { house9 } from "@/public/assets/images";
import { setSortOption } from "@/redux/slices/propertyFilterSlice";
import Image from "next/image";
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
    <Card className="w-full">
      <Skeleton className="h-56 w-full rounded-none" />
      <CardBody className="p-5">
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
          <div className="grid grid-cols-3 gap-4 my-4 py-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-10 h-10 rounded-full mb-2" />
                <Skeleton className="h-3 w-3/4 rounded-md" />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="space-y-1">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-2.5 w-20 rounded-md" />
            </div>
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen container mx-auto bg-gray-50 dark:bg-brand-dark">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={house9.src}
          alt="Properties Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center lg:container">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find Your <span className="text-yellow-400">Dream Property</span>
            </h1>
            <p className="text-lg text-white/90">
              Browse our exclusive collection of premium properties
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <PropertyFilters />
          </div>

          {/* Property List */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <Card className="mb-8">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {isLoading ? (
                      <Skeleton className="h-8 w-48 rounded-md" />
                    ) : (
                      `${filteredProperties.length} Properties Found`
                    )}
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground-500">
                      Sort by:
                    </span>
                    <Select
                      size="sm"
                      className="min-w-[180px]"
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
              </CardBody>
            </Card>

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
