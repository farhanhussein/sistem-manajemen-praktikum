"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [labs, setLabs] = useState<string[]>([]);
  const [selectedLab, setSelectedLab] = useState<string>("");
  const [modules, setModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLabs() {
      try {
        const response = await fetch("http://localhost:8080/api/lab");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setLabs(data.data);
          setSelectedLab(data.data[0] || ""); // Set default jika ada data
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching labs:", err);
        setError("Failed to fetch labs");
      }
    }

    fetchLabs();
  }, []);

  useEffect(() => {
    if (!selectedLab) return; // Hindari fetch jika selectedLab kosong

    async function fetchModules() {
      setLoading(true);
      setError("");

      let apiUrl = `http://localhost:8080/api/lab/${selectedLab.replace(/\s+/g, "-").toLowerCase()}`;
      if (selectedLab === "Lab RPL") {
        apiUrl = "http://localhost:8080/api/lab/lab-rpl/1";
      } else if (selectedLab === "Lab Sister") {
        apiUrl = "http://localhost:8080/api/lab/lab-sister/4";
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setModules(data.data || []);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setError("Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, [selectedLab]);

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-500 text-black p-4 shadow-md">
        <h1 className="text-xl font-bold mb-6">SIMP</h1>
        <div className="mb-6">
          <label className="block text-sm mb-2">Select Lab</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedLab}
            onChange={(e) => setSelectedLab(e.target.value)}
          >
            {labs.map((lab, index) => (
              <option key={index} value={lab}>
                {lab}
              </option>
            ))}
          </select>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li><Link href="#" className="text-white hover:underline">Jadwal Praktikum</Link></li>
            <li><Link href="#" className="text-white hover:underline">Presensi</Link></li>
            <li><Link href="#" className="text-white hover:underline">Submission</Link></li>
            <li><Link href="#" className="text-white hover:underline">Penilaian</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{selectedLab || "Select a Lab"}</h1>
          <div className="flex items-center gap-4 mt-[-50px]">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span>Farhan Hussein</span>
        </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.length > 0 ? (
              modules.map((module: any, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {module.name || "Module Name"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Modul ID: {module.modul || "N/A"}
                  </p>
                  <Link
                    href={
                      module.name === "Praktikum Elektronika Dasar"
                        ? "/praktikum/prak-lab-sister/prak-eldas"
                        : `/praktikum/${selectedLab.replace(/\s+/g, "-").toLowerCase()}/${module.id}`
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500">No modules available</p>
            )}
            <div className="col-span-1">
              <button
                className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600"
              >
                Add Practicum
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;
