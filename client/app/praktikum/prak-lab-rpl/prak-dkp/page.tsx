"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter dari Next.js

function PrakDKPPage() {
  const router = useRouter(); // Inisialisasi router
  const [activeModule, setActiveModule] = useState<string>("Modul 1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(["Course Introduction", "Aplikasi Hambatan Menggunakan Trainer Board"])
  );

  const modules = [
    {
      title: "Modul 1",
      topics: ["Hambatan, Tegangan, dan Arus Listrik"],
    },
    {
      title: "Modul 2",
      topics: ["Rangkaian Pembagi Arus", "Transformasi Delta Star"],
    },
    {
      title: "Modul 3",
      topics: ["Daya, Kapasitor, dan Induktor"],
    },
    {
      title: "Modul 4",
      topics: ["Topik Lanjutan 1"],
    },
    {
      title: "Modul 5",
      topics: ["Topik Lanjutan 2"],
    },
    {
      title: "Modul 6",
      topics: ["Topik Lanjutan 3"],
    },
  ];

  const videos = [
    {
      title: "Course Introduction",
      completed: completedModules.has("Course Introduction"),
    },
    {
      title: "Aplikasi Hambatan Menggunakan Trainer Board",
      completed: completedModules.has("Aplikasi Hambatan Menggunakan Trainer Board"),
    },
  ];

  const handleModuleClick = (moduleTitle: string) => {
    setActiveModule(moduleTitle);
  };

  const handleVideoCompletion = (videoTitle: string) => {
    const updatedCompletedModules = new Set(completedModules);
    if (updatedCompletedModules.has(videoTitle)) {
      updatedCompletedModules.delete(videoTitle);
    } else {
      updatedCompletedModules.add(videoTitle);
    }
    setCompletedModules(updatedCompletedModules);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigasi */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Modul Pembelajaran</h2>
        <ul className="space-y-2">
          {modules.map((module, index) => (
            <li key={index}>
              <button
                onClick={() => handleModuleClick(module.title)}
                className={`w-full text-left p-2 rounded-lg ${
                  activeModule === module.title
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {module.title}
              </button>
              {activeModule === module.title && (
                <ul className="mt-2 pl-4 space-y-1">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="text-gray-700">
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-8">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()} // Fungsi untuk kembali ke halaman sebelumnya
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">{activeModule}</h1>

        {/* Area Video */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Video Pembelajaran</h2>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <input
                  type="checkbox"
                  checked={video.completed}
                  onChange={() => handleVideoCompletion(video.title)}
                  className="w-5 h-5 text-green-500 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="ml-4 text-gray-800">{video.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Materi */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Ringkasan Materi</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>
                Pengenalan terhadap alat hardware dan trainer board
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>
                Aplikasi hambatan menggunakan trainer board
              </li>
            </ul>
          </div>
        </div>

        {/* Area Gambar atau Media */}
        <div className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-48">
            <span className="text-gray-500">📷 Unggah Gambar atau Media</span>
          </div>
        </div>

        {/* Isi Materi */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Isi Materi</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* Fitur Download dan Notes */}
        <div className="flex space-x-4">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Download</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Unduh Materi
            </button>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Notes</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Tulis catatan Anda di sini..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrakDKPPage;


/*
"use client";

import React, { useEffect, useState } from "react";

function PrakDKPPage() {
  const [message, setMessage] = useState("Loading...");
  const [modules, setModules] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/praktikum/prak-dkp")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message || "No message found");
        setModules(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error loading data");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Praktikum DKP</h1>
      <div className="text-lg text-gray-800 mb-6">{message}</div>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          List of Modules
        </h2>
        {modules.length > 0 ? (
          <ul className="space-y-2">
            {modules.map((module, index) => (
              <li
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-md shadow-sm text-gray-700"
              >
                {module}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No modules available</p>
        )}
      </div>
    </div>
  );
}

export default PrakDKPPage;
*/