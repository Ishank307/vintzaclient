"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getBanners, getImageUrl } from "@/lib/api"

export default function BannerCarousel() {
    const [banners, setBanners] = useState([])
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // Touch handling state
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const minSwipeDistance = 50

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await getBanners()
                // Ensure data is array and active
                if (Array.isArray(data)) {
                    setBanners(data.filter(b => b.active))
                }
            } catch (error) {
                console.error("Failed to load banners", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBanners()
    }, [])

    const [isPlaying, setIsPlaying] = useState(true)

    // Auto-play
    useEffect(() => {
        if (!isPlaying || banners.length <= 1) return

        const timer = setInterval(() => {
            nextBanner()
        }, 5000)

        return () => clearInterval(timer)
    }, [isPlaying, banners.length, currentBannerIndex]) // Re-run when index changes to reset timer

    const onTouchStart = (e) => {
        setIsPlaying(false) // Pause on touch
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        setIsPlaying(true) // Resume on touch end
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) nextBanner()
        if (isRightSwipe) prevBanner()
    }

    const nextBanner = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
    }

    const prevBanner = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)
    }

    if (isLoading) {
        return (
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-400 font-medium">Loading offers...</span>
            </div>
        )
    }

    if (banners.length === 0) {
        // Fallback or empty state? For now, render nothing or a default static banner strictly as fallback?
        // Let's render nothing to avoid clutter if API fails.
        return null
    }

    const currentBanner = banners[currentBannerIndex]

    // Construct link - backend might provide one in future, for now standard search or based on title?
    // User data example doesn't show a link field, only title, code, image, active.
    // I'll default to a generic search or hash for now.
    const bannerLink = "/search?location=Dandeli"

    return (
        <div
            className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-900 group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
        >
            {/* Banner Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={getImageUrl(currentBanner.image)}
                    alt={currentBanner.title || "Promotional Banner"}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 h-full flex items-center px-6 sm:px-8 md:px-12">
                <div className="text-white max-w-md animate-fade-in-up">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg leading-tight">
                        {currentBanner.title}
                    </h2>
                    {/* Backend data doesn't seem to have subtitle, so omitting or using title logic if needed */}

                    {currentBanner.code && (
                        <div className="mb-6 md:mb-8 bg-white/20 backdrop-blur-md inline-block px-4 py-2 rounded-lg border border-white/30">
                            <p className="text-sm md:text-base font-medium text-white">
                                Use Code: <span className="font-bold text-yellow-300 ml-1">{currentBanner.code}</span>
                            </p>
                        </div>
                    )}

                    {/* <div>
                        <Link href={bannerLink}>
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-md shadow-lg transition-transform hover:scale-105">
                                Book Now
                            </Button>
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Navigation Arrows (only if more than 1) */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prevBanner}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                        aria-label="Previous banner"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={nextBanner}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                        aria-label="Next banner"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentBannerIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentBannerIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
