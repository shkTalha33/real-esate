"use client";

import { topSellers } from "@/data/properties";
import { house7 } from "@/public/assets/images";
import Image from "next/image";
import SectionHeading from "../common/sectionHeading";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function TopSellers() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-deepdark">
      <div className="lg:container mx-auto px-4">
        <SectionHeading
          tag="OUR AGENTS"
          heading1="Meet"
          heading2="Our Top Sellers"
          description="Our experienced agents are ready to help you find your dream property."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {topSellers.map((agent) => (
            <div
              key={agent.id}
              className="group bg-white dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Agent Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={house7}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center transition-all hover:-translate-y-1">
                        <FaFacebookF size={14} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center transition-all hover:-translate-y-1">
                        <FaTwitter size={14} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center transition-all hover:-translate-y-1">
                        <FaLinkedinIn size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-brand-warning text-white text-xs font-medium px-3 py-1 rounded-full">
                  Top Rated
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6 text-center">
                <h3 className="text-2xl poppins_bold text-dark-900 dark:text-white mb-1">
                  {agent.name}
                </h3>
                <p className="text-brand-primary roboto_medium mb-4">
                  {agent.role}
                </p>
                
                {/* Rating */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(agent.rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-700"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm roboto_medium">
                    {agent.rating} ({agent.sales}+ Sales)
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FaPhoneAlt className="text-brand-primary mr-2" size={14} />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FaEnvelope className="text-brand-primary mr-2" size={14} />
                    <span className="text-sm truncate">contact@example.com</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white py-2 px-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5">
                    Contact
                  </button>
                  <button className="flex-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-brand-primary border border-brand-primary py-2 px-4 rounded-lg transition-all">
                    View Listings
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center bg-transparent hover:bg-brand-primary text-brand-primary hover:text-white border-2 border-brand-primary hover:border-transparent px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 roboto_medium text-lg">
            View All Agents
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
