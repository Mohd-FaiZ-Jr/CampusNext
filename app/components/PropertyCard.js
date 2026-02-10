"use client";

import Link from "next/link";

export default function PropertyCard({ property }) {
  const {
    id,
    title,
    description,
    address,
    price,
    distance,
    verified,
    amenities = [],
    gender,
    college,
    images = [],
  } = property;

  // Format price in INR
  const formattedPrice =
    typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price;

  // Format distance - handle both number and string formats
  const formattedDistance =
    distance === null || distance === undefined || distance === "0km"
      ? null
      : typeof distance === "string"
        ? distance // Already formatted as "X.Xkm" from API
        : `${distance}km`;

  // Get first 3 amenities for display
  const displayAmenities = amenities.slice(0, 3);

  return (
    <Link
      href={`/explore/${id}`}
      className="group block bg-white rounded-2xl
             border border-gray-100
             shadow-[0_8px_28px_rgba(0,0,0,0.06)]
             hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
             transition-all duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover
                   group-hover:scale-[1.03]
                   transition-transform duration-500"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-5xl">
            🏠
          </div>
        )}

        {/* VERIFIED */}
        {verified && (
          <span
            className="absolute top-3 left-3
                   bg-white/90 backdrop-blur
                   text-green-700 text-xs font-ui font-semibold
                   px-2.5 py-1 rounded-full
                   flex items-center gap-1 shadow-sm"
          >
            ✓ Verified
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 font-body">
        {/* PRICE */}
        <div className="font-heading text-xl text-gray-900 mb-1">
          {formattedPrice}
          <span className="text-sm text-gray-500 font-normal"> / month</span>
        </div>

        {/* TITLE */}
        <h3 className="font-heading text-base text-gray-900 line-clamp-1 mb-2">
          {title}
        </h3>

        {/* LOCATION */}
        {college && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">Near {college}</span>
          </div>
        )}

        {/* META INFO */}
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          {formattedDistance && (
            <span>{formattedDistance} from campus</span>
          )}
          {displayAmenities.includes("WiFi") && <span>Wi-Fi</span>}
          {displayAmenities.includes("Furnished") && <span>Furnished</span>}
        </div>

        {/* CTA */}
        <button
          className="w-full mt-2 py-2.5 rounded-xl
                 bg-blue-600 hover:bg-blue-700
                 text-white text-sm font-ui font-semibold
                 transition-colors"
        >
          View Details
        </button>
      </div>
    </Link>

  );
}
