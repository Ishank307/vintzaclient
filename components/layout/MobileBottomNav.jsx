"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Briefcase, Star, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function MobileBottomNav() {
    const pathname = usePathname()
    const { isAuth } = useAuth()

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: Home,
        },
        {
            name: "Explore",
            href: "/explore",
            icon: Compass,
        },
        {
            name: "Bookings",
            href: "/bookings",
            icon: Briefcase,
        },
        {
            name: "Reviews",
            href: "/reviews",
            icon: Star,
        },
        {
            name: "Account",
            href: isAuth ? "/profile" : "/login",
            icon: User,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-red-500" : "text-gray-500"
                                }`}
                        >
                            <item.icon
                                className={`w-6 h-6 ${isActive ? "stroke-[2px]" : "stroke-[1.5px]"}`}
                            />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
