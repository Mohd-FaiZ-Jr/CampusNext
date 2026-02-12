"use client";

import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";


export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: Signup Form, 2: OTP Verification
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset modal state when it opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "STUDENT",
        otp: "",
      });
      setErrors({});
      setApiError("");
      setSuccessMessage("");
      setCountdown(30);
    }
  }, [isOpen]);

  // Timer for OTP resend
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateSignup()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup success, response:", data);

      // Explicitly prevent any auto-closing here
      setApiError("");
      setSuccessMessage("Verification code sent to your email!");

      console.log("Setting step to 2 (OTP)");
      setStep(2); // Move to OTP step
      setCountdown(30); // Reset timer
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setSuccessMessage("Email verified successfully! Logging in...");

      // Complete signup & login
      setTimeout(() => {
        login(); // Refresh auth context
        onClose(); // Close modal
      }, 1500);

    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setApiError("");
    setSuccessMessage("");
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("New code sent!");
        setCountdown(30);
      } else {
        throw new Error(data.message || "Failed to resend code");
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  console.log("Rendering SignupModal, Step:", step, "IsOpen:", isOpen);

  return (
    <AuthModal isOpen={isOpen} onClose={onClose}>
      <div className="px-8 py-10 font-poppins">

        {step === 1 ? (
          <>
            {/* ================= HEADER ================= */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-raleway font-bold text-gray-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                Join CampusNest to explore verified student stays and manage bookings effortlessly.
              </p>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm text-center font-medium">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-5">

              {/* ================= ROLE SWITCH ================= */}
              <div className="bg-gray-100 p-1.5 rounded-xl flex">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "STUDENT" }))}
                  className={`flex-1 py-2.5 text-sm font-montserrat font-semibold rounded-lg transition-all duration-300 ${formData.role === "STUDENT"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role: "LANDLORD" }))}
                  className={`flex-1 py-2.5 text-sm font-montserrat font-semibold rounded-lg transition-all duration-300 ${formData.role === "LANDLORD"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Landlord
                </button>
              </div>

              {/* ================= INPUT FIELD STYLING ================= */}
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border bg-white transition-all focus:outline-none focus:ring-2 ${errors.name
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@university.edu"
                  className={`w-full px-4 py-3 rounded-xl border bg-white transition-all focus:outline-none focus:ring-2 ${errors.email
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              {/* ================= PASSWORD ================= */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 font-poppins">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-14 rounded-xl border bg-white transition-all focus:outline-none focus:ring-2 ${errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-red-600 mt-1 font-poppins">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* ================= CONFIRM PASSWORD ================= */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 font-poppins">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-14 rounded-xl border bg-white transition-all focus:outline-none focus:ring-2 ${errors.confirmPassword
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1 font-poppins">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>


              {/* CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat font-semibold shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Switch */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Log in
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ================= OTP SECTION ================= */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-inner">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                </svg>
              </div>

              <h2 className="text-2xl font-raleway font-bold text-gray-900">
                Verify Your Email
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter the 6-digit code sent to
                <br />
                <span className="font-semibold text-gray-800">
                  {formData.email}
                </span>
              </p>
            </div>

            {apiError && (
              <div className="mb-6 p-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm text-center">
                {apiError}
              </div>
            )}

            <form onSubmit={handleVerifySubmit} className="space-y-6">
              <input
                type="text"
                name="otp"
                maxLength="6"
                value={formData.otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setFormData(prev => ({ ...prev, otp: val }));
                }}
                placeholder="000000"
                autoFocus
                className="w-full text-center text-3xl tracking-[0.5em] font-montserrat font-bold px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
              />

              <button
                type="submit"
                disabled={isLoading || formData.otp.length !== 6}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 space-y-3">
              <p>
                Didn’t receive the code?{" "}
                {countdown > 0 ? (
                  <span className="text-gray-400 font-medium">
                    Resend in {countdown}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Resend Code
                  </button>
                )}
              </p>

              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-gray-600 underline transition"
              >
                Use a different email
              </button>
            </div>
          </>
        )}
      </div>
    </AuthModal>

  );
}
