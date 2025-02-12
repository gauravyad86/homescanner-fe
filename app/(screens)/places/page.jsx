"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";

let L;
if (typeof window !== "undefined") {
  L = require("leaflet");
  require("leaflet/dist/leaflet.css");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const DynamicPolyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

const RecenterAutomatically = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const RealEstateSearch = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "homescanner",
      text: "Welcome to Homescanner! Where are you looking to find properties today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [propertyListings, setPropertyListings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [mapZoom, setMapZoom] = useState(12);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showShortlistedButton, setShowShortlistedButton] = useState(false);
  const [showPropertyMarkers, setShowPropertyMarkers] = useState(false);
  const [hasDateTime, setHasDateTime] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
          setMapZoom(14);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&city=Delhi&country=India`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setMapZoom(14);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const queryGemini = async (prompt) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await response.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""
      );
    } catch (error) {
      console.error("API error:", error);
      return "";
    }
  };

  const handleGeneralQuery = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const greetings = [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
    ];
    const identityQuestions = [
      "who are you",
      "developed by",
      "created by",
      "what are you",
      "your name",
    ];
    if (greetings.some((g) => lowerMessage.includes(g))) {
      return "Hello! I'm Homescanner, your AI property assistant. Ready to help you find perfect properties!";
    }
    if (identityQuestions.some((q) => lowerMessage.includes(q))) {
      return "I'm an AI property specialist developed by the Homescanner team to help you find your dream property! 🏠";
    }
    return null;
  };

  const enhanceLocationQuery = async (rawInput) => {
    const enhancementPrompt = `Analyze this real estate query: "${rawInput}". Identify:
1. Primary city (prioritize official names)
2. Primary locality/neighborhood
3. If only locality is given, determine most likely city

Follow these rules:
- Convert abbreviations to full names (Delhi > New Delhi)
- Map common names to official names (Bangalore > Bengaluru)
- For standalone localities: Saket > Delhi, Bandra > Mumbai, Whitefield > Bengaluru

Respond with JSON: { 
  city?: string, 
  locality?: string, 
  certainty: "high"|"medium"|"low",
  needsClarification?: boolean
}

Examples:
- "Saket" → { "city": "Delhi", "locality": "Saket", "certainty": "high" }
- "Flats in Andheri" → { "city": "Mumbai", "locality": "Andheri West", "certainty": "high" }
- "Pune" → { "city": "Pune", "certainty": "high" }`;
    try {
      const response = await queryGemini(enhancementPrompt);
      const jsonStart = Math.max(response.indexOf("{"), 0);
      const jsonEnd = Math.min(response.lastIndexOf("}") + 1, response.length);
      return JSON.parse(response.slice(jsonStart, jsonEnd));
    } catch (error) {
      console.error("Location parsing error:", error);
      return { city: "", locality: "", certainty: "low", needsClarification: true };
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const simulateProcessingSteps = async (listings, hasDateTimeInfo) => {
    const randomBetween = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const totalFound = randomBetween(500, 700);
    const sourcesFound = randomBetween(12, 15);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: "Processing: Comparing property details across different platforms...",
      },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: `Found ${totalFound} properties from ${sourcesFound} sources`,
      },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Checking for duplicate properties..." },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Finalising best properties..." },
    ]);
    await delay(6000);
    const shortlistSources = randomBetween(1, 10);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: `Shortlisted ${listings.length} properties from ${shortlistSources} sources`,
      },
    ]);
    setShowPropertyMarkers(true);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: `Adding ${listings.length} properties to shortlist section...`,
      },
    ]);
    await delay(6000);
    setShowShortlistedButton(true);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: "Shortlisted properties ready. Click the 'View Shortlisted' button to see details.",
      },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Getting contact details of all the listings..." },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Calling all brokers and owners..." },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: `All ${listings.length} calls initiated` },
    ]);
    await delay(6000);
    const connected = randomBetween(0, listings.length);
    const notResponded = listings.length - connected;
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: `Call results: ${connected} connected, ${notResponded} did not respond` },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Adding all connected call summaries to shortlisted view..." },
    ]);
    await delay(6000);
    if (!hasDateTimeInfo) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "homescanner", text: "Should I arrange a visit to the shortlisted properties?" },
      ]);
      await delay(6000);
    }
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Getting locations of all the properties..." },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Planning route..." },
    ]);
    await delay(6000);
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Processing: Optimising route..." },
    ]);
    await delay(6000);
    const connectedListings = listings.slice(0, connected > 0 ? connected : listings.length);
    let sortedListings = connectedListings;
    if (userLocation) {
      sortedListings = connectedListings.slice().sort((a, b) => {
        const distanceA = getDistance(userLocation.lat, userLocation.lng, parseFloat(a.latitude), parseFloat(a.longitude));
        const distanceB = getDistance(userLocation.lat, userLocation.lng, parseFloat(b.latitude), parseFloat(b.longitude));
        return distanceA - distanceB;
      });
    }
    const routeCoords = sortedListings.map((prop) => [
      parseFloat(prop.latitude),
      parseFloat(prop.longitude),
    ]);
    if (routeCoords.length > 0) {
      setRouteCoordinates(routeCoords);
      const avgLat =
        routeCoords.reduce((sum, coord) => sum + coord[0], 0) / routeCoords.length;
      const avgLng =
        routeCoords.reduce((sum, coord) => sum + coord[1], 0) / routeCoords.length;
      setMapCenter([avgLat, avgLng]);
      setMapZoom(13);
      let routeMessage = "Route optimised for connected properties. Visit in the following order:\n";
      sortedListings.forEach((prop, idx) => {
        routeMessage += `${idx + 1}. ${prop.name}\n`;
      });
      setChatMessages((prev) => [
        ...prev,
        { sender: "homescanner", text: routeMessage.trim() },
      ]);
    } else {
      setChatMessages((prev) => [
        ...prev,
        { sender: "homescanner", text: "No connected properties available for route optimisation." },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;
    const userMessage = inputValue.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");
    const generalResponse = handleGeneralQuery(userMessage);
    const dateTimeRegex = /(\d{1,2}:\d{2}\s*(AM|PM|am|pm))|(\d{1,2}\/\d{1,2}\/\d{2,4})/;
    setHasDateTime(dateTimeRegex.test(userMessage));
    if (generalResponse) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "homescanner", text: generalResponse },
      ]);
      return;
    }
    setLoading(true);
    const locationData = await enhanceLocationQuery(userMessage);
    if (locationData.needsClarification || locationData.certainty === "low") {
      const clarificationMessage =
        locationData.city || locationData.locality
          ? `I found ${locationData.locality ? `${locationData.locality} area` : ""}${
              locationData.city ? ` in ${locationData.city}` : ""
            }. Is this correct?`
          : "Could you please specify the city and/or locality? (e.g. '3BHK in Saket, Delhi' or 'Apartments near Marine Drive, Mumbai')";
      setChatMessages((prev) => [
        ...prev,
        { sender: "homescanner", text: clarificationMessage },
      ]);
      setLoading(false);
      return;
    }
    try {
      const apiParams = new URLSearchParams();
      if (locationData.city) apiParams.append("city", locationData.city);
      if (locationData.locality) apiParams.append("locality", locationData.locality);
      const response = await fetch(
        `http://65.0.207.184:4001/api/listings?${apiParams}`
      );
      const listings = await response.json();
      setPropertyListings(listings);
      await simulateProcessingSteps(listings, hasDateTime);
    } catch (error) {
      console.error("Fetch error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "homescanner",
          text: "🚨 Connection issue. Please try again in a moment.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "homescanner",
        text: `📍 Selected: ${property.name}. Click the card below for full details.`,
      },
    ]);
  };

  const handlePropertyClick = (property) => {
    window.open(property.link, "_blank");
  };

  const handleViewShortlisted = () => {
    setChatMessages((prev) => [
      ...prev,
      { sender: "homescanner", text: "Shortlisted Properties:" },
    ]);
    propertyListings.forEach((property, idx) => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "homescanner",
          text: `${idx + 1}. ${property.name} - ${property.address} - ${property.price}`,
        },
      ]);
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full h-1/2 md:h-full relative">
        <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md space-y-2">
          <select className="w-full p-1 border rounded">
            <option>Delhi</option>
          </select>
          <input
            type="text"
            className="w-full p-1 border rounded"
            placeholder="Search areas in Delhi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <DynamicMapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full">
          <RecenterAutomatically center={mapCenter} zoom={mapZoom} />
          <DynamicTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showPropertyMarkers &&
            propertyListings.map((property, index) => (
              <DynamicMarker
                key={index}
                position={[
                  parseFloat(property.latitude),
                  parseFloat(property.longitude),
                ]}
                eventHandlers={{ click: () => handleMarkerClick(property) }}
              >
                <DynamicPopup className="font-semibold">
                  {property.name}
                </DynamicPopup>
              </DynamicMarker>
            ))}
          {routeCoordinates.length > 0 && (
            <>
              {routeCoordinates.map((coord, idx) => (
                <DynamicMarker key={idx} position={coord}>
                  <DynamicPopup>Route Point {idx + 1}</DynamicPopup>
                </DynamicMarker>
              ))}
              <DynamicPolyline positions={routeCoordinates} color="red" />
            </>
          )}
          {userLocation && L && (
            <DynamicMarker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.icon({
                iconUrl:
                  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                shadowSize: [41, 41],
              })}
            >
              <DynamicPopup>Your Current Location</DynamicPopup>
            </DynamicMarker>
          )}
        </DynamicMapContainer>
      </div>
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col bg-gray-100">
        <div className="flex-grow p-4 overflow-y-auto" ref={chatContainerRef}>
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${
                msg.sender === "homescanner"
                  ? msg.text.startsWith("Processing:")
                    ? "text-gray-500"
                    : "text-blue-700"
                  : "text-green-700"
              }`}
            >
              <p className="font-semibold">
                {msg.sender === "homescanner" ? "Homescanner" : "You"}
              </p>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
          {selectedProperty && (
            <div
              className="p-4 border rounded bg-white cursor-pointer hover:shadow-lg mt-4"
              onClick={() => handlePropertyClick(selectedProperty)}
            >
              <h2 className="text-lg font-bold text-blue-800">
                {selectedProperty.name}
              </h2>
              <p className="mt-2">
                <strong>📍 Address:</strong> {selectedProperty.address}
              </p>
              <p>
                <strong>💰 Price:</strong> {selectedProperty.price}
              </p>
              <p>
                <strong>📏 Size:</strong> {selectedProperty.builtUp}
              </p>
              {selectedProperty.description && (
                <p className="mt-2 text-gray-600">
                  {selectedProperty.description}
                </p>
              )}
            </div>
          )}
          {showShortlistedButton && (
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={handleViewShortlisted}
            >
              View Shortlisted
            </button>
          )}
        </div>
        <div className="p-4 border-t sticky bottom-0 bg-gray-100">
          <div className="flex">
            <input
              type="text"
              className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="e.g. '2BHK in Saket' or 'Luxury apartments Mumbai'..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "🔍 Searching..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSearch;