"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { getStudentProfile } from "../../services/studentService";
import {
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  ShieldAlert,
} from "lucide-react";

export default function StudentProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getStudentProfile();
      setProfile(data.profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "ST";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="text-red-500 text-xl font-bold mb-4">
            Error loading profile
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  if (!profile) return null;

  const studentProfile = profile.studentProfile || {};

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* ================= HEADER CARD ================= */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">

            {/* Cover */}

            <div className="relative h-40 w-full overflow-hidden">
              <img
                src="https://t3.ftcdn.net/jpg/02/95/16/52/360_F_295165234_HNUr5ZJ33hf04b4G3qBUnlKY0YB5Kq8R.jpg"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            </div>

            <div className="px-8 pb-8">
              <div className="relative flex flex-col lg:flex-row justify-between lg:items-end -mt-16 gap-6">

                {/* Profile Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">

                  {studentProfile.profileImage ? (
                    <img
                      src={studentProfile.profileImage}
                      alt={profile.name}
                      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-5xl font-semibold text-white font-poppins">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                  )}

                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-poppins">
                      {profile.name}
                    </h1>
                    <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 font-nunito">
                      {/* <Mail className="w-4 h-4" /> */}
                      {profile.email}
                    </p>
                  </div>
                </div>

                {/* CTA */}

                <button
                  onClick={() => router.push("/student/profile/edit")}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-nunito rounded-xl font-medium hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>


              </div>

              {/* Bio */}
              <div className="mt-8">
                {studentProfile.bio ? (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 font-poppins">
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-nunito">
                      {studentProfile.bio}
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                    <p className="text-blue-900 font-semibold mb-1 font-poppins">
                      Complete your profile
                    </p>
                    <p className="text-blue-600 text-sm mb-4 font-nunito">
                      Add a bio to help landlords understand you better.
                    </p>
                    <button
                      onClick={() => router.push("/student/profile/edit")}
                      className="px-4 py-2 font-nunito bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition"
                    >
                      Add Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= CONTENT GRID ================= */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Academic Info */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3 font-poppins">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Academic Information
              </h2>

              <div className="space-y-6 text-sm font-nunito">

                <InfoItem
                  icon={<User className="w-5 h-5 text-gray-400" />}
                  label="Student ID"
                  value={studentProfile.studentId || "Not added"}
                />

                <InfoItem
                  icon={<GraduationCap className="w-5 h-5 text-gray-400" />}
                  label="University"
                  value={studentProfile.universityName || "Not added"}
                />

                <InfoItem
                  icon={<BookOpen className="w-5 h-5 text-gray-400" />}
                  label="Course & Year"
                  value={
                    studentProfile.course
                      ? `${studentProfile.course}${studentProfile.yearOfStudy
                        ? ` • ${studentProfile.yearOfStudy}`
                        : ""
                      }`
                      : "Not added"
                  }
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">

              {/* Address */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3 font-poppins">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Address
                </h2>

                <InfoItem
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                  label="Permanent Address"
                  value={studentProfile.permanentAddress || "Not added"}
                />
              </div>

              {/* Emergency */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3 font-poppins">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  Emergency Contact
                </h2>

                {studentProfile.emergencyContact?.name ? (
                  <div className="space-y-6 text-sm">
                    <InfoItem
                      icon={<User className="w-5 h-5 text-gray-400" />}
                      label="Contact Person"
                      value={`${studentProfile.emergencyContact.name}${studentProfile.emergencyContact.relation
                        ? ` (${studentProfile.emergencyContact.relation})`
                        : ""
                        }`}
                    />

                    <InfoItem
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                      label="Phone Number"
                      value={
                        studentProfile.emergencyContact.phoneNumber ||
                        "Not added"
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No emergency contact added
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>

  );
}
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <div className="font-nunito">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide font-montserrat">
        {label}
      </p>
      <p className="text-gray-900 font-medium">
        {value}
      </p>
    </div>
  </div>
);
