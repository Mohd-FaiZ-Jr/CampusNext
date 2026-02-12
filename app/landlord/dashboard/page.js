"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import LandlordPropertyCard from "../../components/LandlordPropertyCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandlordDashboard() {
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchMyProperties();
        fetchBookings();
    }, []);

    const fetchMyProperties = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/landlord/properties");
            if (res.ok) {
                const data = await res.json();
                setProperties(data);
            } else {
                if (res.status === 403 || res.status === 401) {
                    // Not a landlord or not logged in
                    router.push("/explore"); // Redirect to explore or login
                }
                console.error("Failed to fetch properties");
            }
        } catch (error) {
            console.error("Error fetching properties", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings/me");
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/properties/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            // Remove from state immediately
            setProperties((prev) => prev.filter((p) => p.id !== id));
        } else {
            alert("Failed to delete property");
        }
    };

    const handleEdit = (id) => {
        router.push(`/landlord/properties/${id}/edit`);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* ================= HEADER ================= */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
                                Landlord Dashboard
                            </h1>
                            <p className="mt-2 text-gray-500 text-sm md:text-base font-raleway">
                                Manage your properties, track approvals, and monitor booking activity.
                            </p>
                        </div>

                        <Link
                            href="/landlord/properties/create"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold font-poppins shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            List New Property
                        </Link>
                    </div>

                    {/* ================= METRICS ================= */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">

                        {/* Total Listings */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                                Total Listings
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-gray-900 font-montserrat">
                                {properties.length}
                            </p>
                        </div>

                        {/* Active Approvals */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                                Active Approvals
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-green-600 font-montserrat">
                                {properties.filter(p => p.verified).length}
                            </p>
                        </div>

                        {/* Pending Review */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                                Pending Review
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-yellow-500 font-montserrat">
                                {properties.filter(p => !p.verified).length}
                            </p>
                        </div>

                        {/* Booking Requests */}
                        <div
                            onClick={() => router.push("/landlord/bookings")}
                            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                        >
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-nunito">
                                Booking Requests
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-blue-600 font-montserrat">
                                {bookings.filter(b => b.status === "PENDING").length}
                            </p>
                            <p className="mt-2 text-xs text-blue-500 font-poppins group-hover:underline">
                                View all requests →
                            </p>
                        </div>

                    </div>

                    {/* ================= PROPERTY SECTION ================= */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                        </div>
                    ) : properties.length === 0 ? (

                        /* EMPTY STATE */
                        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="text-5xl mb-6">🏠</div>

                            <h3 className="text-2xl font-semibold text-gray-900 font-montserrat">
                                No properties listed yet
                            </h3>

                            <p className="mt-3 text-gray-500 max-w-md mx-auto font-raleway text-sm md:text-base">
                                Start earning by listing your student accommodation. Create your first property in just a few minutes.
                            </p>

                            <Link
                                href="/landlord/properties/create"
                                className="inline-block mt-6 text-blue-600 font-semibold font-poppins hover:underline"
                            >
                                Create your first listing →
                            </Link>
                        </div>

                    ) : (

                        /* PROPERTY GRID */
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {properties.map((property) => (
                                <LandlordPropertyCard
                                    key={property.id}
                                    property={property}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ))}
                        </div>

                    )}

                </div>
            </div>
        </Layout>

    );
}
