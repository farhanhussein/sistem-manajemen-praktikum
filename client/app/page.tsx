"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [message, setMessage] = useState("Loading...");
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/lab")
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Home Page</h1>
      <div className="text-lg text-gray-800 mb-6">{message}</div>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Laboratorium List
        </h2>
        {features.length > 0 ? (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-md shadow-sm text-gray-700"
              >
                <Link
                  href={
                    feature === "Lab RPL"
                      ? "/lab-rpl"
                      : feature === "Lab Mulmed"
                      ? "/lab-mulmed"
                      : feature === "Lab jaringan"
                      ? "/lab-jaringan"
                      : feature === "Lab Sister"
                      ? "/lab-sister"
                      : "#"
                  }
                >
                  {feature}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No features available</p>
        )}
      </div>
    </div>
  );
}

export default Page;
