import Link from "next/link"
import { Button } from "@/components/ui/Button"
import DatePicker from "@/components/ui/DatePicker"
import GuestPicker from "@/components/ui/GuestPicker"
import LocationPopover from "@/components/search/LocationPopover"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"

import { useSearchParams } from "next/navigation"
import { parseISO } from "date-fns"


export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Popover states
    const [showLocation, setShowLocation] = useState(false)
    const [showDates, setShowDates] = useState(false)
    const [showGuests, setShowGuests] = useState(false)
    const [location, setLocation] = useState(
        searchParams.get("location") || "Dandeli, India"
    )

    const [checkInDate, setCheckInDate] = useState(
        searchParams.get("check_in")
            ? parseISO(searchParams.get("check_in"))
            : new Date()
    )

    const [checkOutDate, setCheckOutDate] = useState(
        searchParams.get("check_out")
            ? parseISO(searchParams.get("check_out"))
            : addDays(new Date(), 1)
    )

    // Simplified state: just track total guests
    const [guests, setGuests] = useState(
        Number(searchParams.get("guests")) || 2
    )
    const [maleCount, setMaleCount] = useState(
        Number(searchParams.get("male")) || (Number(searchParams.get("guests")) || 2)
    )
    const [femaleCount, setFemaleCount] = useState(
        Number(searchParams.get("female")) || 0
    )


    const handleSearch = (e) => {
        e.preventDefault()

        if (!location || !checkInDate || !checkOutDate || guests < 1) {
            return
        }

        // Save to Recent Searches
        try {
            const newSearch = {
                location,
                query: `location=${encodeURIComponent(location)}&check_in=${format(checkInDate, "yyyy-MM-dd")}&check_out=${format(checkOutDate, "yyyy-MM-dd")}&guests=${guests}&male=${maleCount}&female=${femaleCount}`,
                timestamp: Date.now()
            }

            const existingSearches = JSON.parse(localStorage.getItem('recent_searches') || '[]')

            // Remove any existing search with the same location to avoid duplicates
            const filteredSearches = existingSearches.filter(s => s.location !== newSearch.location)

            // Add new search to start and keep max 3
            const updatedSearches = [newSearch, ...filteredSearches].slice(0, 3)

            localStorage.setItem('recent_searches', JSON.stringify(updatedSearches))

            // Trigger a storage event manually if needed (not strictly necessary since we navigate away, but help for SPA updates)
            window.dispatchEvent(new Event('storage'))

        } catch (err) {
            console.error("Failed to save recent search", err)
        }

        router.push(
            `/search?location=${encodeURIComponent(location)}&check_in=${format(checkInDate, "yyyy-MM-dd")}&check_out=${format(checkOutDate, "yyyy-MM-dd")}&guests=${guests}&male=${maleCount}&female=${femaleCount}`
        )
    }


    const handleDateChange = (checkIn, checkOut) => {
        setCheckInDate(checkIn)
        setCheckOutDate(checkOut)
        setShowDates(false)
    }

    const handleGuestsChange = ({ male, female }) => {
        setMaleCount(male)
        setFemaleCount(female)
        setGuests(male + female)
        setShowGuests(false)
    }

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation)
        setShowLocation(false)
    }

    const formattedDates =
        checkInDate && checkOutDate
            ? `${format(checkInDate, "MMM dd")} - ${format(checkOutDate, "MMM dd")}`
            : "Add dates"

    const formattedGuests = `${guests} guest${guests > 1 ? "s" : ""}`

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row bg-white rounded-lg md:rounded-full shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
            {/* Where */}
            <div
                className="w-full md:flex-[2] flex flex-col justify-center px-4 sm:px-6 py-4 
                border-b md:border-b-0 md:border-r border-gray-200 relative 
                hover:bg-gray-50 transition-colors cursor-pointer 
                rounded-t-lg md:rounded-l-full md:rounded-tr-none"
                onClick={() => {
                    setShowLocation(!showLocation)
                    setShowDates(false)
                    setShowGuests(false)
                }}
            >
                <div className="text-sm font-medium text-gray-900 truncate">{location}</div>
                <div className="text-xs text-gray-500 truncate">Search destinations</div>

                {showLocation && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <LocationPopover
                            value={location}
                            onChange={handleLocationChange}
                            onClose={() => setShowLocation(false)}
                        />
                    </div>
                )}
            </div>

            {/* Mobile: Date & Guests Wrapper */}
            <div className="flex w-full md:contents border-b border-gray-200 md:border-b-0">
                {/* When */}
                <div
                    className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-4 
                    border-r border-gray-200 relative 
                    hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                        setShowDates(!showDates)
                        setShowLocation(false)
                        setShowGuests(false)
                    }}
                >
                    <div className="text-sm font-medium text-gray-900">{formattedDates}</div>
                    <div className="text-xs text-gray-500">Add dates</div>

                    {showDates && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <DatePicker
                                checkIn={checkInDate}
                                checkOut={checkOutDate}
                                onDateChange={handleDateChange}
                                onClose={() => setShowDates(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Who */}
                <div
                    className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-4 
                    relative 
                    hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                        setShowGuests(!showGuests)
                        setShowLocation(false)
                        setShowDates(false)
                    }}
                >
                    <div className="text-sm font-medium text-gray-900">{formattedGuests}</div>
                    <div className="text-xs text-gray-500">Add guests</div>

                    {showGuests && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <GuestPicker
                                maleCount={maleCount}
                                femaleCount={femaleCount}
                                onGuestsChange={handleGuestsChange}
                                onClose={() => setShowGuests(false)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center md:justify-start px-4 py-3 md:pr-2 md:py-2 rounded-b-lg md:rounded-none">
                <Button
                    type="submit"
                    className="w-full md:w-12 h-12 rounded-lg md:rounded-full bg-[#1A73E8] hover:bg-[#1557b0] text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                    <Search className="h-5 w-5" />
                    <span className="md:hidden">Search</span>
                </Button>
            </div>
        </form>
    )
}