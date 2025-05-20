"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setPriceRange,
  setRating,
  setBedrooms,
  setBathrooms,
  setHasKitchen,
  resetFilters,
} from "@/redux/slices/propertyFilterSlice";

export default function PropertyFilters() {
  const dispatch = useDispatch();
  const { search, priceRange, rating, bedrooms, bathrooms, hasKitchen } =
    useSelector((state) => state.propertyFilters);

  const [isBedroomsOpen, setIsBedroomsOpen] = useState(true);
  const [isBathroomsOpen, setIsBathroomsOpen] = useState(true);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);

  // Log active filters whenever they change
  useEffect(() => {
    console.log("Active filters:", {
      search,
      priceRange,
      rating,
      bedrooms,
      bathrooms,
      hasKitchen,
    });
  }, [search, priceRange, rating, bedrooms, bathrooms, hasKitchen]);

  const handleBedroomToggle = (bed) => {
    dispatch(setBedrooms(bed));
  };

  const handleBathroomToggle = (bath) => {
    dispatch(setBathrooms(bath));
  };

  const handleRatingChange = (value) => {
    dispatch(setRating(rating === value ? null : value));
  };

  const handlePriceRangeChange = (min, max) => {
    dispatch(setPriceRange({ min, max }));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white dark:bg-brand-deepdark p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl roboto_semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-brand-primary hover:text-brand-primary/80"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <h3 className="text-lg roboto_semibold text-gray-900 dark:text-white mb-4">
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          {search && (
            <button
              onClick={() => dispatch(setSearch(""))}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
        <button
          className="flex justify-between items-center w-full mb-4"
          onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
        >
          <h3 className="roboto_semibold text-gray-800 dark:text-white">
            Price Range
          </h3>
          {isPriceRangeOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </button>

        {isPriceRangeOpen && (
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 roboto_medium">
                  Min
                </label>
                <input
                  type="number"
                  value={priceRange?.min || ""}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      Number(e.target.value),
                      priceRange?.max
                    )
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                  placeholder="Min"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 roboto_medium">
                  Max
                </label>
                <input
                  type="number"
                  value={priceRange?.max || ""}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      priceRange?.min,
                      Number(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
        <h3 className="roboto_semibold text-gray-800 dark:text-white mb-4">
          Rating
        </h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className="focus:outline-none"
              aria-label={`${star} star${star !== 1 ? "s" : ""} or more`}
            >
              <svg
                className={`w-7 h-7 transition-colors ${
                  star <= (rating || 0)
                    ? "text-yellow-400 hover:text-yellow-500"
                    : "text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {rating && `${rating}+ stars`}
        </p>
      </div>

      {/* Bedrooms */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
        <button
          className="flex justify-between items-center w-full mb-4"
          onClick={() => setIsBedroomsOpen(!isBedroomsOpen)}
        >
          <h3 className="roboto_semibold text-gray-800 dark:text-white">
            Bedrooms
          </h3>
          {isBedroomsOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </button>

        {isBedroomsOpen && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, "5+"].map((bed) => (
              <button
                key={bed}
                type="button"
                className={`px-3 py-2 rounded-md text-sm roboto_medium ${
                  bedrooms === bed
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleBedroomToggle(bed)}
              >
                {bed}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bathrooms */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
        <button
          className="flex justify-between items-center w-full mb-4"
          onClick={() => setIsBathroomsOpen(!isBathroomsOpen)}
        >
          <h3 className="robotop/semibold text-gray-800 dark:text-white">
            Bathrooms
          </h3>
          {isBathroomsOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </button>

        {isBathroomsOpen && (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, "5+"].map((bath) => (
              <button
                key={bath}
                type="button"
                className={`px-3 py-2 rounded-md text-sm roboto_medium ${
                  bathrooms === bath
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleBathroomToggle(bath)}
              >
                {bath}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Kitchen */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hasKitchen"
          className="rounded text-brand-primary focus:ring-brand-primary"
          checked={hasKitchen}
          onChange={(e) => dispatch(setHasKitchen(e.target.checked))}
        />
        <label
          htmlFor="hasKitchen"
          className="ml-2 text-sm text-gray-700 dark:text-gray-300"
        >
          Has Kitchen
        </label>
      </div>
    </div>
  );
}
