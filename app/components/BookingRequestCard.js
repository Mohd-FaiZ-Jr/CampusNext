"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Home,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function BookingRequestCard({ booking, onApprove, onReject }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await onApprove(booking._id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await onReject(booking._id);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: "pending",
      APPROVED: "verified",
      CANCELLED: "rejected",
      REJECTED: "rejected",
    };
    return statusMap[status] || "pending";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const student = booking.student;
  const studentProfile = student?.studentProfile || {};

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Property Image */}
        {booking.property?.images && booking.property.images.length > 0 && (
          <img
            src={booking.property.images[0]}
            alt={booking.property.title}
            className="w-full lg:w-40 h-40 object-cover rounded-xl"
          />
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {booking.property?.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.property?.college}</span>
              </div>
            </div>
            <StatusBadge status={getStatusBadge(booking.status)} />
          </div>

          {/* Student Details */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {student?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{student?.name}</h4>
                <p className="text-sm text-gray-600">Student Applicant</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Email */}
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{student?.email}</span>
              </div>

              {/* Phone */}
              {studentProfile.phoneNumber && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{studentProfile.phoneNumber}</span>
                </div>
              )}

              {/* University */}
              {studentProfile.universityName && (
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">{studentProfile.universityName}</span>
                </div>
              )}

              {/* Course & Year */}
              {(studentProfile.course || studentProfile.yearOfStudy) && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">
                    {studentProfile.course}
                    {studentProfile.course && studentProfile.yearOfStudy && " - "}
                    {studentProfile.yearOfStudy}
                  </span>
                </div>
              )}

              {/* Student ID */}
              {studentProfile.studentId && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">ID: {studentProfile.studentId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Requested on {formatDate(booking.createdAt)}</span>
            </div>

            {/* Action Buttons */}
            {booking.status === "PENDING" && (
              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  disabled={isProcessing}
                  className="px-5 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
