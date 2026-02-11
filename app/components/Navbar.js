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
                  {/* <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div> */}
                  <h1 className="text-base sm:text-2xl font-bold text-gray-900 font-orbitron">
                    CampusNest.
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block font-poppins">
              <div className="ml-10 flex items-center space-x-6 xl:space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-gray-800 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-gray-800 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Explore
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-gray-800 px-2 py-2 text-sm font-medium transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-gray-800 px-2 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </Link>

                {/* Show Dashboard for Landlords */}
                {user && user.role === "LANDLORD" && (
                  <Link
                    href="/landlord/dashboard"
                    className="text-gray-700 hover:text-gray-800 px-2 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                <>
                  {user ? (
                    // Logged in state
                    <>
                      {user.role === "LANDLORD" || user.role === "STUDENT" ? (
                        // Landlord & Student Profile Dropdown
                        <div className="relative" ref={dropdownRef}>
                          {/* Avatar Button */}
                          <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                          >
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
                                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                                {getInitials(user.name)}
                              </div>
                            )}
                          </button>

                          {/* Dropdown */}
                          {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                              {/* User Info */}
                              <div className="px-5 py-4 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 truncate">
                                  {user.email}
                                </p>

                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide mt-3 ${user.role === "LANDLORD"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-indigo-50 text-indigo-600"
                                    }`}
                                >
                                  {user.role}
                                </span>
                              </div>

                              {/* Links */}
                              <div className="py-1">
                                <Link
                                  href={
                                    user.role === "LANDLORD"
                                      ? "/landlord/profile"
                                      : "/student/profile"
                                  }
                                  onClick={() => setIsProfileDropdownOpen(false)}
                                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                >
                                  <User className="w-4 h-4 text-gray-400" />
                                  View Profile
                                </Link>

                                <Link
                                  href={
                                    user.role === "LANDLORD"
                                      ? "/landlord/profile/edit"
                                      : "/student/profile/edit"
                                  }
                                  onClick={() => setIsProfileDropdownOpen(false)}
                                  className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                                >
                                  <Edit className="w-4 h-4 text-gray-400" />
                                  Edit Profile
                                </Link>
                              </div>

                              {/* Divider */}
                              <div className="my-2 border-t border-gray-100"></div>

                              {/* Logout */}
                              <button
                                onClick={() => {
                                  setIsProfileDropdownOpen(false);
                                  handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition text-left rounded-b-2xl"
                              >
                                <LogOut className="w-4 h-4" />
                                Logout
                              </button>
                            </div>
                          )}
                        </div>

                      ) : (
                        // Admin or other roles
                        <div className="flex items-center gap-6">

                          {user.role === "ADMIN" ? (
                            <Link
                              href="/admin"
                              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            >
                              Admin Panel
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-600">
                              <span className="text-gray-500">Hi,</span>{" "}
                              <span className="font-semibold text-gray-900">
                                {user.name}
                              </span>
                            </span>
                          )}

                          <div className="h-4 w-px bg-gray-200"></div>

                          <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
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
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
                      >
                        Login
                      </button>
                      {/* <button
                        onClick={openSignupModal}
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
                      >
                        Login/Sign Up
                      </button> */}
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
                className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <span className="sr-only">Toggle Menu</span>

                <div className="relative w-5 h-5">
                  {/* Top Line */}
                  <span
                    className={`absolute left-0 top-1/2 h-0.5 w-5 bg-gray-800 rounded transition-all duration-300 origin-center ${isMobileMenuOpen
                      ? "rotate-45 translate-y-0"
                      : "-translate-y-2"
                      }`}
                  ></span>

                  {/* Middle Line */}
                  <span
                    className={`absolute left-0 top-1/2 h-0.5 w-5 bg-gray-800 rounded transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                  ></span>

                  {/* Bottom Line */}
                  <span
                    className={`absolute left-0 top-1/2 h-0.5 w-5 bg-gray-800 rounded transition-all duration-300 origin-center ${isMobileMenuOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2"
                      }`}
                  ></span>
                </div>
              </button>
            </div>

          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-3 sm:pb-4 font-poppins">
              <div className="mt-3 mx-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="py-2">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/explore"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span>Explore</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span>About Us</span>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span>Contact</span>
                  </Link>

                  {user && user.role === "LANDLORD" && (
                    <>
                      <div className="h-px bg-gray-100 my-2" />
                      <Link
                        href="/landlord/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                      >
                        <span>Dashboard</span>
                      </Link>
                    </>
                  )}
                </div>

                {!isLoading && (
                  <>
                    {user ? (
                      // Logged in state (mobile)
                      <>
                        {user.role === "LANDLORD" || user.role === "STUDENT" ? (
                          <>
                            {/* Soft Divider */}
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                            {/* User Card */}
                            <div className="px-4">
                              <div className="flex items-center gap-3 rounded-2xl bg-gray-50/70 backdrop-blur-sm px-4 py-4 border border-gray-100">

                                {/* Avatar */}
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
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                                  />
                                ) : (
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm bg-gradient-to-br ${user.role === "LANDLORD"
                                      ? "from-blue-500 to-indigo-600"
                                      : "from-indigo-500 to-purple-600"
                                      }`}
                                  >
                                    {getInitials(user.name)}
                                  </div>
                                )}

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user.name}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                  </p>

                                  <span
                                    className={`mt-1 inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${user.role === "LANDLORD"
                                      ? "bg-blue-100/70 text-blue-700"
                                      : "bg-indigo-100/70 text-indigo-700"
                                      }`}
                                  >
                                    {user.role}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 px-3 font-nunito">

                              <Link
                                href={
                                  user.role === "LANDLORD"
                                    ? "/landlord/profile"
                                    : "/student/profile"
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                              >
                                <span>View Profile</span>

                              </Link>

                              <Link
                                href={
                                  user.role === "LANDLORD"
                                    ? "/landlord/profile/edit"
                                    : "/student/profile/edit"
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                              >
                                <span>Edit Profile</span>

                              </Link>

                              <div className="">
                                <button
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleLogout();
                                  }}
                                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200"
                                >
                                  <span>Logout</span>

                                </button>
                              </div>
                            </div>
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
