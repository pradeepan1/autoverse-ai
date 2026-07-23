import { SkeletonBox as Skeleton } from "@/components/ui/Skeleton";

export function CarDetailsSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-12 animate-in fade-in duration-500">
      <div className="av-container">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Gallery Skeleton */}
            <div className="w-full">
              <Skeleton className="w-full aspect-[16/9] rounded-2xl" />
              <div className="flex gap-2 mt-4 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-24 aspect-[16/9] rounded-lg flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Header Skeleton */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-64 md:w-96" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="flex flex-col md:items-end space-y-2">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[var(--border-color)]">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Specs Skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-[var(--border-color)]">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-8">
            <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
              <div className="h-px bg-[var(--border-color)] w-full my-2" />
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-16 w-full rounded-md" />
            </div>

            {/* Dealer Card Skeleton */}
            <div className="rounded-2xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <Skeleton className="w-16 h-16 rounded-xl" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
