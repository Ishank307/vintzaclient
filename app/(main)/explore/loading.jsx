
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <SectionSkeleton />
            <SectionSkeleton />
        </div>
    )
}

function SectionSkeleton() {
    return (
        <div className="mb-16">
            {/* Header Skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>

            {/* List Skeleton */}
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                        {/* Image Skeleton */}
                        <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>

                        {/* Content Skeleton */}
                        <div className="flex-1 space-y-3 py-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                                </div>
                                <div className="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
                            </div>

                            <div className="flex gap-2">
                                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                            </div>

                            <div className="flex justify-between items-end pt-2">
                                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
