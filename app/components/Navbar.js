"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import {
  User,
  LogOut,
  Edit,
  Home,
  Compass,
  Info,
  Phone,
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Refs
  const dropdownRef = useRef(null);

  // Auth Context
  const {
    user,
    logout,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  } = useAuth();

  // Handle Login Modal from Session/Events
  useEffect(() => {
    const checkLoginModal = () => {
      const shouldShowLogin = sessionStorage.getItem("showLoginModal");
      if (shouldShowLogin === "true") {
        sessionStorage.removeItem("showLoginModal");
        openLoginModal();
      }
    };

    checkLoginModal();
    window.addEventListener("storage", checkLoginModal);
    window.addEventListener("checkLoginModal", checkLoginModal);

    return () => {
      window.removeEventListener("storage", checkLoginModal);
      window.removeEventListener("checkLoginModal", checkLoginModal);
    };
  }, [openLoginModal]);

  // Click Outside Handler for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Body Scroll Lock for Mobile Menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Modal Handlers
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

  // Helper
  const getInitials = (name) => {
    if (!name) return "LL";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Styles
  const linkStyle = "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200";
  const activeLinkStyle = "text-blue-600 font-semibold"; // Can be expanded with usePathname if needed

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-orbitron tracking-tight group-hover:opacity-90 transition-opacity">
                  CampusNest<span className="text-blue-600">.</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 font-poppins">
              <Link href="/" className={linkStyle}>Home</Link>
              <Link href="/explore" className={linkStyle}>Explore</Link>
              <Link href="/about" className={linkStyle}>About Us</Link>
              <Link href="/contact" className={linkStyle}>Contact</Link>

              {/* Role Based Links */}
              {user?.role === "LANDLORD" && (
                <>
                  <div className="w-px h-4 bg-gray-300 mx-2" />
                  <Link href="/landlord/dashboard" className={linkStyle}>Dashboard</Link>
                  <Link href="/landlord/bookings" className={linkStyle}>Bookings</Link>
                </>
              )}

              {user?.role === "STUDENT" && (
                <>
                  <div className="w-px h-4 bg-gray-300 mx-2" />
                  <Link href="/student/bookings" className={linkStyle}>My Bookings</Link>
                </>
              )}

              {/* Auth Buttons / Profile */}
              <div className="ml-4 pl-4 border-l border-gray-200">
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    {user.role === "LANDLORD" || user.role === "STUDENT" ? (
                      <div>
                        {/* Profile Trigger */}
                        <button
                          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                          className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 focus:outline-none"
                        >
                          <div className="relative">
                            {(user.role === "LANDLORD" && user.landlordProfile?.profileImage) ||
                              (user.role === "STUDENT" && user.studentProfile?.profileImage) ? (
                              <img
                                src={user.role === "LANDLORD" ? user.landlordProfile.profileImage : user.studentProfile.profileImage}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                {getInitials(user.name)}
                              </div>
                            )}
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileDropdownOpen && (
                          <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 ring-1 ring-black/5 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mt-2 ${user.role === "LANDLORD" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                }`}>
                                {user.role}
                              </span>
                            </div>

                            <div className="py-2">
                              <Link
                                href={user.role === "LANDLORD" ? "/landlord/profile" : "/student/profile"}
                                onClick={() => setIsProfileDropdownOpen(false)}
                                className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                              >
                                <User className="w-4 h-4" /> View Profile
                              </Link>

                              <Link
                                href={user.role === "LANDLORD" ? "/landlord/profile/edit" : "/student/profile/edit"}
                                onClick={() => setIsProfileDropdownOpen(false)}
                                className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="w-4 h-4" /> Edit Profile
                              </Link>
                            </div>

                            <div className="border-t border-gray-100 mt-1">
                              <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                              >
                                <LogOut className="w-4 h-4" /> Logout
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Admin or Basic User
                      <div className="flex items-center gap-4">
                        {user.role === "ADMIN" ? (
                          <Link href="/admin" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition shadow-sm">
                            Admin Panel
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                        )}
                        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Guest State

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleOpenLoginModal}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                    >
                      Login
                    </button>

                    <button
                      onClick={openSignupModal}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-95"
                    >
                      Sign Up
                    </button>

                  </div>

                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold font-orbitron text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6 px-5 font-poppins space-y-6">

            {/* User Profile Card Mobile */}
            {user ? (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  {(user.role === "LANDLORD" && user.landlordProfile?.profileImage) ||
                    (user.role === "STUDENT" && user.studentProfile?.profileImage) ? (
                    <img
                      src={user.role === "LANDLORD" ? user.landlordProfile.profileImage : user.studentProfile.profileImage}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                {(user.role === "LANDLORD" || user.role === "STUDENT") && (
                  <Link
                    href={user.role === "LANDLORD" ? "/landlord/profile" : "/student/profile"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-300 transition-colors"
                  >
                    View Profile
                  </Link>
                )}

                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-black transition-colors"
                  >
                    Go to Admin Panel
                  </Link>
                )}
              </div>
            ) : (
              // Guest Card
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">

                <div className="text-center space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold font-raleway text-gray-900">
                    Welcome to CampusNest
                  </h3>
                  <p className="text-sm text-gray-500 font-poppins">
                    Sign in to manage your bookings and properties
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                  {/* Login - Primary */}
                  <button
                    onClick={handleOpenLoginModal}
                    className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold font-nunito hover:bg-black transition-all duration-200 shadow-sm"
                  >
                    Login
                  </button>

                  {/* Sign Up - Secondary */}
                  <button
                    onClick={openSignupModal}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold font-nunito hover:bg-gray-50 transition-all duration-200"
                  >
                    Create Account
                  </button>

                </div>

              </div>

            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2 font-montserrat">Navigation</p>

              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                <Home className="w-4 h-4 text-gray-400" /> Home
              </Link>

              <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                <Compass className="w-4 h-4 text-gray-400" /> Explore
              </Link>

              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                <Info className="w-4 h-4 text-gray-400" /> About Us
              </Link>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                <Phone className="w-4 h-4 text-gray-400" /> Contact
              </Link>

              {/* Role Specific Links */}
              {user?.role === "LANDLORD" && (
                <>
                  <div className="h-px bg-gray-100 my-3 mx-2"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2 font-montserrat">Landlord Menu</p>
                  <Link href="/landlord/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link href="/landlord/bookings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    <CalendarCheck className="w-4 h-4 text-gray-400" /> Bookings
                  </Link>
                </>
              )}

              {user?.role === "STUDENT" && (
                <>
                  <div className="h-px bg-gray-100 my-3 mx-2"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">Student Menu</p>
                  <Link href="/student/bookings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                    <CalendarDays className="w-4 h-4 text-gray-400" /> My Bookings
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Footer Logout */}
          {user && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-red-600 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}

        </div>
      </div>

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
