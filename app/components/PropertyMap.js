"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet's default icon issue with Webpack/Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to update map center when coordinates change
function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, 14);
    return null;
}

export default function PropertyMap({ coordinates, title }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Debug logging
    console.log("PropertyMap received coordinates:", coordinates);
    console.log("Coordinates type:", typeof coordinates);
    console.log("Is array:", Array.isArray(coordinates));

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-zinc-400">
                Loading Map...
            </div>
        );
    }

    // Validate coordinates
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
        console.error("Invalid coordinates:", coordinates);
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-zinc-400">
                Invalid coordinates
            </div>
        );
    }

    // Validate that coordinates are numbers
    const [lng, lat] = coordinates;
    if (typeof lng !== 'number' || typeof lat !== 'number' || isNaN(lng) || isNaN(lat)) {
        console.error("Coordinates are not valid numbers:", { lng, lat });
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-zinc-400">
                Invalid coordinate values
            </div>
        );
    }

    // Default to New Delhi if no coordinates
    // Note: Leaflet uses [lat, lng], while GeoJSON/MapLibre uses [lng, lat]
    // We need to swap them if the input is [lng, lat]
    const position = [lat, lng]; // Swap from GeoJSON [lng, lat] to Leaflet [lat, lng]

    console.log("Final position for map:", position);

    return (
        <MapContainer
            center={position}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeView center={position} />

            <Marker position={position} icon={icon}>
                <Popup>
                    <div className="font-semibold text-sm">
                        {title || "Property Location"}
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}