"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle, ShieldCheck, Zap, Heart, BedDouble, Users } from "lucide-react";
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
      <section className="relative min-h-[100vh] md:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
            alt="Modern Home"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 mt-5">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-2xl font-montserrat">
            Finding Your New Home Is Simple.
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl font-raleway">
            We provide high-quality rental listings to help you find the perfect home.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 md:mt-12 w-full max-w-7xl mx-auto z-50">
            <div className="
              bg-white/90 backdrop-blur
              border border-gray-200
              rounded-2xl
              shadow-[0_12px_32px_rgba(0,0,0,0.08)]
              p-2
              flex flex-col md:flex-row items-stretch gap-2
            ">
              {/* Location Input */}
              <div className="flex items-center flex-1 px-4 py-2 md:py-0 rounded-xl bg-gray-50 focus-within:bg-white transition border border-transparent focus-within:border-gray-200">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <input
                  placeholder="City, university, or area..."
                  className="
                    w-full py-3 md:py-4 bg-transparent outline-none
                    text-gray-900 placeholder-gray-400
                    font-poppins text-sm md:text-base
                  "
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                {/* Custom Dropdown */}
                <div ref={dropdownRef} className="relative z-50">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="
                      w-full md:w-auto
                      flex items-center justify-between
                      px-5 py-3 md:py-4 min-w-[160px]
                      rounded-xl
                      bg-gray-50 hover:bg-gray-100
                      font-poppins text-gray-700
                      transition
                      cursor-pointer
                      h-full
                      border border-transparent hover:border-gray-200
                    "
                  >
                    <span className={`text-sm md:text-base ${rentType === "Rent type" ? "text-gray-500" : "text-gray-900"}`}>
                      {rentType}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full z-50 left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <div
                        onClick={() => handleOptionSelect("PG")}
                        className="px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer font-poppins text-sm transition-colors"
                      >
                        PG
                      </div>
                      <div
                        onClick={() => handleOptionSelect("Apartment")}
                        className="px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer font-poppins text-sm transition-colors"
                      >
                        Apartment
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button
                  className="
                    w-full md:w-auto
                    bg-blue-600 hover:bg-blue-700
                    text-white
                    px-8 py-3 md:py-4
                    rounded-xl
                    font-semibold font-poppins
                    transition
                    shadow-md hover:shadow-lg
                    active:scale-95
                  "
                >
                  Search
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* MOST VIEWED */}
        <div className="max-w-7xl mx-auto px-6 mt-8 md:-mt-10 relative z-10">
          <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 font-raleway">
                Most Viewed
              </h2>

              <span className="block text-sm text-gray-500 font-raleway">
                Swipe to explore &rarr;
              </span>

            </div>

            {loading ? (
              <p className="text-gray-500 font-poppins">Loading properties...</p>
            ) : (
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 min-w-max pb-4">
                  {properties.map((p) => (
                    <a
                      key={p.id}
                      href={`/explore/${p.id}`}
                      onClick={(e) => handleProtectedNav(e, `/explore/${p.id}`)}
                      className="group"
                    >
                      <div
                        className="
            w-[300px] bg-white rounded-3xl
            border border-gray-200/70
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            hover:shadow-[0_14px_44px_rgba(0,0,0,0.08)]
            transition-all duration-300
            overflow-hidden
          "
                      >
                        {/* IMAGE */}
                        <div className="relative h-48 bg-gray-100">
                          <img
                            src={p.images?.[0]}
                            alt={p.title}
                            className="
                h-full w-full object-cover
                group-hover:scale-[1.03]
                transition-transform duration-500
              "
                          />
                          {/* Verified */}
                          {p.verified && (
                            <span
                              className="
                  absolute bottom-4 left-4
                  bg-white/90 backdrop-blur
                  text-green-700 text-xs font-medium
                  px-3 py-1 rounded-full
                  shadow-sm font-nunito
                "
                            >
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col items-start">
                              <h3 className="text-sm font-semibold font-medium text-gray-800 line-clamp-1 mb-1 font-poppins">
                                {p.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-1 font-poppins">
                                Near {p.college}
                              </p>
                            </div>


                            <div className="flex items-center gap-3 text-xs text-gray-600 font-poppins">
                              {/* Room Type */}
                              {/* {p.roomType && (
                            <div className="flex items-center gap-1">
                                <BedDouble className="w-4 h-4 text-blue-600" />
                                <span>{p.roomType}</span>
                              </div>
                            )}
                            {p.occupancy && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span>{p.occupancy}</span>
                              </div>
                            )} */}
                              <div className="flex items-center gap-1">
                                <BedDouble className="w-4 h-4 text-blue-600" />
                                <span>Single</span>
                              </div>

                              {/* Occupancy */}
                              {/* <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span>2</span>
                              </div> */}
                            </div>
                          </div>
                          {/* PRICE */}
                          <div className="text-lg  text-gray-900 font-poppins mt-1">
                            ₹{p.price?.toLocaleString("en-IN")}
                            <span className="text-sm font-normal text-gray-500">/month</span>
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
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-raleway">
            Trusted by students and property owners
          </h2>
          <p className="text-gray-600 font-nunito">
            CampusNest helps students find safe, verified homes while empowering
            trusted owners to connect with the right tenants - all in one seamless
            platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Trusted Owners */}
          <div className="
      bg-white
      border border-gray-200
      rounded-2xl
      p-8
      text-center
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
      transition
      font-raleway
    ">
            <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m8-4a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              5+
            </h3>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Trusted Owners
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-nunito">
              Property owners verified for authenticity, safety, and long-term
              reliability.
            </p>
          </div>

          {/* Properties Listed */}
          <div className="
      bg-white
      border border-gray-200
      rounded-2xl
      p-8
      text-center
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
      transition
      font-raleway
    ">
            <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-4a1 1 0 01-1-1V14H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
              </svg>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              10+
            </h3>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Properties Listed
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-nunito">
              Carefully curated homes designed to meet student needs and budgets.
            </p>
          </div>

          {/* Students Benefited */}
          <div className="
      bg-white
      border border-gray-200
      rounded-2xl
      p-8
      text-center
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]
      transition
      font-raleway
    ">
            <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.6 0-5.05-.83-7.16-2.222L12 14z" />
              </svg>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              100+
            </h3>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Students Benefited
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-nunito">
              Students who found safe, affordable housing without brokerage hassles.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div
          className="
      grid md:grid-cols-2 gap-10 items-center
      bg-white
      border border-gray-200
      rounded-3xl
      shadow-[0_14px_40px_rgba(0,0,0,0.08)]
      overflow-hidden
    "
        >
          {/* Left Image */}
          <div className="relative h-72 md:h-full">
            <img
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
              alt="Explore student properties"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Right Content */}
          <div className="p-10">
            <span className="inline-block text-xs font-semibold tracking-wide text-blue-600 uppercase mb-3 font-orbitron">
              Find your next home
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight font-raleway">
              Explore verified homes near your campus
            </h2>

            <p className="text-gray-600 max-w-md mb-8 text-sm font-poppins">
              Browse trusted, student-friendly properties carefully curated for
              comfort, safety, and convenience — all close to your university.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="/explore"
                className="
            inline-flex items-center justify-center
            bg-blue-600 hover:bg-blue-700
            text-white
            px-6 py-3
            rounded-xl
            font-semibold
            transition
            shadow-sm
            font-nunito
            w-full sm:w-auto
          "
              >
                Explore Properties
              </a>

              <span className="text-sm text-gray-500 font-nunito">
                No brokerage • Verified listings
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-28">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-raleway">
            Why Choose CampusNest?
          </h2>
          <p className="text-gray-600 text-base font-raleway">
            Designed for students who value trust, speed, and clarity when choosing a place to live.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Verified Properties"
            desc="Each listing is carefully reviewed to ensure safety, authenticity, and quality."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Fast & Seamless"
            desc="Find, compare, and book student housing without friction or hidden steps."
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6" />}
            title="Near Your Campus"
            desc="Homes curated around major universities so you stay close to what matters."
          />
        </div>
      </section>
    </main>
  );
}

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div
      className="bg-white rounded-3xl p-8
                 border border-gray-100
                 shadow-[0_12px_40px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)]
                 transition-all duration-300"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center
                   rounded-xl bg-gray-50 text-blue-600 mb-6"
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 font-nunito">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed font-poppins">
        {desc}
      </p>
    </div>
  );
};

