"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import ImageUpload from "@/app/components/ImageUpload";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

export default function EditPropertyPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    gender: "UNISEX",
    amenities: "",
    college: "",
    location: null,
    images: [],
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    garage: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) throw new Error("Failed to fetch property");
      const data = await res.json();

      setFormData({
        title: data.title,
        description: data.description,
        address: data.address || "",
        price: data.price,
        gender: data.gender,
        amenities: data.amenities.join(", "),
        college: data.college,
        location: {
          lng: data.location.coordinates[0],
          lat: data.location.coordinates[1],
        },
        images: data.images || [],
        bedrooms: data.bedrooms || "",
        bathrooms: data.bathrooms || "",
        sqft: data.sqft || "",
        garage: data.garage || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        amenities: amenitiesArray,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        sqft: Number(formData.sqft) || 0,
        garage: Number(formData.garage) || 0,
      };

      console.log('Edit Form - Submitting payload:', payload);
      console.log('Edit Form - Address in payload:', payload.address);

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update property");
      }

      router.push("/landlord/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.title) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
              Edit Property
            </h1>
            <p className="mt-2 text-gray-500 font-raleway text-sm md:text-base">
              Update your property details and keep your listing accurate.
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm resize-none"
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
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Street, Area, City, Pincode"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                    required
                  />
                </div>
              </div>

              {/* ================= PROPERTY DETAILS ================= */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-nunito">
                    Garage
                  </label>
                  <input
                    type="number"
                    name="garage"
                    value={formData.garage}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-900 outline-none transition font-poppins text-sm"
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
                </div>
              </div>

              {/* ================= MAP SECTION ================= */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 font-nunito">
                  Property Location
                </label>

                <div className="h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <Map
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={formData.location}
                    showSearch={false}
                  />
                </div>
              </div>

              {/* ================= IMAGES ================= */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 font-nunito">
                  Property Images
                </label>

                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={formData.images}
                />

                <p className="mt-3 text-xs text-gray-500 font-nunito">
                  The first image will be used as the primary thumbnail.
                </p>
              </div>

              {/* ================= ACTION BUTTONS ================= */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold font-poppins text-sm hover:bg-gray-200 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-1 bg-gray-900 text-white py-3 rounded-2xl font-semibold font-poppins text-sm tracking-wide hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Update Property"}
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>

  );
}
