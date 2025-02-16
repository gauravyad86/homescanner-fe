"use client"; 
import React, { useState } from "react";
import { useCombinedContext } from "@/app/context/CombinedContext";
import GoogleMapComponent from "../map/page";
const ShortlistPage = () => {
  const { shortlistedProperties, removeFromShortlist } = useCombinedContext();
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleImage = (index) => {
    setSelectedPropertyIndex(selectedPropertyIndex === index ? null : index);
  };

  // Filter properties based on search query
  const filteredProperties = shortlistedProperties.filter((property) =>
    `${property.name} ${property.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Left Panel - Shortlisted Properties */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Shortlisted Properties</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden border p-4 cursor-pointer"
                onClick={() => toggleImage(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold">
                      {property.name}, {property.location}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {property.type}, {property.price}
                    </p>
                  </div>
                  {/* Remove from shortlist button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromShortlist(property);
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>

                {/* Show image only if the property is clicked */}
                {selectedPropertyIndex === index && (
                  <img
                    className="w-full h-40 object-cover mt-2"
                    src={property.image || "https://via.placeholder.com/150"}
                    alt={property.name}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No matching properties found.</p>
          )}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-full md:w-2/3">
        <GoogleMapComponent search={true} />
      </div>
    </div>
  );
};

export default ShortlistPage;
