"use client";

import { useState, useEffect } from "react";
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
import { Button, Card, CardBody, Input, Slider } from "@/components/ui";
import { HiMinus, HiPlus, HiSearch, HiX, HiStar } from "react-icons/hi";

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
    <Card className="w-full">
      <CardBody className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl roboto_regular text-foreground">Filters</h2>
          <Button
            variant="light"
            size="sm"
            onClick={handleClearFilters}
            className="text-sm"
          >
            Clear all
          </Button>
        </div>

        {/* Search */}
        <div className="w-min-[300px] max-w-[350px]">
          <h3 className="text-base roboto_regular text-foreground mb-3">
            Search
          </h3>
          <Input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            startContent={<HiSearch className="text-default-400 h-5 w-5" />}
            endContent={
              search && (
                <button
                  onClick={() => dispatch(setSearch(""))}
                  className="text-default-400 hover:text-foreground"
                >
                  <HiX className="h-4 w-4" />
                </button>
              )
            }
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div className="border-b border-divider pb-6">
          <button
            className="flex justify-between items-center w-full mb-3"
            onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
          >
            <h3 className="roboto_regular text-base text-foreground">
              Price Range
            </h3>
            {isPriceRangeOpen ? <HiMinus size={18} /> : <HiPlus size={18} />}
          </button>

          {isPriceRangeOpen && (
            <div className="space-y-4">
              <div className="flex items-center justify-start gap-4">
                <div className="min-w-[50px]">
                  <label className="block text-sm text-foreground-500  mb-1.5">
                    Min
                  </label>
                  <Input
                    type="number"
                    value={priceRange?.min || ""}
                    onChange={(e) =>
                      handlePriceRangeChange(
                        Number(e.target.value) || 0,
                        priceRange?.max
                      )
                    }
                    placeholder="Min"
                    size="sm"
                  />
                </div>
                <div className="min-w-[50px]">
                  <label className="block text-sm text-foreground-500 mb-1.5">
                    Max
                  </label>
                  <Input
                    type="number"
                    value={priceRange?.max || ""}
                    onChange={(e) =>
                      handlePriceRangeChange(
                        priceRange?.min,
                        Number(e.target.value) || 1000000
                      )
                    }
                    placeholder="Max"
                    size="sm"
                  />
                </div>
              </div>
              <div className="px-2">
                <Slider
                  size="sm"
                  step={10000}
                  minValue={0}
                  maxValue={1000000}
                  value={[priceRange?.min || 0, priceRange?.max || 1000000]}
                  onChange={([min, max]) => handlePriceRangeChange(min, max)}
                  className="max-w-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="border-b border-divider pb-6">
          <h3 className="roboto_regular text-base text-foreground mb-1">
            Rating
          </h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                isIconOnly
                variant="light"
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${
                  star <= (rating || 0) ? "text-yellow-400" : "text-default-300"
                }`}
                aria-label={`${star} star${star !== 1 ? "s" : ""} or more`}
              >
                <HiStar className="h-8 w-8" />
              </Button>
            ))}
          </div>
          {rating && (
            <p className="mt-2 text-sm text-foreground-500">{rating}+ stars</p>
          )}
        </div>

        {/* Bedrooms */}
        <div className="border-b border-divider pb-6">
          <button
            className="flex justify-between items-center w-full mb-3"
            onClick={() => setIsBedroomsOpen(!isBedroomsOpen)}
          >
            <h3 className="roboto_regular text-base text-foreground">
              Bedrooms
            </h3>
            {isBedroomsOpen ? <HiMinus size={18} /> : <HiPlus size={18} />}
          </button>

          {isBedroomsOpen && (
            <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-5 gap-2">
              {[1, 2, 3, 4, "5+"].map((bed) => (
                <Button
                  key={bed}
                  size="sm"
                  variant={bedrooms === bed ? "solid" : "flat"}
                  color={bedrooms === bed ? "primary" : "default"}
                  onPress={() => handleBedroomToggle(bed)}
                  className="min-w-12 min-h-12 lg:min-w-10 lg:min-h-10 poppins_medium text-base"
                >
                  {bed}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Bathrooms */}
        <div className="border-b border-divider pb-6">
          <button
            className="flex justify-between items-center w-full mb-3"
            onClick={() => setIsBathroomsOpen(!isBathroomsOpen)}
          >
            <h3 className="roboto_regular text-base text-foreground">
              Bathrooms
            </h3>
            {isBathroomsOpen ? <HiMinus size={18} /> : <HiPlus size={18} />}
          </button>

          {isBathroomsOpen && (
            <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-5 gap-2">
              {[1, 2, 3, 4, "5+"].map((bath) => (
                <Button
                  key={bath}
                  size="sm"
                  variant={bathrooms === bath ? "solid" : "flat"}
                  color={bathrooms === bath ? "primary" : "default"}
                  onPress={() => handleBathroomToggle(bath)}
                  className="min-w-12 min-h-12 lg:min-w-10 lg:min-h-10 poppins_medium text-base"
                >
                  {bath}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Kitchen */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-500">Has Kitchen</span>
          <Button
            isIconOnly
            variant="light"
            onPress={() => dispatch(setHasKitchen(!hasKitchen))}
            className={hasKitchen ? "bg-primary/20" : ""}
          >
            {hasKitchen ? "✓" : ""}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
