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
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { deleteListing, myListings } from "../api/apiEndpoints";
import ApiFunction from "../api/apiFunction";
import { formatCurrency } from "@/utils/formatters";
import { Pagination } from "@heroui/pagination";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@/components/ui";
import { toast } from "react-hot-toast";
import { handleError } from "../api/errorHandler";
import Link from "next/link";

export default function AllListings() {
  const { get, put } = ApiFunction();
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const handleChangePagination = (page) => {
    setCurrentPage(page);
  };

  const fetchListings = debounce(async () => {
    setIsLoading(true);
    await get(`${myListings}?page=${currentPage}`)
      .then((response) => {
        if (response?.success) {
          setListings(response?.data?.listings || []);
          setPagination(response?.data?.pagination);
        }
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      const response = await put(`${deleteListing}/${propertyToDelete.slug}`);
      if (response?.success) {
        toast.success(response.message || "Listing deleted successfully");
        fetchListings(); // Refresh the list
        onOpenChange(false); // Close modal
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete listing");
    } finally {
      setPropertyToDelete(null);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [currentPage]);

  // Skeleton loader component
  const PropertySkeleton = () => (
    <div className="group bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg">
      {/* Image Skeleton */}
      <div className="relative h-64">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 rounded-md mb-3" />
        <Skeleton className="h-4 w-1/2 rounded-md mb-4" />

        {/* Features Skeleton */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-gray-100 dark:border-gray-700">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="w-12 h-12 mx-auto rounded-full mb-1.5" />
              <Skeleton className="h-4 w-16 mx-auto rounded-md" />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="col-span-full text-center py-20">
      <div className="max-w-md mx-auto">
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <FaMapMarkerAlt className="text-6xl text-gray-400" />
        </div>
        <h3 className="text-2xl poppins_semibold text-gray-900 dark:text-white mb-3">
          No Listings Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 roboto_regular">
          You haven't created any property listings yet. Start by adding your
          first property!
        </p>
        <Link
          href="/settings/add-listing"
          className="inline-block bg-brand-warning hover:bg-brand-warningdark text-white px-6 py-3 rounded-lg transition-colors roboto_medium"
        >
          Add Your First Listing
        </Link>
      </div>
    </div>
  );

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

        {/* Results Count */}
        {!isLoading && listings.length > 0 && (
          <div className="mb-6">
            <Card>
              <CardBody>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl roboto_medium text-foreground">
                    {pagination?.totalListings || listings.length}{" "}
                    {pagination?.totalListings === 1 ? "Listing" : "Listings"}{" "}
                    Found
                  </h3>
                  <Link
                    href="/settings/add-listing"
                    className="bg-brand-warning hover:bg-brand-warningdark text-white px-4 py-2 rounded-lg transition-colors roboto_medium text-sm"
                  >
                    + Add New Listing
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((property) => (
                <div
                  key={property?._id}
                  className="group bg-white dark:bg-brand-deepdark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                >
                  {/* Property Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property?.images?.[0] || house1}
                      alt={property?.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className="bg-white dark:bg-brand-primary text-dark-900 dark:text-white text-xs font-medium px-3 py-1 rounded-full">
                        {property?.listingType}
                      </span>
                      {property?.status && (
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            property.status === "active"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {property.status}
                        </span>
                      )}
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
                        {property?.isFeatured && (
                          <div className="flex items-center bg-gradient-to-r text-white from-brand-warning px-3 py-1 rounded-full roboto_regular">
                            <FaStar className="dark:text-brand-white text-brand-white mr-1" />{" "}
                            <span className="dark:text-brand-white">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl poppins_semibold text-dark-900 dark:text-white mb-2 line-clamp-1">
                          {property?.title}
                        </h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <FaMapMarkerAlt className="mr-1.5 text-brand-primary" />
                          <span className="truncate">
                            {property?.location?.city},{" "}
                            {property?.location?.country}
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

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/properties/${property?.slug}`}
                        className="flex-1 text-center bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg transition-colors roboto_medium text-sm"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/settings/add-listing?slug=${property?.slug}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center p-0"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => handleDeleteClick(property)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  showShadow
                  color="primary"
                  showControls
                  page={currentPage}
                  total={pagination.totalPages}
                  onChange={handleChangePagination}
                />
              </div>
            )}
          </>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Listing
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete{" "}
                  <span className="font-bold">{propertyToDelete?.title}</span>?
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleConfirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
