"use client"

import { useState, useEffect, useRef } from "react"
import { Minus, Plus, Users, Sparkles, User, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function GuestPicker({ guests, onGuestsChange, onClose, insidePanel = false }) {
    // Initialize split: assume mostly males or random split not preserved from backend
    // Since we only get 'guests' (total), we can't restore the exact split.
    // Defaulting: Male = total, Female = 0 (or balanced if you prefer, but simple is predictable)
    const [counts, setCounts] = useState({
        male: guests || 1,
        female: 0
    })

    const pickerRef = useRef(null)

    useEffect(() => {
        if (insidePanel) return

        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onClose, insidePanel])

    useEffect(() => {
        // When props change, valid sync (but might overwrite user changes if parent re-renders? 
        // usually parent only re-renders on Apply. 
        // If current total matches prop, don't reset to keep split. 
        // If different, reset to match prop (and lose split).
        const currentTotal = counts.male + counts.female
        if (guests !== currentTotal) {
            setCounts({ male: guests || 1, female: 0 })
        }
    }, [guests])

    const updateCount = (type, delta) => {
        setCounts(prev => {
            const newValue = prev[type] + delta
            if (newValue < 0) return prev

            // Validation: Total must be at least 1
            const newTotal = (type === 'male' ? newValue : prev.male) +
                (type === 'female' ? newValue : prev.female)

            if (newTotal < 1 || newTotal > 20) return prev

            return { ...prev, [type]: newValue }
        })
    }

    const totalGuests = counts.male + counts.female

    const handleApply = () => {
        onGuestsChange(totalGuests)
        onClose()
    }

    return (
        <div
            ref={pickerRef}
            className={insidePanel
                ? "bg-white rounded-xl overflow-hidden w-full"
                : "absolute top-full right-0 mt-2 bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 z-50 w-[320px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            }
        >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Select Guests
                </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

                {/* Male Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Male</div>
                            <div className="text-xs text-gray-500">Guests</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => updateCount('male', -1)}
                            disabled={counts.male <= 0 || (counts.male === 1 && counts.female === 0)}
                            className="h-8 w-8 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-30 flex items-center justify-center transition-colors"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-900">{counts.male}</span>
                        <button
                            type="button"
                            onClick={() => updateCount('male', 1)}
                            disabled={totalGuests >= 20}
                            className="h-8 w-8 rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-30 flex items-center justify-center transition-colors"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* Female Counter */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                            <UserCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">Female</div>
                            <div className="text-xs text-gray-500">Guests</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => updateCount('female', -1)}
                            disabled={counts.female <= 0 || (counts.female === 1 && counts.male === 0)}
                            className="h-8 w-8 rounded-full border border-gray-200 hover:border-pink-500 hover:bg-pink-50 disabled:opacity-30 flex items-center justify-center transition-colors"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-900">{counts.female}</span>
                        <button
                            type="button"
                            onClick={() => updateCount('female', 1)}
                            disabled={totalGuests >= 20}
                            className="h-8 w-8 rounded-full border border-gray-200 hover:border-pink-500 hover:bg-pink-50 disabled:opacity-30 flex items-center justify-center transition-colors"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* Total Summary */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-medium text-gray-600">
                    <span>Total Guests</span>
                    <span className="text-lg font-bold text-gray-900">{totalGuests}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50/50 p-3 flex items-center justify-end">
                <Button
                    type="button"
                    onClick={handleApply}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-2 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                    Apply
                </Button>
            </div>
        </div>
    )
}
