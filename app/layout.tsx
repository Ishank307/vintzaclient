import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vintza By Vintage Resorts - Premier Dandeli Stays",
    template: "%s | Vintza By Vintage Resorts - Dandeli",
  },
  description: "Experience the best of Dandeli at Vintza By Vintage Resorts. Luxury stays, thrilling river rafting, and serene jungle getaways. Book your perfect vacation today.",
  keywords: ["Dandeli resorts", "river rafting Dandeli", "luxury stay Dandeli", "jungle resort", "Vintza resort", "Dandeli hotels", "best resort in Dandeli"],
  authors: [{ name: "Vintage Resorts" }],
  creator: "Vintage Resorts",
  publisher: "Vintage Resorts",
  metadataBase: new URL("https://vintza.in"), // Replace with actual domain if different
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vintza By Vintage Resorts - Premier Dandeli Stays",
    description: "Experience luxury and adventure at Vintza Dandeli. River rafting, jungle stays, and premium amenities.",
    url: "https://vintza.in",
    siteName: "Vintza By Vintage Resorts",
    images: [
      {
        url: "https://vintza.in/WhatsApp%20Image%202025-12-04%20at%209.47.28%20PM.jpeg", // Ensure this exists or use a valid placeholder
        width: 1200,
        height: 630,
        alt: "Vintza Resort Dandeli",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ropQa91cB02Q53bALo9DusFduQAGE_TUDHJlEMRzeo0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Resort",
    "name": "Vintza By Vintage Resorts",
    "image": "https://vintza.in/WhatsApp%20Image%202025-12-04%20at%209.47.28%20PM.jpeg",
    "description": "Premier luxury resort in Dandeli offering river rafting, jungle stays, and modern amenities.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jungle Lodges Road",
      "addressLocality": "Dandeli",
      "addressRegion": "Karnataka",
      "postalCode": "581325",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "15.2477",
      "longitude": "74.6300"
    },
    "url": "https://vintza.com",
    "telephone": "+919988776655", // Placeholder format
    "priceRange": "$$"
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
