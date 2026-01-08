"use client"

import Link from "next/link"
import SearchBar from "@/components/search/SearchBar"
import HotelCard from "@/components/hotel/HotelCard"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import VacationPlanner from "@/components/VacationPlanner"
import Image from "next/image"
import { Suspense, useState, useEffect } from "react"
import BannerCarousel from "@/components/home/BannerCarousel"

export default function HomePage() {
  const [recentSearches, setRecentSearches] = useState([])

  // Load recent searches on mount
  useEffect(() => {
    // Only access localStorage on client
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('recent_searches')
        if (saved) {
          setRecentSearches(JSON.parse(saved))
        }
      } catch (e) {
        console.error("Failed to load recent searches", e)
      }
    }
  }, [])

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

            {/* Quick Search Buttons (Desktop Only) - Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="hidden md:flex justify-center items-center mt-8 gap-4 animate-fade-in-up">
                <span className="text-sm font-medium text-gray-500">Continue your search:</span>
                <div className="flex gap-3">
                  {recentSearches.map((search, index) => (
                    <Link key={index} href={`/search?${search.query}`}>
                      <button className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-md hover:text-primary transition-all duration-300">
                        {search.location}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Promo Banner Section (Carousel) */}
      <section className="py-8 md:py-16 container mx-auto px-4">
        <BannerCarousel />
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
            </div>
          </div>
        </div>
      </section>



      {/* Vacation Planner Section */}
      <VacationPlanner />


    </div>
  )
}