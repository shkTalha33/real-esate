"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@/components/ui";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PropertyList() {
  const { filteredProperties } = useSelector((state) => state.propertyFilters);

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!filteredProperties || filteredProperties.length === 0) {
    return (
      <Card className="w-full">
        <CardBody className="text-center py-12">
          <p className="text-foreground-500">
            No properties found matching your criteria.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-56">
            <Image
              src={property.images?.[0] || "/placeholder-property.jpg"}
              alt={property.title || "Property"}
              className="w-full h-full object-cover"
              removeWrapper
            />
            <Button
              isIconOnly
              variant="flat"
              className="absolute top-3 right-3 z-10"
              onPress={() => toggleFavorite(property.id)}
            >
              {favorites[property.id] ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-foreground" />
              )}
            </Button>
            {property.isFeatured && (
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Featured
              </div>
            )}
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {property.title || "No Title"}
                </h3>
                <div className="flex items-center text-sm text-foreground-500 mt-1">
                  <IoLocationOutline className="mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {property.location || "Location not specified"}
                  </span>
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="text-lg font-semibold text-primary">
                  ${property.price?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-foreground-400">
                  {property.priceType || ""}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardBody className="py-2">
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-divider">
              <div className="flex flex-col items-center">
                <div className="bg-default-100 dark:bg-default-50 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaBed className="text-primary" />
                </div>
                <span className="text-xs text-foreground-500">
                  {property.bedrooms || 0} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-default-100 dark:bg-default-50 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaBath className="text-primary" />
                </div>
                <span className="text-xs text-foreground-500">
                  {property.bathrooms || 0} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-default-100 dark:bg-default-50 w-10 h-10 rounded-full flex items-center justify-center mb-1">
                  <FaRulerCombined className="text-primary" />
                </div>
                <span className="text-xs text-foreground-500">
                  {property.area ? `${property.area} sqft` : "N/A"}
                </span>
              </div>
            </div>
          </CardBody>
          
          <CardFooter className="pt-2">
            <div className="flex justify-between items-center w-full">
              <div>
                <div className="text-sm font-medium text-foreground">
                  ${property.price?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-foreground-400">
                  {property.priceType || ""}
                </div>
              </div>
              <Button
                href={`/properties/${property.id}`}
                as="a"
                color="primary"
                size="sm"
              >
                View Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
