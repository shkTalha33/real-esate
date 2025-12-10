"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Chip,
  Tooltip,
} from "@/components/ui";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaCouch,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  MdElectricBolt,
  MdWaterDrop,
  MdLocalFireDepartment,
} from "react-icons/md";
import { BsBuilding, BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { useRouter } from "next/navigation";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

export default function PropertyList({ data }) {
  const [favorites, setFavorites] = useState({});
  const router = useRouter();

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Get listing type badge styling with gradients
  const getListingTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case "sell":
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-green-600",
          text: "For Sale",
          icon: "💰",
        };
      case "rent":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
          text: "For Rent",
          icon: "🏠",
        };
      default:
        return { bg: "bg-gray-500", text: type || "N/A", icon: "" };
    }
  };

  // Get status badge styling with gradients
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return {
          bg: "bg-gradient-to-r from-teal-400 to-emerald-500",
          text: "Available",
          pulse: true,
        };
      case "sold":
        return {
          bg: "bg-gradient-to-r from-red-500 to-rose-600",
          text: "Sold",
          pulse: false,
        };
      case "rented":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-orange-600",
          text: "Rented",
          pulse: false,
        };
      default:
        return { bg: "bg-gray-500", text: status || "N/A", pulse: false };
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-brand-dark dark:to-brand-deepdark border-0">
        <CardBody className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 rounded-2xl flex items-center justify-center">
            <BsBuilding className="text-5xl text-brand-primary" />
          </div>
          <p className="text-xl text-foreground poppins_semibold mb-2">
            No Properties Found
          </p>
          <p className="text-sm text-foreground-400 roboto_regular">
            Try adjusting your filters to see more results.
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((property) => (
        <PropertyCard key={property?._id} property={property} />
      ))}
    </div>
  );
}
