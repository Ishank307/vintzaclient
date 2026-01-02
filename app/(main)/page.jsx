"use client"

import Link from "next/link"
import SearchBar from "@/components/search/SearchBar"
import HotelCard from "@/components/hotel/HotelCard"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import VacationPlanner from "@/components/VacationPlanner"
import Image from "next/image"
import { Suspense, useState } from "react"

const bannerImages = [
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    title: "Adventure Awaits",
    subtitle: "in Dandeli",
    buttonText: "Book Dandeli",
    link: "/search?location=Dandeli, India",
    couponCode: "DANDELI20"
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-6e5a5e3669ca?q=80&w=2070&auto=format&fit=crop",
    title: "Coastal Bliss",
    subtitle: "in Gokarna",
    buttonText: "Book Gokarna",
    link: "/search?location=Gokarna, India",
    couponCode: "GOKARNA15"
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    title: "Vibrant Shores",
    subtitle: "of Goa",
    buttonText: "Book Goa",
    link: "/search?location=Goa, India",
    couponCode: "GOASUMMER"
  }
]

export default function HomePage() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // Reset touch end
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextBanner()
    }
    if (isRightSwipe) {
      prevBanner()
    }
  }

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length)
  }

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-50 text-slate-900 pt-8 md:pt-16 pb-12 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 md:mb-8 text-slate-900 px-2">
            Discover Your Perfect Getaway – Curated Luxury Escapes
          </h1>
          <div className="w-full max-w-7xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Promo Banner Section (Carousel) */}
      <section className="py-8 md:py-16 container mx-auto px-4">
        <div
          className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-900 group"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Banner Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={bannerImages[currentBannerIndex].src}
              alt={`Promotional Banner ${currentBannerIndex + 1}`}
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                {bannerImages[currentBannerIndex].title}
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-4 drop-shadow-lg">
                {bannerImages[currentBannerIndex].subtitle}
              </h2>

              <div className="mb-6 md:mb-8 bg-white/20 backdrop-blur-md inline-block px-4 py-2 rounded-lg border border-white/30">
                <p className="text-sm md:text-base font-medium text-white">
                  Use Code: <span className="font-bold text-yellow-300 ml-1">{bannerImages[currentBannerIndex].couponCode}</span>
                </p>
              </div>

              <div>
                <Link href={bannerImages[currentBannerIndex].link}>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-md shadow-lg transition-transform hover:scale-105">
                    {bannerImages[currentBannerIndex].buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
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

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentBannerIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Second Promo Banner Section */}
      <section className="pb-8 md:pb-16 container mx-auto px-4">
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-900">
          {/* Resort Image on the right */}
          <div className="absolute top-0 bottom-0 right-0 w-full md:w-1/2 opacity-40 md:opacity-100">
            <Image
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
              alt="Nature Retreat"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 h-full flex items-center px-6 sm:px-8 md:px-12">
            <div className="text-white max-w-md">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">Explore our</h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">Nature Trails</h2>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-md">
                View Packages
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Vacation Planner Section */}
      <VacationPlanner />


    </div>
  )
}