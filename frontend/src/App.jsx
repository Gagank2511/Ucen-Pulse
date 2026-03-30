import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import { getUserDetails, logout } from "./controllers/authController.js";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";

export default function App() {
  const [user, setUser] = useState(getUserDetails());

  const isAuth = !!user;

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <div>
                <Dashboard user={user} onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/" replace /> : <Login onAuthSuccess={handleAuthSuccess} />
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? <Navigate to="/" replace /> : <Register onAuthSuccess={handleAuthSuccess} />
          }
        />
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}