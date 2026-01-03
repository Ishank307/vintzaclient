import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full bg-[#101e23] border-t border-slate-800 relative z-10 pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block group">
                            <h3 className="text-white tracking-tight text-2xl font-bold leading-tight group-hover:text-[#0cb1e9] transition-colors duration-300">
                                Vintza
                            </h3>
                        </Link>
                        <p className="text-slate-400 text-base font-normal leading-relaxed max-w-sm">
                            Discover handpicked luxury stays across the serene landscapes of Dandeli, the coastal bliss of Gokarna, and the vibrant shores of Goa. Experience the finest hospitality in nature's lap.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a aria-label="Facebook" className="text-slate-400 hover:text-[#0cb1e9] transition-colors duration-300" href="https://www.instagram.com/dandelivintageresorts" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a aria-label="Instagram" className="text-slate-400 hover:text-[#0cb1e9] transition-colors duration-300" href="https://www.instagram.com/dandelivintageresorts" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#0cb1e9]/30 pb-2 inline-block">Destinations</h4>
                            <ul className="space-y-3">
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Dandeli, India">Dandeli, Karnataka</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Gokarna, India">Gokarna, Karnataka</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Goa, India">Goa, India</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#0cb1e9]/30 pb-2 inline-block">Our Properties</h4>
                            <ul className="space-y-3">
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Dandeli, India">Resorts in Dandeli</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Gokarna, India">Resorts in Gokarna</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/search?location=Goa, India">Resorts in Goa</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#0cb1e9]/30 pb-2 inline-block">Company</h4>
                            <ul className="space-y-3">
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/about">About Us</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/activities">Activities</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-[#0cb1e9]/30 pb-2 inline-block">Legal</h4>
                            <ul className="space-y-3">
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/">Terms of Service</Link></li>
                                <li><Link className="text-slate-400 hover:text-[#0cb1e9] transition-colors text-sm font-medium" href="/">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="h-px bg-slate-800 w-full mb-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-normal text-center md:text-left">
                        © {new Date().getFullYear()} Vintza. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0cb1e9]/40"></span>
                        <span className="text-xs text-slate-600 font-medium tracking-widest uppercase">Luxury Travel</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
