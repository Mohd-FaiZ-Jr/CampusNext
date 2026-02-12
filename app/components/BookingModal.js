"use client";

import { useState } from "react";
import { X, Home, MapPin, GraduationCap } from "lucide-react";

export default function BookingModal({ isOpen, onClose, property, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Confirm Booking
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Review property details before sending request
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">

          {/* Property Card */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            {property.images?.length > 0 && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-24 h-24 object-cover rounded-xl"
              />
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {property.title}
              </h4>

              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{property.address}</span>
                </div>

                <div className="flex items-center gap-2 truncate">
                  <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{property.college}</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{property.price?.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-gray-500"> / month</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="mt-0.5">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </div>
            <p className="text-sm text-amber-800 leading-relaxed">
              Your request will be sent to the landlord for approval. You’ll be notified once they respond.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 px-6 py-5 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            Send Request
          </button>
        </div>
      </div>
    </div>

  );
}
