"use client";

// import { recentlySold } from "@/data/properties";
import Image from "next/image";
import SectionHeading from "../common/sectionHeading";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaTag,
  FaClock,
} from "react-icons/fa";
import debounce from "debounce";
import ApiFunction from "../api/apiFunction";
import { useEffect, useState } from "react";
import { getRecentlySoldProperties } from "../api/apiEndpoints";
import moment from "moment";
import { formatCurrency } from "@/utils/formatters";

export default function RecentlySold() {
  const { get } = ApiFunction();
  const [recentlySold, setRecentlySold] = useState([]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const fetchRecentlySold = debounce(async () => {
    await get(getRecentlySoldProperties)
      .then((res) => {
        if (res?.success) {
          setRecentlySold(res?.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, 300);

  useEffect(() => {
    fetchRecentlySold();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-deepdark">
      <div className="lg:container mx-auto px-4">
        <SectionHeading
          tag="RECENTLY SOLD"
          heading1="Recently"
          heading2="Sold Properties"
          description="Take a look at some of our recently sold properties and see the great deals we've secured for our clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentlySold?.map((property) => (
            <div
              key={property?._id}
              className="group bg-white dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Property Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={property?.images[0]}
                  alt={property?.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-brand-warning text-white text-xs font-medium px-3 py-1 rounded-full">
                  Sold
                </div>
                {/* Price Tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/80 mb-1">Sold For</p>
                      <p className="text-xl font-bold text-white">
                        {formatCurrency(property?.dispatchPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/80 line-through mb-1">
                        Listed at {formatCurrency(property?.price)}
                      </p>
                      <p className="text-xs text-brand-warning font-medium">
                        <FaTag className="inline mr-1" />
                        {Math.round(
                          (1 -
                            parseFloat(property?.dispatchPrice) /
                              parseFloat(property?.price)) *
                            100
                        )}
                        % Below Ask
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl poppins_semibold text-dark-900 dark:text-white mb-1">
                      {property?.title}
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <FaTag className="mr-1.5 text-brand-primary" />
                      <span>
                        {property?.location?.country},{" "}
                        {property?.location?.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-3 gap-3 my-5 py-4 border-y border-gray-100 dark:border-gray-700">
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

                {/* Sale Details */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-warning/10 rounded-full flex items-center justify-center mr-3">
                      <FaCalendarAlt className="text-brand-warning" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sold On
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {moment(property?.updatedAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-3">
                        <FaClock className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          On Market
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {moment(property?.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
