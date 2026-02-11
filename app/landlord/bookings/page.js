"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import BookingRequestCard from "../../components/BookingRequestCard";
import { FileText } from "lucide-react";

export default function LandlordBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, APPROVED, CANCELLED

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
        if (res.status === 403 || res.status === 401) {
          router.push("/explore");
        }
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/approve`, {
        method: "PATCH",
      });

      if (res.ok) {
        await fetchBookings();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to approve booking");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });

      if (res.ok) {
        await fetchBookings();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to reject booking");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
      alert("Failed to reject booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "ALL") return true;
    if (filter === "CANCELLED") return booking.status === "CANCELLED" || booking.status === "REJECTED";
    return booking.status === filter;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Requests</h1>
            <p className="text-gray-600">Manage booking requests for your properties</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Total Requests</div>
              <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-gray-500 font-semibold mb-2">Pending Review</div>
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
              <div className="text-gray-500 font-semibold mb-2">Rejected</div>
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
                {tab === "PENDING" && bookings.filter((b) => b.status === "PENDING").length > 0 && (
                  <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {bookings.filter((b) => b.status === "PENDING").length}
                  </span>
                )}
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
              <div className="text-6xl mb-4">
                <FileText className="w-20 h-20 mx-auto text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {filter === "ALL" ? "No booking requests yet" : `No ${filter.toLowerCase()} bookings`}
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === "ALL"
                  ? "Booking requests from students will appear here"
                  : `You don't have any ${filter.toLowerCase()} bookings at the moment`}
              </p>
              {filter === "ALL" && (
                <button
                  onClick={() => router.push("/landlord/dashboard")}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Go to Dashboard →
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingRequestCard
                  key={booking._id}
                  booking={booking}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
