"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "../components/Layout";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";
import useDebounce from "../hooks/useDebounce";
import { useAuth } from "../context/AuthContext";

function ExploreContent() {
  const router = useRouter();
  const { user, isLoading: authLoading, openLoginModal } = useAuth();
  const hasRedirected = useRef(false);
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    maxDistance: null,
    gender: "",
    amenities: [],
    amenities: [],
    verified: true,
    type: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const sortProperties = (props, sort) => {
    const sorted = [...props];

    switch (sort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "distance":
        return sorted.sort((a, b) => {
          const distA =
            typeof a.distance === "number"
              ? a.distance
              : parseFloat(a.distance);
          const distB =
            typeof b.distance === "number"
              ? b.distance
              : parseFloat(b.distance);
          return distA - distB;
        });
      case "newest":
      default:
        return sorted;
    }
  };

  const fetchProperties = async () => {
    setIsLoading(true);
    setLocationError(null);
    try {
      const params = new URLSearchParams();

      if (filters.priceMin) params.append("priceMin", filters.priceMin);
      if (filters.priceMax) params.append("priceMax", filters.priceMax);
      if (filters.maxDistance) params.append("distance", filters.maxDistance);
      if (filters.gender) params.append("gender", filters.gender);
      params.append("verified", filters.verified ? "true" : "false");
      if (searchTerm) params.append("college", searchTerm);

      if (userLocation) {
        params.append("lat", userLocation.lat);
        params.append("lng", userLocation.lng);
      }

      const response = await fetch(`/api/properties?${params.toString()}`);

      if (response.ok) {
        let data = await response.json();

        if (!userLocation) {
          data = sortProperties(data, sortBy);
        }

        setProperties(data);
      } else {
        console.error("Failed to fetch properties");
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNearbyMe = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setIsLocating(false);
        setSearchTerm("");
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setLocationError(errorMessage);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // Sync URL params with state
  useEffect(() => {
    const collegeParam = searchParams.get("college");
    const typeParam = searchParams.get("type");
    const verifiedParam = searchParams.get("verified");

    if (collegeParam) {
      setSearchTerm(collegeParam);
    }

    if (typeParam) {
      setFilters(prev => ({ ...prev, type: typeParam }));
    }

    if (verifiedParam !== null) {
      setFilters(prev => ({ ...prev, verified: verifiedParam === "true" }));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("Auth check - authLoading:", authLoading, "user:", user);
    if (!authLoading) {
      if (!user) {
        console.log("No user detected, redirecting to home...");
        sessionStorage.setItem("showLoginModal", "true");
        console.log("SessionStorage set, redirecting now...");
        window.location.href = "/";
      } else {
        console.log("User is authenticated:", user);
      }
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(
            `/api/properties/autocomplete?q=${encodeURIComponent(debouncedSearch)}`,
          );
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
          }
        } catch (err) {
          console.error("Suggestion fetch error", err);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchProperties();
  }, [filters, sortBy, userLocation]);

  if (authLoading || !user) {
    console.log("Showing loading - authLoading:", authLoading, "user:", user);
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-poppins">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      priceMin: null,
      priceMax: null,
      maxDistance: null,
      gender: "",
      amenities: [],
      verified: true,
    });
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const activeFilterCount = [
    filters.priceMin !== null,
    filters.maxDistance !== null,
    filters.gender !== "",
    filters.amenities?.length > 0,
    filters.verified === false,
  ].filter(Boolean).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-16">

        {/* ================= HERO HEADER ================= */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-nunito">
              <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700 font-medium">Explore</span>
            </div>

            {/* Title + Search Row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
                  Explore Properties
                </h1>
                <p className="mt-1.5 text-sm text-gray-500 font-raleway">
                  {isLoading
                    ? "Searching for properties..."
                    : `${properties.length} verified ${properties.length === 1 ? "listing" : "listings"} available`}
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative w-full md:w-80">
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Search by college..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 focus:ring-0 outline-none transition font-poppins text-sm"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-lg z-50 py-1 max-h-48 overflow-y-auto">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => {
                          setSearchTerm(s);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-poppins transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Sort Pills */}
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { label: "Newest", value: "newest" },
                { label: "Price: Low → High", value: "price-low" },
                { label: "Price: High → Low", value: "price-high" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all font-poppins
                    ${sortBy === opt.value
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearFilters={handleClearFilters}
                  activeFilterCount={activeFilterCount}
                  userLocation={userLocation}
                  isLocating={isLocating}
                  locationError={locationError}
                  onNearbyMe={handleNearbyMe}
                  onClearLocation={() => setUserLocation(null)}
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-5">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-gray-900 font-medium hover:bg-gray-50 transition-colors font-poppins text-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                        {activeFilterCount}
                      </span>
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showFilters && (
                  <div className="mt-3">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                      activeFilterCount={activeFilterCount}
                      userLocation={userLocation}
                      isLocating={isLocating}
                      locationError={locationError}
                      onNearbyMe={handleNearbyMe}
                      onClearLocation={() => setUserLocation(null)}
                    />
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-[3px] border-gray-900 border-t-transparent"></div>
                    <p className="mt-4 text-sm text-gray-500 font-poppins">Finding properties...</p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && properties.length === 0 && (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                  <div className="text-5xl mb-5">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-montserrat">
                    No properties found
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 font-raleway max-w-sm mx-auto">
                    Try adjusting your filters or search criteria to discover more listings.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold font-poppins transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Properties Grid */}
              {!isLoading && properties.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-[3px] border-gray-900 border-t-transparent"></div>
              <p className="mt-4 text-sm text-gray-500 font-poppins">Loading...</p>
            </div>
          </div>
        </Layout>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
