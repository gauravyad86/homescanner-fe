
"use client";
import React, { useState, useRef } from "react";
import { GoogleMap, Autocomplete, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useCombinedContext } from "@/app/context/CombinedContext";
const center = {
  lat: 28.6139,
  lng: 77.209,
};

const sampleData = {
  location: "New Delhi",
  coordinates: "82.88 N, 22.22 E",
  address: "B-40, Jia Sarai, IIT Delhi Main Road, Hauz Khas, New Delhi, 110011",
  totalArea: "0.020 Dc = 900 Sq Ft",
  details: ["Metro", "School", "Govt Office", "Police Station", "Hospital", "Map", "Media"],
};

const GoogleMapComponent = ({ locations = [], search = false }) => {
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar: Search & Results */}
      <div className="w-full md:w-1/4 bg-white p-4 border-r overflow-y-auto">
        {/* Search Bar */}
        {search == false && <div className="relative mb-4">
          <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
            <input
              type="text"
              ref={inputRef}
              placeholder="Search a place..."
              className="border p-2 pr-10 rounded-full pl-4 w-full"
            />
          </Autocomplete>
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>}

        {/* Results */}
        <div className="mt-4">
          {locations.length > 0 ? (
            locations.map((item, index) => (
              <div key={index} className="p-2 border-b cursor-pointer">
                <p className="font-semibold">{item.location}</p>
                <p className="text-sm text-gray-500">{item.address}</p>
              </div>
            ))
          ) : (
            search == false && <LocationCard sampleData={sampleData} />
          )}
        </div>
      </div>

      {/* Google Map Section */}
      <div className="flex-grow h-2/3 md:h-full">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={selectedLocation}
          zoom={10}
        >
          {locations.map((item, index) => {
            const parts = item.coordinates.split(", ");
            const lat = parseFloat(parts[1]);
            const lng = parseFloat(parts[0]);
            return <Marker key={index} position={{ lat, lng }} />;
          })}
        </GoogleMap>
      </div>
    </div>
  );
};

// Use dynamic import to prevent SSR
export default dynamic(() => Promise.resolve(GoogleMapComponent), { ssr: false });

const LocationCard = ({ sampleData }) => {
  const { addToFavorites } = useCombinedContext();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToFavorites = () => {
    addToFavorites(sampleData);
    setShowPopup(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this location",
          text: `Check out ${sampleData.location}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Sharing failed", err));
    } else {
      alert("Sharing not supported in this browser.");
    }
    setShowPopup(false);
  };

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2 className="text-lg font-bold">{sampleData.location}</h2>
      <p><strong>Coordinates:</strong> {sampleData.coordinates}</p>
      <p><strong>Address:</strong> {sampleData.address}</p>
      <p><strong>Total Area:</strong> {sampleData.totalArea}</p>
      <p><strong>Details:</strong></p>
      <ul className="list-disc ml-5">
        {sampleData.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded w-full" onClick={() => setShowPopup(true)}>
        Add to Places
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg px-6 py-6 shadow-lg text-center w-80">
            <button
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-700 text-xl border border-black rounded-full hover:bg-gray-400 transition"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <p className="text-lg font-semibold mb-4">Favorites</p>
            <div className="flex flex-col gap-4">
              <button
                className="px-10 py-2 text-green-500 rounded-full border border-green-500"
                onClick={handleAddToFavorites}
              >
                Add
              </button>
              <button
                className="px-10 py-2 text-blue-500 rounded-full border border-blue-500"
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};