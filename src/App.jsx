/**
 * App Component - Main Application
 * UCENPulse Personal Fitness Tracker
 *
 * Features:
 * - Activity logging (running, cycling, gym, etc.)
 * - Health metrics tracking (steps, water, sleep, calories)
 * - Interactive data visualization with charts
 * - Dashboard with today's overview and progress tracking
 * - Data export/import functionality
 * - Client-side storage using localStorage
 */

import React from "react";
import { useAppState } from "./hooks/useAppState.js";
import Notification from "./components/Notification.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import InputFormsSection from "./components/InputFormsSection.jsx";
import DashboardSection from "./components/DashboardSection.jsx";
import ActivitySection from "./components/ActivitySection.jsx";
import MetricSection from "./components/MetricSection.jsx";

export default function App() {
  // Use custom hook to manage all application state
  const {
    notification,
    setNotification,
    darkMode,
    setDarkMode,
    searchQuery,
    setSearchQuery,
    selectedMetric,
    setSelectedMetric,
    selectedActivityFilter,
    setSelectedActivityFilter,
    activityTypes,
    activitySortBy,
    setActivitySortBy,
    metricSortBy,
    setMetricSortBy,
    rangeDays,
    setRangeDays,
    filteredActivities,
    filteredMetrics,
    chartData,
    summary,
    addActivity,
    addMetric,
    deleteActivity,
    deleteMetric,
    resetToToday,
    exportData,
    clearAllData,
  } = useAppState();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300 animate-fade-in">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onExportData={exportData}
        onClearAllData={clearAllData}
      />

      {/* Main Content */}
      <main id="main-content" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6" role="main">
        {/* Left column: Input Forms */}
        <InputFormsSection
          onAddActivity={addActivity}
          onAddMetric={addMetric}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          selectedActivityFilter={selectedActivityFilter}
          setSelectedActivityFilter={setSelectedActivityFilter}
          activityTypes={activityTypes}
          activitySortBy={activitySortBy}
          setActivitySortBy={setActivitySortBy}
          rangeDays={rangeDays}
          setRangeDays={setRangeDays}
          onResetToToday={resetToToday}
        />

        {/* Right column: Dashboard and Data */}
        <section className="lg:col-span-2 space-y-6" aria-label="Dashboard and visualizations" role="region">
          <DashboardSection
            summary={summary}
            chartData={chartData}
            selectedMetric={selectedMetric}
          />

          <ActivitySection
            activities={filteredActivities}
            searchQuery={searchQuery}
            onDelete={deleteActivity}
          />

          <MetricSection
            metrics={filteredMetrics}
            sortBy={metricSortBy}
            onSortChange={setMetricSortBy}
            onDelete={deleteMetric}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
