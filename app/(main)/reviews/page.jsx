import ReviewsContent from "./ReviewsContent"

export const metadata = {
    title: "Guest Reviews | Vintza By Vintage Resorts - Dandeli",
    description: "Read real experiences from our guests at Vintza Dandeli. Rated 4.8/5 stars based on 240+ verified reviews. Discover why travelers choose us for their perfect stay.",
    keywords: "Vintza reviews, Dandeli resort reviews, luxury stay Dandeli, Vintage Resorts guest feedback",
}

export default function ReviewsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": "Vintza By Vintage Resorts",
        "image": "https://vintza.com/assets/images/resort.jpg", // Placeholder or actual URL if available
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "240",
            "bestRating": "5",
            "worstRating": "1"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ReviewsContent />
        </>
    )
}
