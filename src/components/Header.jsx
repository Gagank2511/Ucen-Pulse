/**
 * Header Component
 * Main application header with title, description, and action buttons
 */

import React from "react";
import { APP_INFO } from "../constants/appConstants.js";

export default function Header({ darkMode, onToggleDarkMode, onExportData, onClearAllData }) {
  return (
    <header className="max-w-6xl mx-auto mb-6 animate-scale-in" role="banner">
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <hgroup>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
            {APP_INFO.NAME} — {APP_INFO.SUBTITLE}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">
            {APP_INFO.DESCRIPTION}
          </p>
        </hgroup>
        <nav className="flex gap-2 flex-wrap">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={onExportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
            aria-label="Export all data"
          >
            📥 Export Data
          </button>
          <button
            onClick={onClearAllData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
            aria-label="Clear all data"
          >
            🗑️ Clear All
          </button>
        </nav>
      </section>
    </header>
  );
}

