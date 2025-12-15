import { Card, CardBody, Image, Button, Tooltip } from "@/components/ui";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaCouch,
  FaClock,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdElectricBolt,
  MdWaterDrop,
  MdLocalFireDepartment,
} from "react-icons/md";
import { BsBuilding, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function PropertyCard({ property, showSoldInfo = false }) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden border-0 bg-white dark:bg-brand-deepdark shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:shadow-brand-primary/20 transition-all duration-500 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images?.[0] || "/placeholder-property.jpg"}
          alt={property.title || "Property"}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          removeWrapper
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title & Price Row */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg poppins_semibold text-foreground line-clamp-1 capitalize group-hover:text-brand-primary transition-colors duration-300 flex-1">
            {property?.title || "No Title"}
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="text-lg poppins_regular dark:text-brand-light text-brand-dark whitespace-nowrap">
              ${property?.price?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-foreground-500 mb-4">
          <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center mr-2">
            <IoLocationOutline className="text-brand-primary text-sm shrink-0" />
          </div>
          <span className="truncate capitalize roboto_regular">
            {property.location?.address
              ? `${property.location.address}, ${property.location.city}`
              : property.location?.city || "Location not specified"}
          </span>
        </div>

        {/* Features Grid - Simple with orange icons */}
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-divider mb-4">
          <div className="flex flex-col items-center">
            <FaBed className="text-brand-warning text-lg mb-1" />
            <span className="text-xs text-foreground-500 poppins_medium">
              {property?.bedrooms || 0} Beds
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaBath className="text-brand-warning text-lg mb-1" />
            <span className="text-xs text-foreground-500 poppins_medium">
              {property?.bathrooms || 0} Baths
            </span>
          </div>
          <div className="flex flex-col items-center">
            <FaRulerCombined className="text-brand-warning text-lg mb-1" />
            <span className="text-xs text-foreground-500 poppins_medium">
              {property?.size?.value || 0} {property?.size?.unit || "sqft"}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <BsBuilding className="text-brand-warning text-lg mb-1" />
            <span className="text-xs text-foreground-500 poppins_medium">
              {property?.floors || 1} Floor{property?.floors > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Details Row */}
        <div className="flex items-center justify-between text-xs mb-4">
          {/* Year & Furnishing */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-foreground-500 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
              <FaCalendarAlt className="text-brand-primary shrink-0 text-xs" />
              <span className="poppins_medium text-xs">
                {property?.yearBuilt || "N/A"}
              </span>
            </div>
            {property?.furnishingStatus && (
              <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                <FaCouch className="text-brand-primary text-sm shrink-0" />
                <span className="text-foreground-500 text-xs capitalize poppins_medium">
                  {property.furnishingStatus}
                </span>
              </div>
            )}
          </div>

          {/* Utilities - Simple icons */}
          <div className="flex items-center gap-2">
            <Tooltip
              content={
                property?.utilities?.hasElectricity
                  ? "Electricity ✓"
                  : "No Electricity"
              }
            >
              <div className="flex items-center gap-1">
                <MdElectricBolt
                  className={`text-lg ${
                    property?.utilities?.hasElectricity
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </div>
            </Tooltip>
            <Tooltip
              content={property?.utilities?.hasWater ? "Water ✓" : "No Water"}
            >
              <div className="flex items-center gap-1">
                <MdWaterDrop
                  className={`text-lg ${
                    property?.utilities?.hasWater
                      ? "text-blue-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </div>
            </Tooltip>
            <Tooltip content={property?.utilities?.hasGas ? "Gas ✓" : "No Gas"}>
              <div className="flex items-center gap-1">
                <MdLocalFireDepartment
                  className={`text-lg ${
                    property?.utilities?.hasGas
                      ? "text-orange-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Sold Info - Only shown when showSoldInfo is true */}
        {showSoldInfo && (
          <div className="flex justify-between items-center mb-4 py-3 border-t border-divider">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-warning/10 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-brand-warning text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-foreground-400 poppins_regular">
                  Sold On
                </p>
                <p className="text-xs poppins_medium text-foreground">
                  {moment(property?.updatedAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                <FaClock className="text-brand-primary text-sm" />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-foreground-400 poppins_regular">
                  On Market
                </p>
                <p className="text-xs poppins_medium text-foreground">
                  {moment(property?.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          onClick={() => router.push(`/properties/${property?.slug}`)}
          className="w-full h-10 bg-brand-primary text-white roboto_medium text-base group/btn transition-all duration-500 shadow-lg"
          size="md"
        >
          <span>View Details</span>
          <BsArrowRight className="ml-2 text-lg group-hover/btn:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
}
