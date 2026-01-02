"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Phone, User, LogOut, Calendar, Building } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function LandingHeader() {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const { user, isAuth, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        setProfileMenuOpen(false)
        router.push("/")
    }

    return (
        <header className="w-full bg-white border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col items-start">
                    <span className="text-xl sm:text-2xl font-bold text-gold">Vintza</span>
                    <span className="text-xs text-gold">By Vintage Resorts</span>
                    <div className="h-0.5 w-full bg-yellow-500 mt-0.5"></div>
                </Link>

                {/* Right Side Nav - Desktop */}
                <div className="hidden md:flex items-center gap-6 text-base">
                    <a href="https://wa.me/916361185700" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">List your property</span>
                    </a>
                    <Link href="/explore" className="text-gray-700 hover:text-gray-900 transition-colors">
                        Explore
                    </Link>
                    <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">Call Us Now</span>
                    </a>

                    {/* Show Profile Menu if logged in, otherwise show Login button */}
                    {isAuth ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md font-medium transition-colors"
                            >
                                <User className="h-4 w-4" />
                                <span>{user?.name || user?.phone_number}</span>
                            </button>

                            {/* Dropdown Menu */}
                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    <Link
                                        href="/bookings"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                        onClick={() => setProfileMenuOpen(false)}
                                    >
                                        <Calendar className="h-4 w-4" />
                                        <span>My Bookings</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
