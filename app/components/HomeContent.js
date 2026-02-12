"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle, ShieldCheck, Zap, Heart, BedDouble, Users, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomeContent() {
  const router = useRouter();
  const { user, openLoginModal } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rentType, setRentType] = useState("Rent type");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (type) => {
    setRentType(type);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleProtectedNav = (e, path) => {
    e.preventDefault();
    if (!user) return openLoginModal();
    router.push(path);
  };

  return (
    <main className="bg-[#f8fafc]">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-between">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
            alt="Modern Home"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight font-montserrat">
              Find Your Perfect Student Home
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-200 font-raleway leading-relaxed">
              Verified listings near top universities. Safe, affordable, and ready to move in.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-12">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-3 flex flex-col md:flex-row gap-3 items-stretch">

              {/* Location */}
              <div className="flex items-center flex-1 px-5 py-3 rounded-2xl bg-gray-50 focus-within:bg-white border border-transparent focus-within:border-indigo-200 transition">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  placeholder="Search by city, university, or area"
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm md:text-base font-poppins"
                />
              </div>

              {/* Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between px-5 py-3 min-w-[170px] w-full rounded-2xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition text-sm md:text-base text-gray-700 font-poppins"
                >
                  <span className={rentType === "Rent type" ? "text-gray-500" : "text-gray-900"}>
                    {rentType}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 font-poppins">
                    {["PG", "Apartment"].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="px-4 py-3 text-sm hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}

              <button
                className="bg-indigo-50 hover:bg-indigo-100 text-gray-700 px-8 py-3 rounded-2xl font-semibold font-poppins transition active:scale-[0.98]"
              >
                Search
              </button>

            </div>
          </div>
        </div>

        {/* MOST VIEWED SECTION */}
        <div className="relative bg-gradient-to-b from-white to-gray-100 py-24">

          <div className="max-w-7xl mx-auto px-6">

            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">

              <div>
                <p className="text-sm tracking-widest uppercase text-indigo-600 font-semibold font-poppins mb-3">
                  Popular Listings
                </p>

                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight font-montserrat">
                  Most Viewed Properties
                </h2>

                <p className="mt-4 text-gray-600 text-lg max-w-xl font-raleway">
                  Explore student homes that are getting the most attention near top universities.
                </p>
              </div>

              <div className="text-sm text-gray-500 font-poppins md:self-end">
                Scroll to explore →
              </div>
            </div>

            {loading ? (
              <p className="text-gray-500 font-poppins">Loading properties...</p>
            ) : (
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 min-w-max pb-4">

                  {properties.map((p) => (
                    <a
                      key={p.id}
                      href={`/explore/${p.id}`}
                      onClick={(e) => handleProtectedNav(e, `/explore/${p.id}`)}
                      className="group"
                    >
                      <div className="w-[340px] bg-white rounded-3xl border border-gray-200/70 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">

                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={p.images?.[0]}
                            alt={p.title}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          {p.verified && (
                            <span className="absolute top-5 left-5 bg-white/95 backdrop-blur text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow font-poppins">
                              ✓ Verified
                            </span>
                          )}

                          {/* Gradient overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                        </div>

                        {/* Content */}
                        <div className="p-6">

                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 font-poppins">
                            {p.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-2 font-poppins">
                            Near {p.college}
                          </p>

                          <div className="mt-6 flex items-center justify-between">

                            <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                              <BedDouble className="w-4 h-4 text-gray-400" />
                              <span>Single Room</span>
                            </div>

                            <div className="text-xl font-bold text-gray-900 font-montserrat">
                              ₹{p.price?.toLocaleString("en-IN")}
                              <span className="text-sm text-gray-500 font-normal font-poppins">
                                /mo
                              </span>
                            </div>

                          </div>

                        </div>

                      </div>
                    </a>
                  ))}

                </div>
              </div>
            )}

          </div>
        </div>
      </section>


      <section className="relative bg-gradient-to-b from-white to-gray-50 py-28">

        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-sm tracking-widest uppercase text-indigo-600 font-semibold font-poppins mb-4">
              Why CampusNest
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-montserrat mb-6">
              Trusted by Students & Property Owners
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed font-raleway">
              CampusNest helps students find safe, verified homes while empowering
              trusted owners to connect with the right tenants — all through one
              seamless and transparent platform.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-10 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group relative bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-2xl transition-all duration-500">

              <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m8-4a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 font-montserrat mb-2">
                5+
              </h3>

              <p className="text-sm uppercase tracking-wide font-semibold text-gray-800 font-poppins mb-4">
                Trusted Owners
              </p>

              <p className="text-gray-600 leading-relaxed font-raleway">
                Verified property owners ensuring authenticity, safety, and long-term reliability.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-2xl transition-all duration-500">

              <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-4a1 1 0 01-1-1V14H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
                </svg>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 font-montserrat mb-2">
                10+
              </h3>

              <p className="text-sm uppercase tracking-wide font-semibold text-gray-800 font-poppins mb-4">
                Properties Listed
              </p>

              <p className="text-gray-600 leading-relaxed font-raleway">
                Carefully curated homes designed specifically to meet student needs and budgets.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-2xl transition-all duration-500">

              <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.6 0-5.05-.83-7.16-2.222L12 14z" />
                </svg>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 font-montserrat mb-2">
                100+
              </h3>

              <p className="text-sm uppercase tracking-wide font-semibold text-gray-800 font-poppins mb-4">
                Students Benefited
              </p>

              <p className="text-gray-600 leading-relaxed font-raleway">
                Students who found safe, affordable housing without brokerage hassles.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="relative py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="
      relative
      grid md:grid-cols-2
      items-center
      rounded-[32px]
      overflow-hidden
      bg-white
      border border-gray-200
      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
    ">

            {/* Left Image */}
            <div className="relative h-80 md:h-full">
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
                alt="Explore student properties"
                className="w-full h-full object-cover"
              />

              {/* Deeper gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-md">
                <p className="text-xs font-semibold text-gray-800 font-poppins">
                  100+ Students Trust CampusNest
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="p-12 md:p-16">

              <p className="text-sm tracking-widest uppercase text-indigo-600 font-semibold font-poppins mb-4">
                Find Your Next Home
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-montserrat mb-6">
                Explore Verified Homes
                <br className="hidden md:block" />
                Near Your Campus
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed font-raleway max-w-lg mb-10">
                Browse trusted, student-friendly properties curated for comfort,
                safety, and convenience — all located just minutes from your university.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                <a
                  href="/explore"
                  className="
              inline-flex items-center justify-center
              bg-indigo-600 hover:bg-indigo-700
              text-white
              px-8 py-4
              rounded-2xl
              font-semibold
              font-poppins
              transition-all duration-300
              shadow-lg hover:shadow-xl
              active:scale-[0.98]
              w-full sm:w-auto
            "
                >
                  Explore Properties
                </a>

                <span className="text-sm text-gray-500 font-poppins">
                  No brokerage • Fully verified listings
                </span>

              </div>

            </div>
          </div>

        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-gray-50 py-32">

        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <p className="text-sm tracking-widest uppercase text-indigo-600 font-semibold font-poppins mb-4">
              Why CampusNest
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight font-montserrat mb-6">
              Designed for Modern Student Living
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed font-raleway">
              Built for students who value trust, speed, and clarity when choosing
              where they live.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<ShieldCheck className="w-7 h-7" />}
              title="Verified Properties"
              desc="Every listing is carefully reviewed to ensure safety, authenticity, and long-term reliability."
            />
            <FeatureCard
              icon={<Zap className="w-7 h-7" />}
              title="Fast & Seamless"
              desc="Search, compare, and book student housing without friction, delays, or hidden steps."
            />
            <FeatureCard
              icon={<MapPin className="w-7 h-7" />}
              title="Near Your Campus"
              desc="Homes curated around major universities so you're always close to what matters."
            />
          </div>

        </div>
      </section>

    </main>
  );
}

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div
      className="
        group relative bg-white rounded-[28px] p-10
        border border-gray-200
        shadow-sm hover:shadow-2xl
        transition-all duration-500
        hover:-translate-y-2
      "
    >

      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-50/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Icon */}
      <div
        className="
          relative z-10
          w-16 h-16 flex items-center justify-center
          rounded-2xl bg-indigo-50 text-indigo-600
          mb-8
          group-hover:scale-110
          transition-transform duration-300
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-4 font-montserrat">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-gray-600 leading-relaxed font-raleway">
        {desc}
      </p>

    </div>
  );
};


