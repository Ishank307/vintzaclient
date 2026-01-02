"use client"

import { useState } from "react"
import { Star, ChevronDown, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"

// --- Hardcoded Data ---
const REVIEWS_DATA = [
    {
        id: 1,
        rating: 5,
        text: "Absolutely stunning property! The attention to detail in the room decor was impressive. We loved the private balcony view during sunset. The staff went above and beyond to ensure our anniversary was special.",
        author: "Raj Mehta",
        location: "Mumbai",
        date: "2 days ago",
        isoDate: "2025-01-01",
        verified: true,
    },
    {
        id: 2,
        rating: 3,
        text: "The location is beautiful, but the room service was slower than expected. We had to wait over an hour for our dinner. The pool area makes up for it though.",
        author: "Rajeev Singh",
        location: "Pune",
        date: "3 days ago",
        isoDate: "2024-12-31",
        verified: true,
    },
    {
        id: 3,
        rating: 5,
        text: "A true hidden gem. The infinity pool is world-class and the spa treatments were incredibly relaxing. Perfect for a quiet weekend getaway.",
        author: "Rahul Mehta",
        location: "Bangalore",
        date: "1 week ago",
        isoDate: "2024-12-25",
        verified: true,
    },
    {
        id: 4,
        rating: 4,
        text: "Great experience overall. The food at the main restaurant was delicious, though service was a bit slow during peak hours. The rooms are spacious and very clean.",
        author: "Aman Kumar",
        location: "Orissa",
        date: "2 weeks ago",
        isoDate: "2024-12-18",
        verified: false,
    },
    {
        id: 5,
        rating: 4,
        text: "Very comfortable stay. The kids loved the activities club. A bit pricey for the season, but the amenities are top-notch. Would visit again.",
        author: "Venkataswamy",
        location: "Hyderabad",
        date: "3 weeks ago",
        isoDate: "2024-12-15",
        verified: true,
    },
    {
        id: 6,
        rating: 3,
        text: "Decent stay, but not luxury level. The AC in our room was noisy and the WiFi was spotty. Breakfast spread was good however.",
        author: "Ananya Gupta",
        location: "Delhi",
        date: "3 months ago",
        isoDate: "2024-12-11",
        verified: true,
    },
    {
        id: 7,
        rating: 5,
        text: "Unbelievable hospitality! From the moment we arrived, we felt like royalty. The concierge helped us plan a surprise birthday dinner that was flawless.",
        author: "Mohammed Ali",
        location: "Chennai",
        date: "2 years ago",
        isoDate: "2024-12-05",
        verified: true,
    },
]

const FILTERS = ["Most Recent", "Highest Rated", "Verified Only"]

export default function ReviewsContent() {
    const [activeFilter, setActiveFilter] = useState("Most Recent")

    const filteredReviews = REVIEWS_DATA.slice().sort((a, b) => {
        if (activeFilter === "Most Recent") {
            return new Date(b.isoDate) - new Date(a.isoDate)
        }
        if (activeFilter === "Highest Rated") {
            return b.rating - a.rating
        }
        if (activeFilter === "Verified Only") {
            return (b.verified === a.verified) ? 0 : b.verified ? 1 : -1
        }
        return 0
    }).filter(review => {
        if (activeFilter === "Verified Only") {
            return review.verified
        }
        return true
    })

    return (
        <div className="min-h-screen bg-white pb-24 md:max-w-md md:mx-auto md:shadow-xl md:min-h-0 md:h-[90vh] md:overflow-y-auto md:my-8 md:rounded-3xl border-gray-100">
            {/* Header Section */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-100 px-5 pt-12 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Guest Reviews
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Real experiences from our guests
                </p>

                {/* Rating Summary Badge */}
                <div className="flex items-center gap-4 mt-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-4xl font-bold text-gray-900">4.8</span>
                            <div className="flex flex-col justify-center">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-green-600 font-medium mt-0.5">
                                    Excellent
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            Based on 240+ reviews
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="px-5 py-6 overflow-x-auto no-scrollbar">
                <div className="flex gap-3">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === filter
                                ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="px-5 space-y-4">
                {filteredReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}

function ReviewCard({ review }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const isLong = review.text.length > 100

    return (
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col gap-3">
            {/* Top: Stars & Date */}
            <div className="flex justify-between items-start">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                                }`}
                        />
                    ))}
                </div>
                {review.verified && (
                    <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Verified Stay
                    </span>
                )}
            </div>

            {/* Middle: Content */}
            <div
                className="relative"
                onClick={() => isLong && setIsExpanded(!isExpanded)}
            >
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : isLong ? 72 : "auto" }}
                    className={`overflow-hidden text-gray-700 text-sm leading-relaxed ${isLong ? "cursor-pointer" : ""}`}
                >
                    <p>"{review.text}"</p>
                </motion.div>

                {/* Helper text for expanding */}
                {isLong && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                )}
            </div>

            {isLong && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-gray-400 font-medium self-start flex items-center gap-1 hover:text-gray-600"
                >
                    {isExpanded ? "Read less" : "Read more"}
                </button>
            )}

            {/* Bottom: Author Info */}
            <div className="pt-2 border-t border-gray-50 mt-1">
                <h4 className="text-sm font-semibold text-gray-900">{review.author}</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                    {review.location} • {review.date}
                </p>
            </div>
        </div>
    )
}
