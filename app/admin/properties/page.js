"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import Link from "next/link";
import { BedDouble, MapPin, Eye } from "lucide-react";

export default function AdminPropertiesPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    searchParams.get("status") || "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    propertyId: null,
  });

  useEffect(() => {
    fetchProperties();
  }, [activeTab, searchTerm]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== "all") params.append("status", activeTab);
      if (searchTerm) params.append("search", searchTerm);

      const res = await fetch(`/api/admin/properties?${params.toString()}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties || []);
      } else {
        const error = await res.json();
        console.error("Failed to fetch properties:", res.status, error);
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (propertyId) => {
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/verify`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: true }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Property verified! Approval email sent to landlord.`);
        fetchProperties();
        setConfirmDialog({ isOpen: false, action: null, propertyId: null });
      } else {
        alert(`❌ Failed to verify: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error verifying:", error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  const handleReject = async (propertyId) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/reject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Property rejected! Email sent to landlord.`);
        fetchProperties();
      } else {
        alert(`❌ Failed to reject: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error rejecting:", error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "verified", label: "Verified" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-montserrat">
          Properties
        </h1>
        <p className="text-gray-500 mt-2 font-raleway">
          Review and manage all property listings
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 sm:pr-5 py-3 sm:py-3 min-h-[44px] border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 font-nunito text-sm transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-1" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all font-poppins whitespace-nowrap snap-start flex-shrink-0 min-h-[44px] ${activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Cards — Explore Page Style */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-900 border-t-transparent"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 font-montserrat">
            No properties found
          </h3>
          <p className="text-sm text-gray-500 font-poppins">
            Try adjusting your filters or search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="group">
              <div className="bg-white rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl">
                      🏠
                    </div>
                  )}

                  {/* Status Badge */}
                  {property.verified && (
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm font-poppins">
                      ✓ Verified
                    </span>
                  )}
                  {!property.verified && !property.rejectedAt && (
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm font-poppins">
                      ⏳ Pending
                    </span>
                  )}
                  {property.rejectedAt && (
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-red-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm font-poppins">
                      ✕ Rejected
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-1 font-poppins">
                    {property.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1.5 font-poppins flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Near {property.college}
                  </p>

                  {/* Owner */}
                  <div className="mt-3 bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 font-poppins">
                      Owner: <span className="font-medium text-gray-800">{property.owner.name}</span>
                    </p>
                  </div>

                  {/* Rejection */}
                  {property.rejectionReason && (
                    <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-2.5">
                      <p className="text-xs text-red-700 font-poppins line-clamp-2">
                        <span className="font-semibold">Reason:</span> {property.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-poppins">
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>Single Room</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 font-montserrat">
                      ₹{property.price.toLocaleString("en-IN")}
                      <span className="text-xs text-gray-400 font-normal font-poppins">/mo</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    {!property.verified && !property.rejectedAt && (
                      <>
                        <button
                          onClick={() =>
                            setConfirmDialog({
                              isOpen: true,
                              action: "verify",
                              propertyId: property.id,
                            })
                          }
                          className="flex-1 bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-lg font-medium text-xs transition-all font-montserrat active:scale-95"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleReject(property.id)}
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 px-3 py-2 rounded-lg font-medium text-xs transition-all font-montserrat active:scale-95 border border-red-200"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <Link
                      href={`/explore/${property.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium text-xs transition-all text-center font-montserrat flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({ isOpen: false, action: null, propertyId: null })
        }
        onConfirm={() => handleVerify(confirmDialog.propertyId)}
        title="Verify Property"
        message="Are you sure you want to verify this property? It will be visible to all users."
        confirmText="Verify"
        variant="primary"
      />
    </div>
  );
}
