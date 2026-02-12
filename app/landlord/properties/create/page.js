"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import ImageUpload from "../../../components/ImageUpload";
import dynamic from "next/dynamic";

// Map component must be loaded dynamically for ssr: false
const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

export default function CreatePropertyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    gender: "UNISEX",
    amenities: "",
    college: "",
    location: null, // { lat: number, lng: number }
    images: [], // Array of image URLs
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (latlng) => {
    setFormData((prev) => ({ ...prev, location: latlng }));
  };

  const handleImagesChange = (imageUrls) => {
    setFormData((prev) => ({ ...prev, images: imageUrls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.location) {
      setError("Please select a location on the map.");
      setIsLoading(false);
      return;
    }

    if (!formData.images || formData.images.length === 0) {
      setError("Please upload at least one image.");
      setIsLoading(false);
      return;
    }

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        amenities: amenitiesArray,
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create property");
      }

      // Success - Redirect to Dashboard
      router.push("/landlord/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
              List a New Property
            </h1>
            <p className="mt-2 text-gray-500 font-raleway text-sm md:text-base">
              Fill in the details below to publish your student housing listing.
            </p>
          </div>

          {/* ================= FORM CARD ================= */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">

            {/* Error Message */}
            {error && (
              <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 font-nunito">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* ================= BASIC DETAILS ================= */}
              <div className="space-y-6">

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Property Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Modern Apartment near Delhi University"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 focus:ring-0 outline-none transition font-poppins text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the property, nearby facilities, and unique features..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 focus:ring-0 outline-none transition font-poppins text-sm resize-none"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Property Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, Area, City, Pincode"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 focus:ring-0 outline-none transition font-poppins text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500 font-nunito">
                    Minimum 10 characters • Maximum 200 characters
                  </p>
                </div>
              </div>

              {/* ================= RENT & COLLEGE ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="15000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Nearest College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Delhi University"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                    required
                  />
                </div>
              </div>

              {/* ================= PREFERENCES ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Gender Preference
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                  >
                    <option value="UNISEX">Any / Co-ed</option>
                    <option value="MALE">Male Only</option>
                    <option value="FEMALE">Female Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Amenities
                  </label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Wifi, AC, Parking, Gym"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500 font-nunito">
                    Separate amenities with commas
                  </p>
                </div>
              </div>

              {/* ================= MAP SECTION ================= */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 font-nunito">
                  Pin Property Location
                </label>

                <div className="h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Map
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={formData.location}
                    showSearch={false}
                  />
                </div>

                {formData.location && (
                  <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-100 px-4 py-3 rounded-xl font-nunito">
                    Location pinned successfully.
                  </div>
                )}
              </div>

              {/* ================= IMAGE UPLOAD ================= */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 font-nunito">
                  Property Images
                </label>

                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={formData.images}
                />

                <p className="mt-3 text-xs text-gray-500 font-nunito">
                  Upload at least one image. The first image will be used as the
                  listing thumbnail.
                </p>
              </div>

              {/* ================= SUBMIT BUTTON ================= */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold font-poppins text-sm tracking-wide hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Listing..." : "Publish Property"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>

  );
}
