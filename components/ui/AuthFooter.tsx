"use client";
import Image from "next/image";
import React from "react";
import mainlogo from "@/public/images/homescanner_footer.png";

const AuthFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <Image
            src={mainlogo}
            alt="Logo"
            className="h-12 w-16"
          />
          <p className="text-sm text-gray-400">Your trusted property partner</p>
        </div>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">About</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">🔵</a>
          <a href="#" className="text-gray-400 hover:text-white">📷</a>
          <a href="#" className="text-gray-400 hover:text-white">🐦</a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} Property. All rights reserved.
      </div>
    </footer>
  );
};

export default AuthFooter;
