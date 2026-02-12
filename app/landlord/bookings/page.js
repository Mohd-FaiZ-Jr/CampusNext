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
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
              Booking Requests
            </h1>
            <p className="mt-2 text-gray-500 font-raleway text-sm md:text-base">
              Review and manage booking requests from students.
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

            {/* Total */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                Total Requests
              </p>
              <p className="mt-3 text-3xl font-semibold text-gray-900 font-montserrat">
                {bookings.length}
              </p>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                Pending
              </p>
              <p className="mt-3 text-3xl font-semibold text-yellow-500 font-montserrat">
                {bookings.filter((b) => b.status === "PENDING").length}
              </p>
            </div>

            {/* Approved */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                Approved
              </p>
              <p className="mt-3 text-3xl font-semibold text-green-600 font-montserrat">
                {bookings.filter((b) => b.status === "APPROVED").length}
              </p>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                Rejected
              </p>
              <p className="mt-3 text-3xl font-semibold text-red-600 font-montserrat">
                {bookings.filter(
                  (b) => b.status === "CANCELLED" || b.status === "REJECTED"
                ).length}
              </p>
            </div>
          </div>

          {/* ================= FILTER TABS ================= */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-10 p-1.5 flex gap-2">

            {["ALL", "PENDING", "APPROVED", "CANCELLED"].map((tab) => {
              const isActive = filter === tab;
              const pendingCount =
                tab === "PENDING"
                  ? bookings.filter((b) => b.status === "PENDING").length
                  : 0;

              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold font-poppins transition-all duration-200 ${isActive
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab.charAt(0) + tab.slice(1).toLowerCase()}

                  {tab === "PENDING" && pendingCount > 0 && (
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ================= BOOKINGS LIST ================= */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
            </div>
          ) : filteredBookings.length === 0 ? (

            /* EMPTY STATE */
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">

              <FileText className="w-16 h-16 mx-auto text-gray-300 mb-6" />

              <h3 className="text-2xl font-semibold text-gray-900 font-montserrat">
                {filter === "ALL"
                  ? "No booking requests yet"
                  : `No ${filter.toLowerCase()} bookings`}
              </h3>

              <p className="mt-3 text-gray-500 font-raleway max-w-md mx-auto">
                {filter === "ALL"
                  ? "Booking requests from students will appear here once submitted."
                  : `You currently have no ${filter.toLowerCase()} bookings.`}
              </p>

              {filter === "ALL" && (
                <button
                  onClick={() => router.push("/landlord/dashboard")}
                  className="mt-6 inline-block text-blue-600 font-semibold font-poppins hover:underline"
                >
                  Go to Dashboard →
                </button>
              )}
            </div>

          ) : (

            /* BOOKING CARDS */
            <div className="space-y-6">
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
