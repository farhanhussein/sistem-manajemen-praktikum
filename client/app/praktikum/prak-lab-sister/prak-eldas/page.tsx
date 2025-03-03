"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Modul_1 from "./modul/modul1";
import Modul_2 from "./modul/modul2";
import Modul_3 from "./modul/modul3";
import Modul_4 from "./modul/modul4";
import Modul_5 from "./modul/modul5";
import Modul_6 from "./modul/modul6";
import Modul_7 from "./modul/modul7";
import Quiz_1 from "./quiz/quiz1";
import Quiz_2 from "./quiz/quiz2";
import Quiz_3 from "./quiz/quiz3";
import Quiz_4 from "./quiz/quiz4";
import Quiz_5 from "./quiz/quiz5";
import Quiz_6 from "./quiz/quiz6";
import Quiz_7 from "./quiz/quiz7";

function PrakEldasPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [submodules, setSubmodules] = useState<{ [key: number]: any[] }>({});
  const router = useRouter(); 

  useEffect(() => {
    fetch("http://localhost:8080/api/praktikum/modul/9")
      .then((response) => response.json())
      .then((data) => setModules(data.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleDropdown = (moduleId: number) => {
    setOpenDropdown(openDropdown === moduleId ? null : moduleId);

    if (!submodules[moduleId]) {
      fetch(`http://localhost:8080/api/praktikum/submodul/prak-eldas/${moduleId}`)
        .then((response) => response.json())
        .then((data) => setSubmodules((prev) => ({ ...prev, [moduleId]: data.data || [] })))
        .catch((error) => console.error("Error fetching submodules:", error));
    }
  };

  const currentVideoUrl = selectedSubmodule?.video_url || selectedModule?.video_url || null;

  // ✅ Fungsi memilih komponen berdasarkan id_submodul
  const renderSubmoduleComponent = (id_submodul: number) => {
    switch (id_submodul) {
      case 2:
        return <Modul_1 />;
      case 3:
        return <Quiz_1 submodulId={selectedSubmodule?.id_submodul} userId={1} />;
      case 5:
        return <Modul_2 />;
      case 6:
        return <Quiz_2 submodulId={selectedSubmodule?.id_submodul} userId={2} />;
      case 8:
        return <Modul_3 />;
      case 9:
        return <Quiz_3 submodulId={selectedSubmodule?.id_submodul} userId={3} />;
      case 11:
        return <Modul_4 />;
      case 12:
        return <Quiz_4 submodulId={selectedSubmodule?.id_submodul} userId={4} />;
      case 14:
        return <Modul_5 />;
      case 15:
        return <Quiz_5 submodulId={selectedSubmodule?.id_submodul} userId={5} />;
      case 17:
        return <Modul_6 />;
      case 18:
        return <Quiz_6 submodulId={selectedSubmodule?.id_submodul} userId={6} />;
      case 20:
        return <Modul_7 />;
      case 21:
        return <Quiz_7 submodulId={selectedSubmodule?.id_submodul} userId={7} />;
      default:
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <button onClick={() => router.back()} className="text-white text-2xl hover:opacity-80">
          <FaChevronLeft />
        </button>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <span className="text-lg">Admin 1234567</span>
        </div>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          <h3 className="p-2 font-semibold">Informasi</h3>
          <ul className="space-y-2">
            {modules.map((module) => (
              <li key={module.id_modul}>
                <div
                  className="p-2 rounded-lg cursor-pointer flex justify-between items-center hover:bg-gray-200"
                  onClick={() => {
                    // setSelectedModule(module);
                    // setSelectedSubmodule(null);
                  }}
                >
                  <h3 className="font-semibold">{module.judul_modul}</h3>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleDropdown(module.id_modul);
                    }}
                  >
                    {openDropdown === module.id_modul ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {openDropdown === module.id_modul && submodules[module.id_modul] && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {submodules[module.id_modul].length > 0 ? (
                      submodules[module.id_modul].map((submodule) => (
                        <li 
                          key={submodule.id_submodul} 
                          className="p-1 text-gray-700 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                          onClick={() => setSelectedSubmodule(submodule)}
                        >
                          {submodule.judul_submodul}
                        </li>
                      ))
                    ) : (
                      <li className="p-1 text-gray-500">No submodules available</li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="w-3/4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {selectedSubmodule ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">{selectedSubmodule.judul_submodul}</h2>
                {currentVideoUrl && (
                  <video key={currentVideoUrl} controls className="w-full h-64 rounded-lg mb-4">
                    <source src={currentVideoUrl} type="video/mp4" />
                  </video>
                )}
                {/* ✅ Render komponen berdasarkan id_submodul */}
                {renderSubmoduleComponent(selectedSubmodule.id_submodul)}
              </>
            ) : selectedModule ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">{selectedModule.judul_modul}</h2>
                {currentVideoUrl && (
                  <video key={currentVideoUrl} controls className="w-full h-64 rounded-lg mb-4">
                    <source src={currentVideoUrl} type="video/mp4" />
                  </video>
                )}
              </>
            ) : (
              <p className="text-gray-500">Praktikum Eldas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrakEldasPage;
