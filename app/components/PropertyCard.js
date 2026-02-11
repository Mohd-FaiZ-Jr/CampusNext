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
      className="group block bg-white rounded-xl overflow-hidden
             shadow-sm hover:shadow-lg transition duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full h-full object-cover
                 group-hover:scale-105 transition duration-500"
        />

        {/* RENT BADGE */}
        {/* <span className="absolute top-4 left-4
                     bg-blue-600 text-white
                     text-xs font-semibold
                     px-3 py-1 rounded-md shadow">
          Rent
        </span> */}
      </div>

      {/* CONTENT */}
      <div className="p-5 bg-white">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 font-poppins">
          {title}
        </h3>

        {/* LOCATION */}
        <p className="text-sm text-gray-500 mb-4 font-poppins">
          {college}
        </p>

        {/* PROPERTY META */}
        <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600 mb-4 font-poppins">
          <div className="flex items-center gap-2">
            <BedDouble className="w-4 h-4 text-gray-500" />
            <span>4 Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gray-500" />
            <span>2 Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-500" />
            <span>720 sq ft</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-gray-500" />
            <span>1 Garage</span>
          </div>
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900 font-poppins">
            {formattedPrice}
          </span>

          <button className="bg-blue-500 hover:bg-blue-600
                         text-white text-xs font-semibold
                         px-4 py-2 rounded-md transition font-nunito">
            View Property
          </button>
        </div>
      </div>
    </Link>


  );
}
