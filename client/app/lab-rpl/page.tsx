// lab-rpl/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function LabRPLPage() {
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/lab/lab-rpl/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Lab RPL API Response:", data);
        setFeatures(data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching Lab RPL data:", err);
        setError("Failed to fetch data");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-700 mb-6">Rekayasa Perangkat Lunak</h1>
          <nav>
            <ul className="space-y-4">
              <li className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/praktikum")}>Praktikum</li>
              <li className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/jadwal-praktikum")}>Jadwal Praktikum</li>
              <li className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/presensi")}>Presensi</li>
              <li className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/submission")}>Submission</li>
              <li className="text-gray-600 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/penilaian")}>Penilaian</li>
            </ul>
          </nav>
        </div>
        <div>
          <p className="text-gray-600 cursor-pointer hover:text-blue-600">Account Setting</p>
          <p className="text-gray-600 cursor-pointer hover:text-blue-600">Log out</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">PRAKTIKUM</h1>
          <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
        </header>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {features.length > 0 ? (
              features.map((feature, index) => (
                <div key={index} className="bg-blue-200 shadow-md rounded-lg p-6 flex flex-col justify-between h-40">
                  <h3 className="text-lg font-semibold text-gray-700">{feature}</h3>
                  <p className="text-sm text-gray-600">Senin, Selasa, Jumat</p>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500">No features available</p>
            )}

            <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center border-2 border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => alert("Add Practicum Clicked")}> 
              <p className="text-blue-600 text-lg font-bold">+ Add Practicum</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default LabRPLPage;