"use client";

import React, { useState } from "react";
import GoogleMapComponent from "../map/page";
import { useCombinedContext } from "@/app/context/CombinedContext";
const properties = [
  {
    name: "DLF Camellias",
    location: "Gurgaon",
    type: "3 BHK",
    price: "4 Cr",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3BlcnR5fGVufDB8fDB8fHww",
  },
  {
    name: "Oberoi Sky Gardens",
    location: "Mumbai",
    type: "4 BHK",
    price: "6.5 Cr",
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Prestige Lakeside Habitat",
    location: "Bangalore",
    type: "3 BHK",
    price: "2.8 Cr",
    image: "https://images.unsplash.com/photo-1600585153903-55cd85ec2e3d?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Godrej Woods",
    location: "Noida",
    type: "2 BHK",
    price: "1.5 Cr",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Lodha Altamount",
    location: "Mumbai",
    type: "5 BHK",
    price: "10 Cr",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Tata Promont",
    location: "Bangalore",
    type: "4 BHK",
    price: "3.5 Cr",
    image: "https://images.unsplash.com/photo-1597045566672-45bbb846c38b?w=500&auto=format&fit=crop&q=60",
  },
];

const PropertyCard = () => {
  const {
    shortlistedProperties,
    addToShortlist,
    removeFromShortlist,
    isShortlisted
  } = useCombinedContext();
  
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Left Panel - Search Bar & Properties */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="space-y-4">
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border p-4"
            >
              <div className="flex justify-between items-center">
                <div
                  onClick={() => setSelectedProperty(selectedProperty === index ? null : index)}
                  className="cursor-pointer"
                >
                  <h2 className="text-lg font-bold">{property.name}, {property.location}</h2>
                  <p className="text-gray-600 text-sm">{property.type}, {property.price}</p>
                </div>

                {/* Toggle shortlist button */}
                <button
                  onClick={() =>
                    isShortlisted(property)
                      ? removeFromShortlist(property)
                      : addToShortlist(property)
                  }
                  className={`p-2 rounded-lg ${isShortlisted(property) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                >
                  {isShortlisted(property) ? "Remove" : "Add"}
                </button>
              </div>

              {selectedProperty === index && (
                <img className="w-full h-40 object-cover mt-2" src={property.image} alt={property.name} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-full md:w-2/3">
        <GoogleMapComponent search={true} />
      </div>
    </div>
  );
};

export default PropertyCard;
