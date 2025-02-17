"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function PrakEldasPage() {
  const [message, setMessage] = useState("Loading...");
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/praktikum/prak-eldas/1")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message || "No message found");
        setModules(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error loading data");
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Praktikum Eldas</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-lg bg-white text-black"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>
      
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          <ul className="space-y-2">
            {modules.map((module, index) => (
              <li key={index} className="p-2 rounded-lg hover:bg-gray-200">
                <h3 className="font-semibold">{module.judul_modul}</h3>
                <p className="text-sm text-gray-500">{module.deskripsi}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="w-3/4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{message}</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrakEldasPage;
