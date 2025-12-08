"use client";

import { latestProperties } from "@/data/properties";
import { house5 } from "@/public/assets/images";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/sectionHeading";
import ApiFunction from "../api/apiFunction";
import { useEffect, useState } from "react";
import debounce from "debounce";
import { getLatestProperties } from "../api/apiEndpoints";
import moment from "moment";
import { formatCurrency } from "@/utils/formatters";
import { useRouter } from "next/navigation";

// Skeleton loader component for latest properties (horizontal card)
const LatestPropertySkeleton = () => (
  <div className="bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
    {/* Image skeleton */}
    <div className="relative w-full md:w-1/3 h-48 md:h-auto bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="absolute top-4 left-4">
        <div className="bg-gray-300 dark:bg-gray-600 h-6 w-16 rounded-full"></div>
      </div>
    </div>

    {/* Details skeleton */}
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2 animate-pulse"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded ml-4 animate-pulse"></div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/3 rounded mb-4 animate-pulse"></div>

      {/* Features skeleton */}
      <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-dark-600">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between mt-4">
        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded animate-pulse"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function LatestProperties() {
  const { get } = ApiFunction();
  const [latestProperties, setLatestProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchLatestProperties = debounce(async () => {
    setIsLoading(true);
    await get(getLatestProperties)
      .then((res) => {
        if (res?.success) {
          setLatestProperties(res?.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    fetchLatestProperties();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-dark">
      <div className="lg:container mx-auto px-4">
        <SectionHeading
          tag="LATEST PROPERTIES"
          heading1="Latest"
          heading2="Properties"
          description="Discover our latest collection of properties, featuring the most up-to-date listings and the best deals in the market."
        />

        {/* <div className="flex items-center justify-end mb-5">
          <Link
            href="/properties"
            className="inline-flex items-center text-brand-warning hover:text-brand-warningdark roboto_medium"
            style={{ fontSize: "1.0625rem" }}
          >
            View All Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading
            ? // Show 2 skeleton loaders
              [1, 2, 3, 4].map((i) => <LatestPropertySkeleton key={i} />)
            : latestProperties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col md:flex-row"
                >
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={property?.images[0]}
                      alt={property?.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-warning text-white px-3 py-1 rounded-full text-xs poppins_medium">
                      {property?.listingType}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl poppins_semibold text-dark-900 dark:text-white">
                        {property?.title}
                      </h3>
                      <span className="text-brand-warning text-xl poppins_bold">
                        {formatCurrency(property?.price)}
                      </span>
                    </div>
                    <p
                      className="text-gray-600 dark:text-gray-300 roboto_light mb-4"
                      style={{ fontSize: "0.9375rem" }}
                    >
                      {property?.location?.city}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-dark-600">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">🛏️</span>
                        <span className="roboto_light">
                          {property?.bedrooms} Beds
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">🚿</span>
                        <span className="roboto_light">
                          {property?.bathrooms} Baths
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">📏</span>
                        <span className="roboto_light">
                          {property?.size?.value} {property?.size?.unit}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">🏗️</span>
                        <span className="roboto_light">
                          {property?.yearBuilt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 roboto_light">
                        Added: {moment(property?.createdAt).fromNow()}
                      </span>
                      <button
                        className="text-brand-primary hover:text-brand-primary/80 roboto_medium flex items-center"
                        onClick={() =>
                          router.push(`/properties/${property?.slug}`)
                        }
                      >
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            className="inline-flex items-center bg-transparent hover:bg-brand-primary text-brand-primary hover:text-white border-2 border-brand-primary hover:border-transparent px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 roboto_medium text-lg"
            onClick={() => {
              router.push(`/properties`);
            }}
          >
            View Latest Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
