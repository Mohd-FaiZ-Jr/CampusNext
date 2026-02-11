"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../../services/studentService";
import ImageUpload from "../../../components/ImageUpload";
import {
  User,
  GraduationCap,
  BookOpen,
  MapPin,
  Phone,
  ShieldAlert,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function EditStudentProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    universityName: "",
    course: "",
    yearOfStudy: "",
    studentId: "",
    bio: "",
    permanentAddress: "",
    profileImage: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getStudentProfile();
      const student = data.profile.studentProfile || {};

      setFormData({
        universityName: student.universityName || "",
        course: student.course || "",
        yearOfStudy: student.yearOfStudy || "",
        studentId: student.studentId || "",
        bio: student.bio || "",
        permanentAddress: student.permanentAddress || "",
        profileImage: student.profileImage || "",
        emergencyContactName: student.emergencyContact?.name || "",
        emergencyContactRelation: student.emergencyContact?.relation || "",
        emergencyContactPhone: student.emergencyContact?.phoneNumber || "",
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
    setFormData((prev) => ({
      ...prev,
      profileImage: images.length > 0 ? images[0] : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate phone number if provided
      if (
        formData.emergencyContactPhone &&
        !/^\d{10}$/.test(formData.emergencyContactPhone)
      ) {
        throw new Error(
          "Emergency contact phone number must be exactly 10 digits",
        );
      }

      const updateData = {
        universityName: formData.universityName,
        course: formData.course,
        yearOfStudy: formData.yearOfStudy,
        studentId: formData.studentId,
        bio: formData.bio,
        permanentAddress: formData.permanentAddress,
        profileImage: formData.profileImage,
        emergencyContact: {
          name: formData.emergencyContactName,
          relation: formData.emergencyContactRelation,
          phoneNumber: formData.emergencyContactPhone,
        },
      };

      await updateStudentProfile(updateData);
      setSuccess("Profile updated successfully!");

      // Redirect after short delay
      setTimeout(() => {
        router.push("/student/profile");
      }, 1500);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Header */}
            <div className="relative overflow-hidden px-10 py-12 border-b border-gray-200">

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://thumbs.dreamstime.com/b/grungy-dark-room-background-old-brick-wall-concrete-floor-as-36332180.jpg')",
                }}
              />

              {/* Dark Overlay for Readability */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

              {/* Content */}
              <div className="relative">
                <h1 className="text-3xl font-bold text-white tracking-tight font-montserrat">
                  Edit Profile
                </h1>
                <p className="text-gray-200 mt-2 text-sm font-raleway">
                  Keep your information accurate and up to date
                </p>
              </div>
            </div>




            <form onSubmit={handleSubmit} className="px-10 py-10 space-y-12">

              {/* Alerts */}
              {(error || success) && (
                <div className="space-y-4">
                  {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <p className="text-sm font-nunito">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <p className="text-sm font-nunito">{success}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Photo */}
              <Section title="Profile Photo">
                <ImageUpload
                  onImagesChange={handleImagesChange}
                  existingImages={
                    formData.profileImage ? [formData.profileImage] : []
                  }
                  maxImages={1}
                />
              </Section>

              {/* Academic Section */}
              <Section
                title="Academic Information"
                icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <InputField
                    label="University Name"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    placeholder="e.g. Stanford University"
                    icon={<GraduationCap className="w-5 h-5 text-gray-400" />}
                  />

                  <InputField
                    label="Student ID"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="e.g. ST123456"
                    icon={<User className="w-5 h-5 text-gray-400" />}
                  />

                  <InputField
                    label="Course / Major"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    icon={<BookOpen className="w-5 h-5 text-gray-400" />}
                  />

                  <SelectField
                    label="Year of Study"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                  />
                </div>
              </Section>

              {/* Bio */}
              <Section title="About You">
                <div>
                  <label className="flex justify-between text-sm font-medium text-gray-700 mb-2 font-raleway">
                    <span>Short Bio</span>
                    <span className="text-xs text-gray-400">
                      {formData.bio.length}/500
                    </span>
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none resize-none font-nunito"
                    placeholder="Tell landlords a bit about yourself..."
                  />
                </div>
              </Section>

              {/* Personal Info */}
              <Section
                title="Personal Information"
                icon={<User className="w-5 h-5 text-blue-600" />}
              >
                <InputField
                  label="Permanent Address"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  placeholder="Your home address"
                  icon={<MapPin className="w-5 h-5 text-gray-400" />}
                />

                {/* Emergency */}
                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-6 font-poppins">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    Emergency Contact
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                      label="Contact Name"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      placeholder="Contact Person Name"
                    />

                    <InputField
                      label="Relation"
                      name="emergencyContactRelation"
                      value={formData.emergencyContactRelation}
                      onChange={handleChange}
                      placeholder="Parent, Guardian"
                    />

                    <div className="md:col-span-2">
                      <InputField
                        label="Phone Number"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        placeholder="xxxxxxxxxx"
                        icon={<Phone className="w-4 h-4 text-gray-400" />}
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition font-nunito"
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold font-nunito rounded-2xl hover:bg-blue-700 transition shadow-md disabled:opacity-70 flex items-center gap-2 font-montserrat"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>

  );
}
const SelectField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none bg-white font-nunito"
    >
      <option value="">Select Year</option>
      <option value="1st Year">1st Year</option>
      <option value="2nd Year">2nd Year</option>
      <option value="3rd Year">3rd Year</option>
      <option value="4th Year">4th Year</option>
      <option value="5th Year">5th Year</option>
      <option value="Postgraduate">Postgraduate</option>
      <option value="Other">Other</option>
    </select>
  </div>
);

const InputField = ({
  label,
  icon,
  type = "text",
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2 font-raleway">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3">
          {icon}
        </div>
      )}
      <input
        type={type}
        {...props}
        className={`w-full ${icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none font-nunito`}
      />
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
      {icon}
      <h2 className="text-lg font-semibold text-gray-900 font-poppins">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

