"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Home,
  Building,
  Landmark,
  MapPin,
  Check,
  Camera,
  Zap,
  Star,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomeContent() {
  const router = useRouter();
  const { user, isLoading, openLoginModal } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [featuredProperty, setFeaturedProperty] = useState(null);

  // Handle property click with authentication check
  const handlePropertyClick = (e, path) => {
    e.preventDefault();
    if (!user) {
      // Open login modal directly
      openLoginModal();
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties");
      if (res.ok) {
        const data = await res.json();
        // API returns array directly, not {properties: []}
        const allProperties = Array.isArray(data) ? data : [];
        // Store total count for display
        setTotalCount(allProperties.length);
        // Limit to 6 newest properties for homepage
        const newestProperties = allProperties.slice(0, 6);
        setProperties(newestProperties);
        // Set first verified property as featured, or first property if none verified
        const verified = newestProperties.find((p) => p.verified);
        setFeaturedProperty(verified || newestProperties[0] || null);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  // Icon mapping for variety
  const getPropertyIcon = (index) => {
    const icons = [Building2, Home, Building, Landmark];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-20 h-20 text-blue-600" />;
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-b from-[#eaf7fb] to-white pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Card with Image and Search */}
          <div className="relative bg-white rounded-[20px] shadow-lg overflow-hidden">
            {/* Hero Background Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1400&h=600&fit=crop"
                alt="Modern Student Accommodation"
                className="w-full h-full object-cover"
              />
              
              {/* Search Bar Overlay - Centered */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-5">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search university or location..."
                        className="flex-1 py-3 sm:py-4 text-sm sm:text-base focus:outline-none placeholder-gray-400"
                      />
                    </div>
                    <Link href="/explore" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base shadow-md hover:shadow-lg">
                        Search
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Now Section - Overlapping the hero */}
        <div className="relative -mt-16 sm:-mt-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-[20px] shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Available Now</h2>

              <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
                <div className="flex gap-3 sm:gap-4 lg:gap-5 pb-2" style={{ minWidth: 'min-content' }}>
                  {isLoadingProperties ? (
                    <div className="text-gray-600 text-sm sm:text-base">Loading properties...</div>
                  ) : (
                    properties.slice(0, 5).map((property, index) => (
                      <a
                        key={property.id}
                        href="/explore"
                        onClick={(e) => handlePropertyClick(e, "/explore")}
                        className="block flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[280px]"
                      >
                        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group relative h-full">
                          {/* Wishlist Heart Icon */}
                          <button className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>

                          {property.images && property.images.length > 0 ? (
                            <div className="h-40 sm:h-44 lg:h-48 overflow-hidden">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="h-40 sm:h-44 lg:h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                              {getPropertyIcon(index)}
                            </div>
                          )}
                          <div className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-base sm:text-lg font-bold text-gray-900">
                                ₹{property.price.toLocaleString("en-IN")}/mo
                              </div>
                              {property.verified && (
                                <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-start gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-700 mb-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5" />
                              <span className="line-clamp-1 leading-tight">{property.title}</span>
                            </div>
                            <div className="text-[11px] sm:text-xs text-gray-500 line-clamp-1">
                              {property.college}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CampusNest */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Why Choose CampusNest
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Feature 1 - Verified Properties */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Verified Properties
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-4">
                We list search-carefully and verify listed properties.
              </p>
            </div>

            {/* Feature 2 - Instant Booking */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Instant Booking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-4">
                Easily check with instant booking your access time.
              </p>
            </div>

            {/* Feature 3 - Near Campus */}
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-sm">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Near Campus
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-4">
                Near campus or within a short campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newest Properties Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            Newest Properties
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {properties.slice(0, 6).map((property, index) => (
              <a
                key={property.id}
                href="/explore"
                onClick={(e) => handlePropertyClick(e, "/explore")}
              >
                <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group relative">
                  {/* Wishlist Heart Icon */}
                  <button className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {property.images && property.images.length > 0 ? (
                    <div className="h-48 sm:h-52 lg:h-56 overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      {getPropertyIcon(index)}
                    </div>
                  )}
                  <div className="p-4 sm:p-5">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-1">
                      {property.title}
                    </h4>
                    <div className="flex items-start gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{property.college}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg sm:text-xl font-bold text-gray-900">
                        ₹{property.price.toLocaleString("en-IN")}/mo
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Removed */}
    </>
  );
}
