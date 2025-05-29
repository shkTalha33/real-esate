"use client";

import { topSellers } from "@/data/properties";
import { house7 } from "@/public/assets/images";
import Image from "next/image";
import SectionHeading from "../common/sectionHeading";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Button } from "@/components/ui";
import ApiFunction from "../api/apiFunction";
import { useEffect, useState } from "react";
import debounce from "debounce";
import { getTopSellers } from "../api/apiEndpoints";

export default function TopSellers() {
  const { get } = ApiFunction();
  const [topSellers, setTopSellers] = useState();
  const fetchTopSellers = debounce(async () => {
    await get(getTopSellers)
      .then((res) => {
        if (res?.success) {
          setTopSellers(res?.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, 300);
  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-deepdark">
      <div className="lg:container mx-auto px-4">
        <SectionHeading
          tag="OUR AGENTS"
          heading1="Meet"
          heading2="Our Top Sellers"
          description="Our experienced agents are ready to help you find your dream property."
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {topSellers?.map((agent) => (
            <div
              key={agent._id}
              className="group bg-white dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Agent Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={agent?.avatar || house7}
                  alt={agent?.fullname}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-center space-x-3">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-warningdark text-white flex items-center justify-center transition-all hover:-translate-y-1"
                      >
                        <FaFacebookF size={14} />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-warningdark text-white flex items-center justify-center transition-all hover:-translate-y-1"
                      >
                        <FaTwitter size={14} />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-warningdark text-white flex items-center justify-center transition-all hover:-translate-y-1"
                      >
                        <FaLinkedinIn size={14} />
                      </a>
                    </div>
                  </div>
                </div> */}
                <div className="absolute top-4 right-4 bg-brand-warning text-white text-xs font-medium px-3 py-1 rounded-full">
                  Top Rated
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6 text-center">
                <h3 className="text-2xl poppins_semibold text-dark-900 dark:text-white mb-1">
                  {agent?.fullname}
                </h3>
                <h3 className="text-lg poppins_semibold text-dark-900 dark:text-white mb-1">
                  @{agent?.username}
                </h3>
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FaPhoneAlt className="text-brand-warning mr-2" size={14} />
                    <span className="text-base"> {agent?.phone}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FaEnvelope className="text-brand-warning mr-2" size={14} />
                    <span className="text-base truncate">{agent?.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex space-x-3 justify-center">
                  <Button className=" bg-transparent hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white hover:shadow-lg text-brand-primary hover border border-brand-primary py-2 px-4 rounded-md transition-all roboto_medium">
                    View Listings
                  </Button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
