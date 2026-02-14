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
                    router.push("/explore");
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
            setProperties((prev) => prev.filter((p) => p.id !== id));
        } else {
            alert("Failed to delete property");
        }
    };

    const handleEdit = (id) => {
        router.push(`/landlord/properties/${id}/edit`);
    };

    const totalListings = properties.length;
    const approvedCount = properties.filter(p => p.verified).length;
    const pendingCount = properties.filter(p => !p.verified).length;
    const pendingBookings = bookings.filter(b => b.status === "PENDING").length;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 pt-16">

                {/* ================= HEADER ================= */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-nunito">
                            <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-700 font-medium">Dashboard</span>
                        </div>

                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 font-montserrat tracking-tight">
                                    Landlord Dashboard
                                </h1>
                                <p className="mt-1.5 text-sm text-gray-500 font-raleway">
                                    Manage your properties, track approvals, and monitor bookings.
                                </p>
                            </div>

                            <Link
                                href="/landlord/properties/create"
                                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold font-poppins shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] flex-shrink-0"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="hidden sm:inline">List New Property</span>
                                <span className="sm:hidden">New Listing</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                    {/* ================= METRICS ================= */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">

                        {/* Total Listings */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-nunito font-bold">
                                Total Listings
                            </p>
                            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900 font-montserrat">
                                {totalListings}
                            </p>
                        </div>

                        {/* Active Approvals */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-nunito font-bold">
                                Approved
                            </p>
                            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-green-600 font-montserrat">
                                {approvedCount}
                            </p>
                        </div>

                        {/* Pending Review */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition">
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-nunito font-bold">
                                Pending
                            </p>
                            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-yellow-500 font-montserrat">
                                {pendingCount}
                            </p>
                        </div>

                        {/* Booking Requests */}
                        <div
                            onClick={() => router.push("/landlord/bookings")}
                            className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                        >
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-nunito font-bold">
                                Bookings
                            </p>
                            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-blue-600 font-montserrat">
                                {pendingBookings}
                            </p>
                            <p className="mt-1.5 text-xs text-blue-500 font-poppins group-hover:underline">
                                View requests →
                            </p>
                        </div>

                    </div>

                    {/* ================= PROPERTY SECTION ================= */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-900 border-t-transparent"></div>
                                <p className="mt-4 text-sm text-gray-500 font-poppins">Loading properties...</p>
                            </div>
                        </div>
                    ) : properties.length === 0 ? (

                        /* EMPTY STATE */
                        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                            <div className="text-5xl mb-5">🏠</div>

                            <h3 className="text-xl font-semibold text-gray-900 font-montserrat">
                                No properties listed yet
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto font-raleway">
                                Start earning by listing your student accommodation. Create your first property in just a few minutes.
                            </p>

                            <Link
                                href="/landlord/properties/create"
                                className="inline-block mt-6 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold font-poppins transition-all"
                            >
                                Create your first listing
                            </Link>
                        </div>

                    ) : (

                        /* PROPERTY GRID */
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 font-montserrat mb-5">
                                Your Properties
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                                {properties.map((property) => (
                                    <LandlordPropertyCard
                                        key={property.id}
                                        property={property}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />
                                ))}
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </Layout>

    );
}
