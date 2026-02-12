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
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ================= MAIN CARD ================= */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

          {/* ================= HEADER ================= */}
          <div className="px-10 py-8 border-b border-gray-100">
            <h1 className="text-3xl font-raleway font-semibold text-gray-900 tracking-tight">
              Edit Profile
            </h1>
            <p className="mt-2 text-gray-500 font-poppins text-sm max-w-xl">
              Keep your professional information updated to build trust and
              improve booking confidence.
            </p>
          </div>

          <div className="px-10 py-8">

            {/* ================= SUCCESS MESSAGE ================= */}
            {success && (
              <div className="mb-8 flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <p className="text-emerald-700 font-medium font-poppins">
                  Profile updated successfully. Redirecting...
                </p>
              </div>
            )}

            {/* ================= ERROR MESSAGE ================= */}
            {error && (
              <div className="mb-8 p-4 rounded-2xl border border-red-200 bg-red-50">
                <p className="text-red-600 font-medium font-poppins">
                  {error}
                </p>
              </div>
            )}

            {/* ================= FORM ================= */}
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ========== PROFILE IMAGE ========== */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 font-poppins">
                    Profile Image
                  </label>
                  <p className="text-xs text-gray-400 mt-1">
                    A professional photo increases student trust.
                  </p>
                </div>

                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={
                    formData.profileImage ? [formData.profileImage] : []
                  }
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* ========== COMPANY NAME ========== */}
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700 font-poppins"
                >
                  Company / Business Name
                </label>

                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="e.g., ABC Properties"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                />

                <p className="text-xs text-gray-400 text-right">
                  {formData.companyName.length}/100
                </p>
              </div>

              {/* ========== CONTACT ROW ========== */}
              <div className="grid md:grid-cols-2 gap-8">

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 font-poppins"
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
                    placeholder="1234567890"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />

                  <p className="text-xs text-gray-400">
                    10 digits only
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label
                    htmlFor="yearsOfExperience"
                    className="text-sm font-medium text-gray-700 font-poppins"
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
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* ========== BUSINESS ADDRESS ========== */}
              <div className="space-y-2">
                <label
                  htmlFor="businessAddress"
                  className="text-sm font-medium text-gray-700 font-poppins"
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
                  placeholder="e.g., 123 Business Street, City, State"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                />

                <p className="text-xs text-gray-400 text-right">
                  {formData.businessAddress.length}/200
                </p>
              </div>

              {/* ========== BIO ========== */}
              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 font-poppins"
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
                  placeholder="Tell students about yourself and your properties..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"
                />

                <p className="text-xs text-gray-400 text-right">
                  {formData.bio.length}/500
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-6">

                {/* ========== ACTIONS ========== */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">

                  <button
                    type="button"
                    onClick={() => router.push("/landlord/profile")}
                    disabled={saving}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-montserrat font-medium hover:bg-gray-100 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-gray-900 text-white font-montserrat font-medium hover:bg-black transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 flex items-center gap-2 justify-center"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>

                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
