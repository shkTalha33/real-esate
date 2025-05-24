"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Badge,
  Avatar,
  Chip,
} from "@/components/ui";
import Image from "next/image";
import {
  TbHeart,
  TbHeartFilled,
  TbMapPin,
  TbBed,
  TbBath,
  TbRuler,
  TbCurrencyDollar,
  TbStarFilled,
  TbArrowsShuffle,
  TbZoomIn,
  TbShare2,
  TbRuler2,
} from "react-icons/tb";
import { house11, house12, house14 } from "@/public/assets/images";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";

// Animation variants
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function FavouritesPage() {
  const router = useRouter();
  const [favourites, setFavourites] = useState([
    {
      id: 1,
      title: "Luxury Villa with Ocean View",
      location: "Malibu, California",
      price: 2500000,
      beds: 5,
      baths: 4,
      area: 3200,
      image: house14,
      featured: true,
    },
    {
      id: 2,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      price: 1250000,
      beds: 3,
      baths: 2,
      area: 1800,
      image: house12,
      featured: false,
    },
    {
      id: 3,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: 895000,
      beds: 4,
      baths: 3,
      area: 2400,
      image: house11,
      featured: true,
    },
    {
      id: 4,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: 895000,
      beds: 4,
      baths: 3,
      area: 2400,
      image: house11,
      featured: true,
    },
    {
      id: 5,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: 895000,
      beds: 4,
      baths: 3,
      area: 2400,
      image: house11,
      featured: true,
    },
    {
      id: 6,
      title: "Cozy Mountain Cabin",
      location: "Aspen, Colorado",
      price: 895000,
      beds: 4,
      baths: 3,
      area: 2400,
      image: house11,
      featured: true,
    },
  ]);

  const handleViewDetails = (id) => {
    router.push(`/properties/${id}`);
  };

  const toggleFavourite = (id) => {
    setFavourites(favourites.filter((property) => property.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <span className="bg-brand-primary/10 text-brand-primary text-sm roboto_semibold px-4 py-1.5 rounded-full">
            Your Saved Properties
          </span>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl poppins_semibold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Favorites
          <span className="text-brand-warning"> Properties</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {favourites.length}{" "}
          {favourites.length === 1 ? "property" : "properties"} saved to your
          collection
        </motion.p>
      </div>

      {favourites.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <TbHeart size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl roboto_medium text-gray-900 dark:text-white mb-2">
            No favourites yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save properties you love to see them here
          </p>
          <Button
            color="primary"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white"
          >
            Browse Properties
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {favourites.map((property, index) => (
            <motion.div
              key={property.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Property Image with Overlay */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>

                  {/* Top Right Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-3">
                    <Button
                      isIconOnly
                      size="sm"
                      radius="full"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all transform hover:scale-110"
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavourite(property.id);
                      }}
                    >
                      <TbHeartFilled className="text-red-500 text-xl" />
                    </Button>
                  </div>

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-4 left-4  bg-gradient-to-r text-white from-brand-warning roboto_medium px-3 py-1.5 rounded-full shadow-lg flex items-center">
                      <FaStar className="dark:text-brand-white text-brand-white mr-1" />{" "}
                      <span className="text-brand-white">Featured</span>
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <CardHeader className="flex-col items-start p-6 pb-2">
                  <div className="flex justify-between w-full items-start">
                    <h3 className="text-xl poppins_semibold text-gray-900 dark:text-white line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center bg-brand-primary/10 text-brand-primary dark:text-brand-accent text-lg poppins_semibold px-3 py-1 rounded-full">
                      <TbCurrencyDollar className="mr-1" />
                      {property.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mt-2">
                    <TbMapPin className="mr-1.5 flex-shrink-0 text-brand-primary" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </CardHeader>

                <CardBody className="p-6 pt-0">
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <TbBed className="text-brand-primary text-xl mb-1" />
                      <span className="text-sm roboto_semibold text-gray-700 dark:text-gray-300">
                        {property.beds} Beds
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <TbBath className="text-brand-primary text-xl mb-1" />
                      <span className="text-sm roboto_semibold text-gray-700 dark:text-gray-300">
                        {property.baths} Baths
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <TbRuler2 className="text-brand-primary text-xl mb-1" />
                      <span className="text-sm roboto_semibold text-gray-700 dark:text-gray-300">
                        {property.area} sqft
                      </span>
                    </div>
                  </div>
                </CardBody>

                <CardFooter className="p-6 pt-0">
                  <Button
                    fullWidth
                    className="bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:opacity-90 h-12 roboto_semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                    onClick={() => handleViewDetails(property.id)}
                    endContent={
                      <span className="ml-1 bg-white/20 w-6 h-6 rounded-full flex items-center justify-center">
                        <TbArrowsShuffle size={14} />
                      </span>
                    }
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
