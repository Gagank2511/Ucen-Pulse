import React, { useEffect, useState } from "react";
import { getUserDetails } from "../controllers/authController.js";

export default function Header({ onLogout }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = getUserDetails();
    setUser(storedUser);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">UCENPulse</div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:block font-medium text-gray-700">{user?.name}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}