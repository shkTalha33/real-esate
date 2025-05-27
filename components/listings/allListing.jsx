"use client";

import { featuredProperties } from "@/data/properties";
import { house1 } from "@/public/assets/images";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../common/sectionHeading";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

export default function AllListings() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-dark">
      <div className="lg:container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl poppins_bold text-dark-900 dark:text-white mb-4">
            My <span className="text-brand-warning">Property</span> Listings
          </h2>
          <p
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 roboto_light"
            style={{ fontSize: "1.125rem" }}
          >
            Easily manage all your property listings in one place. Edit details,
            delete listings, or apply updates with a smooth and user-friendly
            interface.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="group bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={house1}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="bg-white dark:bg-brand-primary text-dark-900 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
                    {property.type}
                  </span>
                </div>
                {/* Price Tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-white/80">Starting From</p>
                      <p className="text-2xl font-bold text-white">
                        {property.price}
                      </p>
                    </div>
                    <div className="flex items-center bg-gradient-to-r text-white from-brand-warning  px-3 py-1 rounded-full roboto_regular">
                      <FaStar className="dark:text-brand-white text-brand-white mr-1" />{" "}
                      <span className="dark:text-brand-white">Featured</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl poppins_semibold text-dark-900 dark:text-white mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <FaMapMarkerAlt className="mr-1.5 text-brand-primary" />
                      <span className="truncate">{property.location}</span>
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
                      {property.beds} Beds
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-1.5">
                      <FaBath className="text-brand-primary text-xl" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {property.baths} Baths
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-1.5">
                      <FaRulerCombined className="text-brand-primary text-lg" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {property.sqft} sqft
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
                      {property.yearBuilt}
                    </p>
                  </div>
                  <button className="text-sm font-medium text-brand-warning hover:text-brand-warningdark transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View All Button
        <div className="text-center mt-16">
          <button className="inline-flex items-center bg-transparent hover:bg-brand-primary text-brand-primary hover:text-white border-2 border-brand-primary hover:border-transparent px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 roboto_medium text-lg">
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
          </button>
        </div> */}
      </div>
    </section>
  );
}
