"use client";

import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset modal state when it opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
      setErrors({});
      setApiError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if it's an unverified email error
        if (response.status === 403 && data.message.includes("not verified")) {
          setApiError(
            <div>
              <p className="mb-3">{data.message}</p>
              <button
                onClick={handleDeleteAndSignup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-all"
              >
                Start Fresh - Sign Up Again
              </button>
            </div>
          );
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      setSuccessMessage("Login successful! Redirecting...");
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });

      // Refresh auth state and close modal
      setTimeout(() => {
        login(); // Refresh user data from context
        onClose(); // Close the modal
      }, 1000);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAndSignup = async () => {
    setIsLoading(true);
    try {
      // Delete the unverified user
      await fetch("/api/auth/delete-unverified", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      // Switch to signup modal
      onSwitchToSignup();
    } catch (error) {
      console.error("Error deleting unverified user:", error);
      // Still switch to signup even if delete fails
      onSwitchToSignup();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 sm:p-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold font-raleway text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 font-poppins">
            Log in to continue your housing search
          </p>
        </div>

        {/* ================= SUCCESS MESSAGE ================= */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-emerald-700 text-sm font-medium font-poppins">
              {successMessage}
            </p>
          </div>
        )}

        {/* ================= ERROR MESSAGE ================= */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium font-poppins">
              {apiError}
            </p>
          </div>
        )}

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@university.edu"
              className={`w-full font-nunito px-4 py-3 rounded-xl border bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${errors.email
                ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                : "border-gray-300 focus:ring-gray-900/5 focus:border-gray-900"
                }`}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 font-poppins">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full font-nunito px-4 py-3 pr-12 rounded-xl border bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${errors.password
                  ? "border-red-300 focus:ring-red-100 focus:border-red-500"
                  : "border-gray-300 focus:ring-gray-900/5 focus:border-gray-900"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-xs text-red-600 font-poppins">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group font-poppins">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
                Remember me
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold font-montserrat text-sm tracking-wide hover:bg-black transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* ================= DIVIDER ================= */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs uppercase tracking-wide text-gray-400 font-poppins">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ================= GOOGLE LOGIN ================= */}
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-medium text-gray-700 font-nunito">
            Continue with Google
          </span>
        </button>

        {/* ================= FOOTER ================= */}
        <div className="mt-8 text-center font-poppins">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-gray-900 font-semibold hover:underline transition"
            >
              Create one
            </button>
          </p>
        </div>

      </div>
    </AuthModal>

  );
}
