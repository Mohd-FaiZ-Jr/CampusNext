"use client";

import Link from "next/link";
import { BedDouble, Bath, Ruler, Car } from "lucide-react";

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
    bedrooms = 0,
    bathrooms = 0,
    sqft = 0,
    garage = 0,
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

  // Property meta items - always show all 4 fields with real data
  const metaItems = [
    { icon: BedDouble, value: bedrooms, label: bedrooms === 1 ? "Bedroom" : "Bedrooms" },
    { icon: Bath, value: bathrooms, label: bathrooms === 1 ? "Bathroom" : "Bathrooms" },
    { icon: Ruler, value: sqft, label: "sq ft" },
    { icon: Car, value: garage, label: garage === 1 ? "Garage" : "Garages" },
  ];

  return (
    <Link
      href={`/explore/${id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100
             shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-full object-cover
                 group-hover:scale-105 transition duration-500"
        />

        {/* Distance Badge */}
        {formattedDistance && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700
                         text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm font-poppins">
            📍 {formattedDistance}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">
        {/* TITLE */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-0.5 font-poppins truncate">
          {title}
        </h3>

        {/* LOCATION */}
        <p className="text-xs sm:text-sm text-gray-400 mb-3 font-nunito truncate">
          {college}
        </p>

        {/* PROPERTY META */}
        <div className="grid grid-cols-2 gap-y-1.5 text-[11px] sm:text-xs text-gray-500 mb-4 font-poppins">
          {metaItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <item.icon className="w-3.5 h-3.5 text-gray-400" />
              <span>{item.value} {item.label}</span>
            </div>
          ))}
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-poppins">
              {formattedPrice}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-nunito ml-0.5">/mo</span>
          </div>

          <span className="bg-gray-900 text-white text-[10px] sm:text-xs font-semibold
                         px-3 py-1.5 rounded-lg font-poppins group-hover:bg-black transition-colors">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
