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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">Track your booking requests and approvals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Total Bookings</div>
              <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Pending</div>
              <div className="text-3xl font-bold text-yellow-500">
                {bookings.filter((b) => b.status === "PENDING").length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Approved</div>
              <div className="text-3xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "APPROVED").length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Cancelled</div>
              <div className="text-3xl font-bold text-red-600">
                {bookings.filter((b) => b.status === "CANCELLED" || b.status === "REJECTED").length}
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-2 flex gap-2">
            {["ALL", "PENDING", "APPROVED", "CANCELLED"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                  filter === tab
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {filter === "ALL" ? "No bookings yet" : `No ${filter.toLowerCase()} bookings`}
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === "ALL"
                  ? "Start booking properties to find your perfect student accommodation"
                  : `You don't have any ${filter.toLowerCase()} bookings at the moment`}
              </p>
              <button
                onClick={() => router.push("/explore")}
                className="text-blue-600 font-bold hover:underline"
              >
                Explore Properties →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    {booking.property?.images && booking.property.images.length > 0 && (
                      <img
                        src={booking.property.images[0]}
                        alt={booking.property.title}
                        className="w-full lg:w-48 h-48 object-cover rounded-xl"
                      />
                    )}

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {booking.property?.title}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.property?.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              <span>{booking.property?.college}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4" />
                              <span className="text-lg font-bold text-blue-600">
                                ₹{booking.property?.price?.toLocaleString("en-IN")}/mo
                              </span>
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={getStatusBadge(booking.status)} />
                      </div>

                      {/* Landlord Info */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="text-sm text-gray-500 mb-1">Landlord</div>
                        <div className="font-semibold text-gray-900">{booking.landlord?.name}</div>
                        <div className="text-sm text-gray-600">{booking.landlord?.email}</div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Requested on {formatDate(booking.createdAt)}</span>
                        </div>
                        <div className="flex gap-3">
                          {booking.status === "PENDING" && (
                            <button
                              onClick={() => setCancelBookingId(booking._id)}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                            >
                              Cancel Request
                            </button>
                          )}
                          <button
                            onClick={() => router.push(`/explore/${booking.property?._id}`)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
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

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!cancelBookingId}
        onClose={() => setCancelBookingId(null)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking Request?"
        message="Are you sure you want to cancel this booking request? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        variant="danger"
      />
    </Layout>
  );
}
