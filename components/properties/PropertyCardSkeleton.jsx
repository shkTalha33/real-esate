import { Card, CardBody } from "@/components/ui";

// Skeleton loader component for property cards
export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg">
      {/* Image skeleton */}
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700 animate-pulse">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-gray-300 dark:bg-gray-600 h-6 w-20 rounded-full"></div>
        </div>
      </div>

      {/* Details skeleton */}
      <div className="p-5">
        <div className="mb-4">
          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded mb-2 animate-pulse"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/2 rounded animate-pulse"></div>
        </div>

        {/* Features skeleton */}
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-gray-100 dark:border-gray-700 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-3 w-12 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Details row skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="bg-gray-200 dark:bg-gray-700 h-10 w-full rounded animate-pulse"></div>
      </div>
    </div>
  );
}
