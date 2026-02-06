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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            {/* Profile Image */}
            <div className="relative">
              {landlordProfile.profileImage ? (
                <img
                  src={landlordProfile.profileImage}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-blue-100">
                  <span className="text-4xl font-bold text-white">
                    {getInitials(profile.name)}
                  </span>
                </div>
              )}
              {landlordProfile.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                {landlordProfile.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified Landlord
                  </span>
                )}
              </div>
              {landlordProfile.companyName && (
                <p className="text-lg text-gray-600 mb-2 flex items-center justify-center md:justify-start gap-2">
                  <Building2 className="w-5 h-5" />
                  {landlordProfile.companyName}
                </p>
              )}
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Member since {formatDate(profile.createdAt)}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => router.push("/landlord/profile/edit")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          {landlordProfile.bio && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-700 leading-relaxed">
                {landlordProfile.bio}
              </p>
            </div>
          )}
        </div>

        {/* Profile Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600" />
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-medium">{profile.email}</p>
              </div>
              {landlordProfile.phoneNumber && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    {landlordProfile.phoneNumber}
                  </p>
                </div>
              )}
              {!landlordProfile.phoneNumber && (
                <p className="text-gray-400 italic">No phone number added</p>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              Professional Details
            </h2>
            <div className="space-y-4">
              {landlordProfile.yearsOfExperience !== undefined &&
              landlordProfile.yearsOfExperience !== null ? (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="text-gray-900 font-medium">
                    {landlordProfile.yearsOfExperience}{" "}
                    {landlordProfile.yearsOfExperience === 1 ? "year" : "years"}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="text-gray-400 italic">Not specified</p>
                </div>
              )}
              {landlordProfile.businessAddress && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Business Address</p>
                  <p className="text-gray-900 font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{landlordProfile.businessAddress}</span>
                  </p>
                </div>
              )}
              {!landlordProfile.businessAddress && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Business Address</p>
                  <p className="text-gray-400 italic">Not specified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State Message */}
        {!landlordProfile.companyName &&
          !landlordProfile.phoneNumber &&
          !landlordProfile.bio &&
          !landlordProfile.yearsOfExperience &&
          !landlordProfile.businessAddress && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 mb-4">
                Add your professional information to help students know more
                about you and build trust.
              </p>
              <button
                onClick={() => router.push("/landlord/profile/edit")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Complete Profile Now
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
