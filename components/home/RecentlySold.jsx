"use client";

import SectionHeading from "../common/sectionHeading";
import debounce from "debounce";
import ApiFunction from "../api/apiFunction";
import { useEffect, useState } from "react";
import { getRecentlySoldProperties } from "../api/apiEndpoints";
import PropertyCard from "../properties/PropertyCard";
import PropertyCardSkeleton from "../properties/PropertyCardSkeleton";

export default function RecentlySold() {
  const { get } = ApiFunction();
  const [recentlySold, setRecentlySold] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentlySold = debounce(async () => {
    setIsLoading(true);
    await get(getRecentlySoldProperties)
      .then((res) => {
        if (res?.success) {
          setRecentlySold(res?.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    fetchRecentlySold();
  }, []);

  return (
    <section className="py-20 bg-brand-light dark:bg-brand-dark">
      <div className="lg:container mx-auto px-4">
        <SectionHeading
          tag="RECENTLY SOLD"
          heading1="Recently"
          heading2="Sold Properties"
          description="Take a look at some of our recently sold properties and see the great deals we've secured for our clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Show 3 skeleton loaders
              [1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)
            : recentlySold?.map((property) => (
                <PropertyCard
                  key={property?._id}
                  property={property}
                  showSoldInfo={true}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
