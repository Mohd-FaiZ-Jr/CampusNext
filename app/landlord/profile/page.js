"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLandlordProfile } from "@/app/services/landlordService";
import { useAuth } from "@/app/context/AuthContext";
import {
  User,
  Building2,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  CheckCircle,
  Edit,
  Calendar,
} from "lucide-react";

export default function LandlordProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getLandlordProfile();
      setProfile(data.profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const landlordProfile = profile.landlordProfile || {};

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Avatar Section */}
            <div className="relative">
              {landlordProfile.profileImage ? (
                <img
                  src={landlordProfile.profileImage}
                  alt={profile.name}
                  className="w-36 h-36 rounded-2xl object-cover border border-gray-200 shadow-sm"
                />
              ) : (
                <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-sm">
                  <span className="text-4xl font-semibold text-white">
                    {getInitials(profile.name)}
                  </span>
                </div>
              )}

              {landlordProfile.isVerified && (
                <div className="absolute -top-3 -right-3 bg-emerald-500 rounded-full p-2 border-4 border-white shadow">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                  {profile.name}
                </h1>

                {landlordProfile.isVerified && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </span>
                )}
              </div>

              {landlordProfile.companyName && (
                <p className="text-gray-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  {landlordProfile.companyName}
                </p>
              )}

              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Member since {formatDate(profile.createdAt)}
              </p>

              {landlordProfile.bio && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    {landlordProfile.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Action */}
            <div className="w-full lg:w-auto">
              <button
                onClick={() => router.push("/landlord/profile/edit")}
                className="w-full lg:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ================= INFO GRID ================= */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Contact Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              Contact Information
            </h2>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Phone</p>
                {landlordProfile.phoneNumber ? (
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {landlordProfile.phoneNumber}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">Not added</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              Professional Details
            </h2>

            <div className="space-y-5 text-sm">

              <div>
                <p className="text-gray-500 mb-1">Experience</p>
                {landlordProfile.yearsOfExperience !== undefined &&
                  landlordProfile.yearsOfExperience !== null ? (
                  <p className="text-gray-900 font-medium">
                    {landlordProfile.yearsOfExperience}{" "}
                    {landlordProfile.yearsOfExperience === 1 ? "year" : "years"}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">Not specified</p>
                )}
              </div>

              <div>
                <p className="text-gray-500 mb-1">Business Address</p>
                {landlordProfile.businessAddress ? (
                  <p className="text-gray-900 font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    {landlordProfile.businessAddress}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">Not specified</p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {!landlordProfile.companyName &&
          !landlordProfile.phoneNumber &&
          !landlordProfile.bio &&
          !landlordProfile.yearsOfExperience &&
          !landlordProfile.businessAddress && (
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complete Your Professional Profile
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Adding professional details builds trust and increases booking
                confidence from students.
              </p>

              <button
                onClick={() => router.push("/landlord/profile/edit")}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all active:scale-[0.98]"
              >
                Add Details
              </button>
            </div>
          )}

      </div>
    </div>

  );
}
