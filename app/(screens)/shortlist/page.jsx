"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, Share2 } from "lucide-react"; 

const Map = dynamic(() => import("../map/MapComponent"), { ssr: false });
const propertyData = [
  {
    "id": 1,
    "price": "₹8 Cr",
    "bhk": "3 BHK",
    "type": "Flat",
    "title": "3 BHK Flat In Yellow Bells, Haralur For Sale In Haralur",
    "pricePerSqFt": "₹10,114",
    "builtUp": "1,928 sqft",
    "emi": "₹1.2 Lacs/Month",
    "facing": "East",
    "location": "Haralur, Bangalore",
    "latitude": 12.9081357,
    "longitude": 77.6518548,
    "description": "A spacious 3 BHK flat located in the heart of Haralur.",
    "shortlistedBy": "manual",
    "sources": ["99Acres", "MagicBricks", "Housing"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  },
  {
    "id": 2,
    "price": "₹5 Cr",
    "bhk": "2 BHK",
    "type": "Villa",
    "title": "Modern 2 BHK Villa in Indiranagar",
    "pricePerSqFt": "₹8,500",
    "builtUp": "1,500 sqft",
    "emi": "₹80,000/Month",
    "facing": "South",
    "location": "Indiranagar, Bangalore",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "description": "A luxurious villa with modern amenities in Indiranagar.",
    "shortlistedBy": "manual",
    "sources": ["99Acres", "MagicBricks"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  },
  {
    "id": 3,
    "price": "₹10 Cr",
    "bhk": "4 BHK",
    "type": "Independent House",
    "title": "Spacious 4 BHK Independent House in Whitefield",
    "pricePerSqFt": "₹12,000",
    "builtUp": "3,200 sqft",
    "emi": "₹1.5 Lacs/Month",
    "facing": "North",
    "location": "Whitefield, Bangalore",
    "latitude": 12.9698,
    "longitude": 77.7500,
    "description": "An independent house offering luxury and ample space in Whitefield.",
    "shortlistedBy": "manual",
    "sources": ["MagicBricks", "Housing"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  },
  {
    "id": 4,
    "price": "₹6.5 Cr",
    "bhk": "3 BHK",
    "type": "Apartment",
    "title": "Elegant 3 BHK Apartment in Koramangala",
    "pricePerSqFt": "₹9,500",
    "builtUp": "2,000 sqft",
    "emi": "₹1 Lacs/Month",
    "facing": "West",
    "location": "Koramangala, Bangalore",
    "latitude": 12.9352,
    "longitude": 77.6245,
    "description": "A beautifully designed apartment in the vibrant area of Koramangala.",
    "shortlistedBy": "manual",
    "sources": ["99Acres", "Housing", "MagicBricks"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  },
  {
    "id": 5,
    "price": "₹4 Cr",
    "bhk": "2 BHK",
    "type": "Condo",
    "title": "Cozy 2 BHK Condo in Jayanagar",
    "pricePerSqFt": "₹7,800",
    "builtUp": "1,200 sqft",
    "emi": "₹70,000/Month",
    "facing": "East",
    "location": "Jayanagar, Bangalore",
    "latitude": 12.9250,
    "longitude": 77.5938,
    "description": "A well-maintained condo offering comfort and convenience in Jayanagar.",
    "shortlistedBy": "manual",
    "sources": ["MagicBricks", "Housing"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  },
  {
    "id": 6,
    "price": "₹7 Cr",
    "bhk": "3 BHK",
    "type": "Penthouse",
    "title": "Luxurious 3 BHK Penthouse in Malleshwaram",
    "pricePerSqFt": "₹11,000",
    "builtUp": "2,300 sqft",
    "emi": "₹1.1 Lacs/Month",
    "facing": "North-East",
    "location": "Malleshwaram, Bangalore",
    "latitude": 13.0000,
    "longitude": 77.5700,
    "description": "A premium penthouse with panoramic views in Malleshwaram.",
    "shortlistedBy": "manual",
    "sources": ["99Acres", "MagicBricks", "Housing"],
    "image": "https://m.economictimes.com/thumb/msid-111780228,width-1200,height-900,resizemode-4,imgsize-22382/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg"
  }
];

export default function ShortlistPage() {
  const [shortlistType, setShortlistType] = useState("manual");
  const [searchLocation, setSearchLocation] = useState("");
  const [copiedPropertyId, setCopiedPropertyId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [budget, setBudget] = useState("");
  const [bhk, setBhk] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [openContactDropdown, setOpenContactDropdown] = useState(null);

  const [showSourcesPopup, setShowSourcesPopup] = useState(null);

  const filteredProperties = propertyData.filter(
    (property) =>
      property.shortlistedBy === shortlistType &&
      property.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      (budget === "" || property.price.includes(budget)) &&
      (bhk === "" || property.bhk === bhk) &&
      (propertyType === "" || property.type === propertyType)
  );

  const handleCopy = (property) => {
    const propertyDetails = `${property.price}, ${property.title}, ${property.location}`;
    navigator.clipboard.writeText(propertyDetails);
    setCopiedPropertyId(property.id);
    localStorage.setItem("copiedProperty", JSON.stringify(property));
  };

  const handleUncopy = () => {
    setCopiedPropertyId(null);
    localStorage.removeItem("copiedProperty");
  };

  const handleZoomToLocation = (property) => {
    setSelectedLocation({ latitude: property.latitude, longitude: property.longitude });
  };

  const toggleContactDropdown = (propertyId) => {
    setOpenContactDropdown((prev) => (prev === propertyId ? null : propertyId));
  };

  const toggleSourcesPopup = (propertyId) => {
    setShowSourcesPopup((prev) => (prev === propertyId ? null : propertyId));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Shortlists</h2>
          <div
            className="relative w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300"
            onClick={() =>
              setShortlistType(shortlistType === "manual" ? "ai" : "manual")
            }
          >
            <div
              className={`w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ${
                shortlistType === "manual"
                  ? "translate-x-0 bg-yellow-500 border border-yellow-600"
                  : "translate-x-6 bg-blue-500 border border-blue-600"
              }`}
            />
            <span className="absolute left-2 text-xs font-semibold text-gray-700">M</span>
            <span className="absolute right-2 text-xs font-semibold text-gray-700">AI</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by City, Locality"
            className="border p-2 rounded-3xl w-full md:w-2/4"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />

          {/* Budget Filter */}
          <select
            className="border p-2 rounded-3xl w-full md:w-1/4"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Select Budget</option>
            <option value="₹1 Cr">₹1 Cr</option>
            <option value="₹2 Cr">₹2 Cr</option>
            <option value="₹3 Cr">₹3 Cr</option>
            <option value="₹8 Cr">₹8 Cr</option>
          </select>

          {/* BHK Filter */}
          <select
            className="border p-2 rounded-3xl w-full md:w-1/4"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
          >
            <option value="">Select BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="Plot">Plot</option>
          </select>

          {/* Property Type Filter */}
          <select
            className="border p-2 rounded-3xl w-full md:w-2/4"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        {/* PROPERTY LIST */}
        {filteredProperties.map((property) => (
  <div key={property.id} className="bg-white p-4 rounded shadow mb-4 relative">
    {/* Row container for image and details */}
    <div className="flex flex-row">
      <Image
        src={property.image}
        alt={property.title}
        width={200}
        height={200}
        className="rounded mb-4"
      />
      <div className="ml-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xl font-semibold">{property.price}</div>
            <div className="text-sm text-gray-600 mt-1">{property.title}</div>
          </div>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => {
              // Currently does nothing
            }}
          >
            <Share2 size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
          <div className="font-semibold">
            Price/SQ.FT: <span className="font-normal">{property.pricePerSqFt}</span>
          </div>
          <div className="font-semibold">
            Built Up: <span className="font-normal">{property.builtUp}</span>
          </div>
          <div className="font-semibold">
            EMI: <span className="font-normal">{property.emi}</span>
          </div>
          <div className="font-semibold">
            Facing: <span className="font-normal">{property.facing}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">{property.description}</p>
      </div>
    </div>

    {/* Button Row */}
    <div className="flex items-center mt-4 gap-3">
      <div className="relative inline-block text-left">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => toggleContactDropdown(property.id)}
        >
          Contact Seller
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {openContactDropdown === property.id && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20">
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Call
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              WhatsApp
            </button>
          </div>
        )}
      </div>

      {copiedPropertyId === property.id ? (
        <button
          onClick={handleUncopy}
          className="px-4 py-2 text-sm border rounded bg-gray-100"
        >
          Uncopy
        </button>
      ) : (
        <button
          onClick={() => handleCopy(property)}
          className="px-4 py-2 text-sm border rounded"
        >
          Copy
        </button>
      )}

      <MapPin
        className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
        size={24}
        onClick={() => handleZoomToLocation(property)}
      />

      <div className="relative">
        <div
          className="flex -space-x-2 cursor-pointer"
          onClick={() => toggleSourcesPopup(property.id)}
        >
          {property.sources.map((src, index) => (
            <Image
              key={index}
              src={`/images/${src}.png`} 
              alt={src}
              width={24}
              height={24}
              className="border border-white rounded-full bg-gray-200"
            />
          ))}
        </div>

        {showSourcesPopup === property.id && (
          <div className="absolute left-0 mt-2 p-3 w-48 bg-white border rounded shadow z-30">
            <div className="font-semibold text-sm mb-2">Sources</div>
            {property.sources.map((src, index) => (
              <div key={index} className="flex items-center mb-2">
                <Image
                  src={`/images/${src}.png`}
                  alt={src}
                  width={20}
                  height={20}
                  className="border border-white rounded-full bg-gray-200 mr-2"
                />
                <span className="text-gray-700 text-sm">{src}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>

        ))}
      </div>

      <div className="w-full md:w-1/2 bg-gray-300">
        <Map properties={filteredProperties} selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}
