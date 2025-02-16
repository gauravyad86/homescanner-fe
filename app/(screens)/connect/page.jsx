"use client"
import React, { useState } from "react";
import { Play, Send } from "lucide-react";
const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "User", text: "Hello! How are you? We have discussed the price and can give you a 10% discount", audio: false, date: "29.01.2025", time: "" },
    { id: 2, sender: "Bot", text: "", audio: true, date: "29.01.2025", time: "" },
    { id: 3, sender: "User", text: "Hello How are you", audio: false, date: "02.02.2025", time: "03:30 PM" },
    { id: 4, sender: "Bot", text: "", audio: true, date: "02.02.2025", time: "03:30 PM" },
  ]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const property = { name: "DLF Camellias", location: "Gurgaon", type: "3 BHK", price: "4 Cr" };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "User", text: input, audio: false, date: "Today", time: "Now" }]);
      setInput("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg mt-4">
      <div className="flex items-center justify-between bg-gray-200 p-2 rounded-t-lg">
        <h2 className="text-lg font-bold">{property.name}, {property.location}</h2>
        <span className="text-sm">{property.type}, {property.price}</span>
      </div>
      <button
        className="w-full bg-gray-100 p-2 text-left flex justify-between items-center"
        onClick={() => setShowChat(!showChat)}
      >
        Insights
        <span className={`${showChat ? "rotate-180" : ""} transition-transform`}>▼</span>
      </button>

      {showChat && (
        <div className="mt-2 bg-white p-2 border rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="text-xs font-semibold text-gray-500">{msg.date}</div>
              <div className="flex items-center gap-2">
                {msg.audio ? (
                  <Play />
                ) : (
                  <span>{msg.text}</span>
                )}
                {msg.time && <span className="text-xs text-gray-400">{msg.time}</span>}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <Send />
          </div>
          <div className="mt-4 flex justify-between">
            <button className="p-2 bg-red-500 text-white rounded-lg">Close</button>
            <button className="p-2 bg-green-500 text-white rounded-lg">Connect</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
