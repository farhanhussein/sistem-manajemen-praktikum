"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LabRPLPage() {
  const [message, setMessage] = useState("Loading...");
  const [features, setFeatures] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/praktikum/lab-rpl")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message || "No message found");
        setFeatures(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error loading data");
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-gray-700 mb-6">SIMP</h1>
        <nav>
          <ul className="space-y-4">
          <li
              className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => router.back()}
            >
              <span className="mr-2">🏠</span>
              Beranda
            </li>
            <li className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📅</span>
              <Link href="#">Jadwal</Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Lab RPL</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">2025 | Kelas A-B-C-D</li>
            <li className="text-sm text-gray-600">2025 | Kelas A-B-C-D</li>
            <li className="text-sm text-gray-600">2025 | Kelas A-B-C-D</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Praktikum List</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add</button>
        </header>

        <div className="text-lg text-gray-800 mb-6">{message}</div>

        <div className="grid grid-cols-3 gap-6">
          {features.length > 0 ? (
            features.map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {feature}
                </h3>
                <Link
                  href={
                    feature === "Praktikum DKP"
                      ? "/praktikum/prak-lab-rpl/prak-dkp"
                      : feature === "Praktikum RPL"
                      ? "/praktikum/prak-lab-rpl/prak-rpl"
                      : feature === "Praktikum PPB"
                      ? "/praktikum/prak-lab-rpl/prak-ppb"
                      : "#"
                  }
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-gray-500">No features available</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default LabRPLPage;
