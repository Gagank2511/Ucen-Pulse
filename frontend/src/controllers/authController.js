// frontend/src/controllers/authController.js
import { register, login } from "../api/auth.js";

/**
 * Register a new user
 * @param {Object} userDetails - { name, email, password }
 * @returns {Object} user + token
 */
export async function registerUser(userDetails) {
  const data = await register(userDetails);

  if (data.token && data.user) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.user.name, email: data.user.email })
    );
    return data.user;
  } else {
    throw new Error(data.message || "Registration failed");
  }
}

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Object} user details
 */
export async function loginUser(email, password) {
  const data = await login(email, password);

  if (data.token && data.user) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.user.name, email: data.user.email })
    );
    return data.user;
  } else {
    throw new Error(data.message || "Login failed");
  }
}

/**
 * Get currently logged in user details from localStorage
 * @returns {Object|null}
 */
export function getUserDetails() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Get the stored JWT token
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem("token") || null;
}

/**
 * Logout the user
 */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}