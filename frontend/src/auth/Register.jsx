import React, { useState } from "react";
import { registerUser } from "../controllers/authController";
import { useNavigate } from "react-router-dom";

export default function Register({ onSwitchToLogin }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser(userDetails);
      setSuccess("Account created! You can now login.");
    } catch {
      setError("Registration failed. Try another email.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Success */}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="John Doe"
              onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="you@example.com"
              onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="••••••••"
              onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
            />
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Create Account
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-blue-600 hover:underline ml-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}