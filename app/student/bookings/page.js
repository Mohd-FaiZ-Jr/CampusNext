"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Calendar, MapPin, Home, GraduationCap, Clock } from "lucide-react";

export default function StudentBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, APPROVED, CANCELLED
  const [cancelBookingId, setCancelBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/bookings/me");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const res = await fetch(`/api/bookings/${cancelBookingId}/cancel`, {
        method: "PATCH",
      });

      if (res.ok) {
        await fetchBookings();
        setCancelBookingId(null);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
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

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "ALL") return true;
    return booking.status === filter;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-24 pb-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= HEADER ================= */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold font-raleway text-gray-900 tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 text-gray-600 font-poppins text-sm sm:text-base">
              Track your booking requests and approvals in one place.
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              {
                label: "Total Bookings",
                value: bookings.length,
                accent: "bg-blue-50 text-blue-600",
              },
              {
                label: "Pending",
                value: bookings.filter((b) => b.status === "PENDING").length,
                accent: "bg-amber-50 text-amber-600",
              },
              {
                label: "Approved",
                value: bookings.filter((b) => b.status === "APPROVED").length,
                accent: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Cancelled",
                value: bookings.filter(
                  (b) => b.status === "CANCELLED" || b.status === "REJECTED"
                ).length,
                accent: "bg-rose-50 text-rose-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Label */}
                <p className="text-xs sm:text-sm text-gray-500 font-medium font-poppins tracking-wide">
                  {stat.label}
                </p>

                {/* Value + Accent Indicator */}
                <div className="flex items-end justify-between mt-4">
                  <p className="text-2xl sm:text-3xl font-semibold font-montserrat text-gray-900">
                    {stat.value}
                  </p>

                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-semibold font-poppins ${stat.accent}`}
                  >
                    •
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* ================= FILTER TABS ================= */}
          <div className="mb-8">
            <div className="relative w-full overflow-x-auto">
              <div className="inline-flex min-w-max sm:min-w-0 items-center gap-1 p-1 rounded-2xl bg-gray-50 border border-gray-200">
                {["ALL", "PENDING", "APPROVED", "CANCELLED"].map((tab) => {
                  const isActive = filter === tab;

                  return (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`
              relative px-5 py-2.5 text-sm font-medium font-poppins rounded-xl
              whitespace-nowrap transition-all duration-200 ease-out
              ${isActive
                          ? "bg-gray-800 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                        }
            `}
                    >
                      {tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>


          {/* ================= CONTENT ================= */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 px-6">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold font-raleway text-gray-900">
                {filter === "ALL"
                  ? "No bookings yet"
                  : `No ${filter.toLowerCase()} bookings`}
              </h3>
              <p className="mt-2 text-gray-500 font-poppins text-sm max-w-md mx-auto">
                {filter === "ALL"
                  ? "Start exploring properties and book your perfect accommodation."
                  : `You don’t have any ${filter.toLowerCase()} bookings at the moment.`}
              </p>
              <button
                onClick={() => router.push("/explore")}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
              >
                Explore Properties →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col xl:flex-row">

                    {/* ================= IMAGE ================= */}
                    {booking.property?.images?.length > 0 && (
                      <div className="w-full xl:w-64 h-56 xl:h-auto flex-shrink-0">
                        <img
                          src={booking.property.images[0]}
                          alt={booking.property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* ================= DETAILS ================= */}
                    <div className="flex-1 p-6 flex flex-col justify-between">

                      <div>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                          {/* LEFT CONTENT */}
                          <div className="min-w-0 flex-1 space-y-4">

                            {/* Title + Price */}
                            <div className="space-y-2">
                              <h3 className="text-xl sm:text-2xl font-semibold font-raleway text-gray-900 leading-snug truncate">
                                {booking.property?.title}
                              </h3>

                              <p className="text-lg font-bold font-montserrat text-gray-900">
                                ₹{booking.property?.price?.toLocaleString("en-IN")}
                                <span className="text-sm font-medium text-gray-500"> / month</span>
                              </p>
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-2 text-sm text-gray-600 font-poppins">

                              <div className="flex items-center gap-2 truncate">
                                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                <span className="truncate">
                                  {booking.property?.address}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 truncate">
                                <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
                                <span className="truncate">
                                  {booking.property?.college}
                                </span>
                              </div>

                            </div>
                          </div>

                          {/* STATUS BADGE */}
                          <div className="flex-shrink-0 font-raleway">
                            <StatusBadge status={getStatusBadge(booking.status)} />
                          </div>

                        </div>


                        {/* Landlord */}
                        <div className="mt-5 bg-gray-50 rounded-xl p-4 font-montserrat">
                          <p className="text-xs text-gray-500 font-medium">
                            Landlord
                          </p>
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {booking.landlord?.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {booking.landlord?.email}
                          </p>
                        </div>
                      </div>

                      {/* ================= FOOTER ================= */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-2 text-xs text-gray-500 font-poppins">
                          <Clock className="w-4 h-4" />
                          Requested on {formatDate(booking.createdAt)}
                        </div>

                        <div className="flex flex-wrap gap-3 font-nunito">
                          {booking.status === "PENDING" && (
                            <button
                              onClick={() => setCancelBookingId(booking._id)}
                              className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            onClick={() =>
                              router.push(`/explore/${booking.property?._id}`)
                            }
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
                          >
                            View Property
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!cancelBookingId}
        onClose={() => setCancelBookingId(null)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking Request?"
        message="Are you sure you want to cancel this booking request? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="Keep It"
        variant="danger"
      />
    </Layout>

  );
}
