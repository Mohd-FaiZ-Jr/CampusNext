"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getLandlordProfile,
  updateLandlordProfile,
} from "@/app/services/landlordService";
import ImageUpload from "@/app/components/ImageUpload";
import { Save, X, Loader2, CheckCircle } from "lucide-react";

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    bio: "",
    yearsOfExperience: "",
    businessAddress: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getLandlordProfile();
      const profile = data.profile.landlordProfile || {};
      setFormData({
        companyName: profile.companyName || "",
        phoneNumber: profile.phoneNumber || "",
        bio: profile.bio || "",
        yearsOfExperience: profile.yearsOfExperience || "",
        businessAddress: profile.businessAddress || "",
        profileImage: profile.profileImage || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesChange = (images) => {
    // ImageUpload returns an array, we only want the first image for profile
    setFormData((prev) => ({
      ...prev,
      profileImage: images.length > 0 ? images[0] : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (formData.bio && formData.bio.length > 500) {
      setError("Bio cannot exceed 500 characters");
      return;
    }

    if (
      formData.yearsOfExperience &&
      (formData.yearsOfExperience < 0 || formData.yearsOfExperience > 100)
    ) {
      setError("Years of experience must be between 0 and 100");
      return;
    }

    try {
      setSaving(true);

      // Convert empty strings to undefined to avoid validation errors
      const dataToSend = {
        companyName: formData.companyName || undefined,
        phoneNumber: formData.phoneNumber || undefined,
        bio: formData.bio || undefined,
        yearsOfExperience: formData.yearsOfExperience
          ? Number(formData.yearsOfExperience)
          : undefined,
        businessAddress: formData.businessAddress || undefined,
        profileImage: formData.profileImage || undefined,
      };

      await updateLandlordProfile(dataToSend);
      setSuccess(true);

      // Redirect to profile page after 1.5 seconds
      setTimeout(() => {
        router.push("/landlord/profile");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Profile
            </h1>
            <p className="text-gray-600">
              Update your professional information to help students know more
              about you
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">
                Profile updated successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Image
              </label>
              <ImageUpload
                onImagesChange={handleImagesChange}
                existingImages={
                  formData.profileImage ? [formData.profileImage] : []
                }
              />
              <p className="mt-2 text-sm text-gray-500">
                Upload a professional photo to build trust with students
              </p>
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company/Business Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., ABC Properties"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.companyName.length}/100 characters
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="1234567890"
              />
              <p className="mt-1 text-sm text-gray-500">
                10 digits only, no spaces or dashes
              </p>
            </div>

            {/* Years of Experience */}
            <div>
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 5"
              />
            </div>

            {/* Business Address */}
            <div>
              <label
                htmlFor="businessAddress"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Business Address
              </label>
              <input
                type="text"
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 123 Business Street, City, State"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.businessAddress.length}/200 characters
              </p>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Bio / About
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell students about yourself and your properties..."
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/landlord/profile")}
                disabled={saving}
                className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
