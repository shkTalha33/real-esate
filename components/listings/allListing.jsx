"use client";

import { house1 } from "@/public/assets/images";
import debounce from "debounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaStar,
} from "react-icons/fa";
import { myListings } from "../api/apiEndpoints";
import ApiFunction from "../api/apiFunction";
import { formatCurrency } from "@/utils/formatters";
import { Pagination } from "@heroui/pagination";
export default function AllListings() {
  const { get } = ApiFunction();
  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChnagePagination = (page) => {
    setCurrentPage(page);
  };

  const fetchListings = debounce(async () => {
    await get(`${myListings}?page=${currentPage}`)
      .then((response) => {
        setListings(response?.data?.listings);
        setTotalPages(response?.data?.pagination?.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  useEffect(() => {
    fetchListings();
  }, [currentPage]);

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
          {listings.map((property) => (
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
                  <span className="bg-white dark:bg-brand-primary text-dark-900 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
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
                      {property?.title}
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <FaMapMarkerAlt className="mr-1.5 text-brand-primary" />
                      <span className="truncate">
                        {property?.location?.country} {property?.location?.city}
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
                  <button className="text-sm font-medium text-brand-warning hover:text-brand-warningdark transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Pagination
            showShadow
            className=""
            color="primary"
            initialPage={currentPage}
            total={totalPages}
            onChange={handleChnagePagination}
          />
        </div>
      </div>
    </section>
  );
}
