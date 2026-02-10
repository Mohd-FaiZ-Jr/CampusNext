"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { User, LogOut, Edit } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    user,
    isLoading,
    logout,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  } = useAuth();

  // Check if we should open login modal (from protected route redirect)
  useEffect(() => {
    const checkLoginModal = () => {
      const shouldShowLogin = sessionStorage.getItem("showLoginModal");
      if (shouldShowLogin === "true") {
        sessionStorage.removeItem("showLoginModal");
        openLoginModal();
      }
    };

    // Check on mount
    checkLoginModal();

    // Listen for storage events (from other tabs/windows or manual triggers)
    window.addEventListener("storage", checkLoginModal);

    // Listen for custom event (for same-window updates)
    window.addEventListener("checkLoginModal", checkLoginModal);

    return () => {
      window.removeEventListener("storage", checkLoginModal);
      window.removeEventListener("checkLoginModal", checkLoginModal);
    };
  }, [openLoginModal]);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    closeLoginModal();
    setIsMobileMenuOpen(false);
  };

  const handleOpenLoginModal = () => {
    openLoginModal();
    setIsSignupModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    logout();
  };

  const getInitials = (name) => {
    if (!name) return "LL";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/">
                <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <h1 className="text-base sm:text-xl font-bold text-gray-900">
                    CampusNest
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-center space-x-6 xl:space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Rent
                </Link>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  PG
                </Link>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Rooms
                </Link>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Nearby
                </Link>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </Link>

                {/* Show Dashboard for Landlords */}
                {user && user.role === "LANDLORD" && (
                  <Link
                    href="/landlord/dashboard"
                    className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                {/* Show Bookings for Landlords */}
                {user && user.role === "LANDLORD" && (
                  <Link
                    href="/landlord/bookings"
                    className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Bookings
                  </Link>
                )}

                {/* Show Bookings for Students */}
                {user && user.role === "STUDENT" && (
                  <Link
                    href="/student/bookings"
                    className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                  >
                    My Bookings
                  </Link>
                )}

                <>
                  {user ? (
                    // Logged in state
                    <>
                      {user.role === "LANDLORD" || user.role === "STUDENT" ? (
                        // Landlord & Student Profile Dropdown
                        <div className="relative" ref={dropdownRef}>
                          <button
                            onClick={() =>
                              setIsProfileDropdownOpen(!isProfileDropdownOpen)
                            }
                            className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 focus:outline-none"
                          >
                            {/* Determine Profile Image */}
                            {(user.role === "LANDLORD" &&
                              user.landlordProfile?.profileImage) ||
                            (user.role === "STUDENT" &&
                              user.studentProfile?.profileImage) ? (
                              <img
                                src={
                                  user.role === "LANDLORD"
                                    ? user.landlordProfile.profileImage
                                    : user.studentProfile.profileImage
                                }
                                alt={user.name}
                                className={`w-9 h-9 rounded-full object-cover border-2 ${
                                  user.role === "LANDLORD"
                                    ? "border-blue-500"
                                    : "border-indigo-500"
                                }`}
                              />
                            ) : (
                              <div
                                className={`w-9 h-9 rounded-full bg-gradient-to-br ${
                                  user.role === "LANDLORD"
                                    ? "from-blue-500 to-indigo-600 border-blue-500"
                                    : "from-indigo-500 to-purple-600 border-indigo-500"
                                } flex items-center justify-center border-2`}
                              >
                                <span className="text-xs font-bold text-white">
                                  {getInitials(user.name)}
                                </span>
                              </div>
                            )}
                          </button>

                          {/* Dropdown Menu */}
                          {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                              <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {user.email}
                                </p>
                                <span
                                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                                    user.role === "LANDLORD"
                                      ? "bg-blue-50 text-blue-600"
                                      : "bg-indigo-50 text-indigo-600"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </div>
                              <Link
                                href={
                                  user.role === "LANDLORD"
                                    ? "/landlord/profile"
                                    : "/student/profile"
                                }
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsProfileDropdownOpen(false)}
                              >
                                <User className="w-4 h-4" />
                                View Profile
                              </Link>
                              <Link
                                href={
                                  user.role === "LANDLORD"
                                    ? "/landlord/profile/edit"
                                    : "/student/profile/edit"
                                }
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setIsProfileDropdownOpen(false)}
                              >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                              </Link>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button
                                onClick={() => {
                                  setIsProfileDropdownOpen(false);
                                  handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                              >
                                <LogOut className="w-4 h-4" />
                                Logout
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Admin or other roles
                        <div className="flex items-center gap-4">
                          {user.role === "ADMIN" ? (
                            <Link
                              href="/admin"
                              className="text-zinc-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                            >
                              Admin Panel
                            </Link>
                          ) : (
                            <span className="text-zinc-600 px-3 py-2 text-sm font-medium">
                              Hi, {user.name}
                            </span>
                          )}
                          <button
                            onClick={handleLogout}
                            className="text-zinc-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    // Logged out state
                    <>
                      <button
                        onClick={handleOpenLoginModal}
                        className="text-zinc-600 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                      >
                        Login
                      </button>
                      <button
                        onClick={openSignupModal}
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
                      >
                        Login/Sign Up
                      </button>
                    </>
                  )}
                </>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                className="text-zinc-600 hover:text-blue-600 focus:outline-none transition-colors p-2"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-3 sm:pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-xl bg-white/95 rounded-2xl mt-2 shadow-lg border border-gray-200">
                <Link
                  href="/"
                  className="text-zinc-900 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rent
                </Link>

                <Link
                  href="/explore"
                  className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  PG
                </Link>

                <Link
                  href="/explore"
                  className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>

                <Link
                  href="/explore"
                  className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Nearby
                </Link>

                <Link
                  href="/explore"
                  className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                {user && user.role === "LANDLORD" && (
                  <Link
                    href="/landlord/dashboard"
                    className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                {!isLoading && (
                  <>
                    {user ? (
                      // Logged in state (mobile)
                      <>
                        {user.role === "LANDLORD" || user.role === "STUDENT" ? (
                          // Landlord & Student mobile menu
                          <>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
                              {(user.role === "LANDLORD" &&
                                user.landlordProfile?.profileImage) ||
                              (user.role === "STUDENT" &&
                                user.studentProfile?.profileImage) ? (
                                <img
                                  src={
                                    user.role === "LANDLORD"
                                      ? user.landlordProfile.profileImage
                                      : user.studentProfile.profileImage
                                  }
                                  alt={user.name}
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 ${
                                    user.role === "LANDLORD"
                                      ? "border-blue-500"
                                      : "border-indigo-500"
                                  }`}
                                />
                              ) : (
                                <div
                                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${
                                    user.role === "LANDLORD"
                                      ? "from-blue-500 to-indigo-600 border-blue-500"
                                      : "from-indigo-500 to-purple-600 border-indigo-500"
                                  } flex items-center justify-center border-2`}
                                >
                                  <span className="text-sm sm:text-base font-bold text-white">
                                    {getInitials(user.name)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500">
                                  {user.email}
                                </p>
                                <span
                                  className={`text-[9px] sm:text-[10px] uppercase font-bold px-1.5 sm:px-2 py-0.5 rounded-full mt-1 inline-block ${
                                    user.role === "LANDLORD"
                                      ? "bg-blue-50 text-blue-600"
                                      : "bg-indigo-50 text-indigo-600"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </div>
                            </div>
                            <Link
                              href={
                                user.role === "LANDLORD"
                                  ? "/landlord/profile"
                                  : "/student/profile"
                              }
                              className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              View Profile
                            </Link>
                            <Link
                              href={
                                user.role === "LANDLORD"
                                  ? "/landlord/profile/edit"
                                  : "/student/profile/edit"
                              }
                              className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Edit Profile
                            </Link>
                            <button
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleLogout();
                              }}
                              className="text-red-600 hover:text-red-700 block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-red-50 transition-colors"
                            >
                              Logout
                            </button>
                          </>
                        ) : (
                          // Admin or other roles mobile menu
                          <>
                            <div className="border-t border-gray-200 my-2"></div>
                            {user.role === "ADMIN" ? (
                              <Link
                                href="/admin"
                                className="text-zinc-600 hover:text-blue-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors rounded-xl"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Admin Panel
                              </Link>
                            ) : (
                              <div className="text-zinc-600 block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium">
                                Hi, {user.name}
                              </div>
                            )}
                            <button
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleLogout();
                              }}
                              className="text-red-600 hover:text-red-700 block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-red-50 transition-colors"
                            >
                              Logout
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      // Logged out state (mobile)
                      <>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          onClick={handleOpenLoginModal}
                          className="text-zinc-600 hover:text-blue-600 block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          Login
                        </button>
                        <button
                          onClick={openSignupModal}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white block w-full text-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold mt-2"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={openLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToSignup={openSignupModal}
      />
    </>
  );
}
