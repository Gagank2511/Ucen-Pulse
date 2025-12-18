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

import React, { useState, useEffect, useMemo } from "react";
import {
  load,
  save,
  todayISO,
  uid,
  aggregateMetrics,
} from "./utils/storage.js";
import ActivityForm from "./components/ActivityForm.jsx";
import MetricForm from "./components/MetricForm.jsx";
import ActivityList from "./components/ActivityList.jsx";
import MetricList from "./components/MetricList.jsx";
import ChartsView from "./components/ChartsView.jsx";

// localStorage keys for data persistence
const ACT_KEY = "ucen_activities";
const MET_KEY = "ucen_metrics";

// Sample data for first-time users
const sampleActivities = [
  {
    id: 1,
    date: todayISO(0),
    type: "Running",
    duration: 30,
    notes: "Morning park run",
  },
  { id: 2, date: todayISO(-1), type: "Gym", duration: 60, notes: "Leg day" },
];

const sampleMetrics = [
  { id: 1, date: todayISO(0), metric: "steps", value: 8200 },
  { id: 2, date: todayISO(0), metric: "water", value: 2 },
  { id: 3, date: todayISO(0), metric: "sleep", value: 7 },
  { id: 4, date: todayISO(-1), metric: "steps", value: 10234 },
  { id: 5, date: todayISO(-1), metric: "water", value: 1.5 },
];

/**
 * Notification Component
 * Displays success/error messages that auto-dismiss after 3 seconds
 */
function Notification({ message, type, onClose }) {
  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <aside
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}
      role="alert"
      aria-live="polite"
    >
      <p className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 font-bold"
          aria-label="Close notification"
        >
          ×
        </button>
      </p>
    </aside>
  );
}

export default function App() {
  // Main application state - load from localStorage or use sample data
  const [activities, setActivities] = useState(() =>
    load(ACT_KEY, sampleActivities)
  );
  const [metrics, setMetrics] = useState(() => load(MET_KEY, sampleMetrics));

  // UI state for filters and notifications
  const [selectedMetric, setSelectedMetric] = useState("steps"); // Which metric to display in charts
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("all"); // Filter activities by type
  const [rangeDays, setRangeDays] = useState(14); // Date range for charts (7-90 days)
  const [notification, setNotification] = useState(null); // Current notification message

  // NEW: Dark mode state - toggles between light and dark theme
  const [darkMode, setDarkMode] = useState(() => load("ucen_darkMode", false));

  // NEW: Search and sort state - allows users to search and sort activities/metrics
  const [searchQuery, setSearchQuery] = useState(""); // Search text for filtering activities
  const [activitySortBy, setActivitySortBy] = useState("date-desc"); // How to sort activities (newest first by default)
  const [metricSortBy, setMetricSortBy] = useState("date-desc"); // How to sort metrics (newest first by default)

  // NEW: Edit mode state - tracks which item is being edited (future feature)
  const [editingActivity, setEditingActivity] = useState(null); // Currently editing activity (null = not editing)
  const [editingMetric, setEditingMetric] = useState(null); // Currently editing metric (null = not editing)

  // NEW: Loading state - shows loading animations during operations (future feature)
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save to localStorage whenever data changes
  useEffect(() => save(ACT_KEY, activities), [activities]);
  useEffect(() => save(MET_KEY, metrics), [metrics]);

  // NEW: Save dark mode preference and apply dark class to HTML element
  useEffect(() => {
    save("ucen_darkMode", darkMode); // Save preference to localStorage
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Add 'dark' class to enable dark mode styles
    } else {
      document.documentElement.classList.remove("dark"); // Remove 'dark' class for light mode
    }
  }, [darkMode]);

  // Show notification message to user
  function showNotification(message, type = "success") {
    setNotification({ message, type });
  }

  // Get unique activity types for filter dropdown
  const activityTypes = useMemo(() => {
    const types = new Set(activities.map((a) => a.type));
    return ["all", ...Array.from(types)];
  }, [activities]);

  // NEW: Filter, search, and sort activities based on type, search query, and sort option
  const filteredActivities = useMemo(() => {
    return activities
      .filter((a) => {
        // Step 1: Filter by activity type (e.g., Running, Cycling)
        if (selectedActivityFilter !== "all" && a.type !== selectedActivityFilter) return false;

        // Step 2: Filter by search query (searches in type, notes, and date)
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            a.type.toLowerCase().includes(query) || // Search in activity type
            (a.notes && a.notes.toLowerCase().includes(query)) || // Search in notes
            a.date.includes(query) // Search in date
          );
        }
        return true;
      })
      .sort((a, b) => {
        // Step 3: Sort activities based on user's selected option
        switch (activitySortBy) {
          case "date-asc":
            return a.date.localeCompare(b.date); // Oldest first
          case "date-desc":
            return b.date.localeCompare(a.date); // Newest first
          case "duration-asc":
            return a.duration - b.duration; // Shortest first
          case "duration-desc":
            return b.duration - a.duration; // Longest first
          default:
            return b.date.localeCompare(a.date); // Default: newest first
        }
      });
  }, [activities, selectedActivityFilter, searchQuery, activitySortBy]);

  // NEW: Sort metrics based on user's selected option
  const filteredMetrics = useMemo(() => {
    return metrics
      .slice() // Create a copy to avoid mutating original array
      .sort((a, b) => {
        // Sort metrics by date or value
        switch (metricSortBy) {
          case "date-asc":
            return a.date.localeCompare(b.date); // Oldest first
          case "date-desc":
            return b.date.localeCompare(a.date); // Newest first
          case "value-asc":
            return a.value - b.value; // Lowest value first
          case "value-desc":
            return b.value - a.value; // Highest value first
          default:
            return b.date.localeCompare(a.date); // Default: newest first
        }
      });
  }, [metrics, metricSortBy]);

  // Prepare data for charts - aggregate metrics by date
  const chartData = useMemo(
    () => aggregateMetrics(metrics, selectedMetric, rangeDays),
    [metrics, selectedMetric, rangeDays]
  );

  // Add a new activity to the list
  function addActivity({ date, type, duration, notes }) {
    const next = { id: uid(), date, type, duration: Number(duration), notes };
    setActivities((s) => [...s, next]); // Add to existing activities
    showNotification("Activity added successfully! 🎉");
  }

  // Add a new metric to the list
  function addMetric({ date, metric, value }) {
    const next = { id: uid(), date, metric, value: Number(value) };
    setMetrics((s) => [...s, next]); // Add to existing metrics
    showNotification("Metric saved successfully! ✓");
  }

  // NEW: Update an existing activity (future feature for editing)
  function updateActivity({ id, date, type, duration, notes }) {
    setActivities((s) =>
      s.map((a) => (a.id === id ? { id, date, type, duration: Number(duration), notes } : a)) // Find and update the activity
    );
    setEditingActivity(null); // Exit edit mode
    showNotification("Activity updated successfully! ✓");
  }

  // NEW: Update an existing metric (future feature for editing)
  function updateMetric({ id, date, metric, value }) {
    setMetrics((s) =>
      s.map((m) => (m.id === id ? { id, date, metric, value: Number(value) } : m)) // Find and update the metric
    );
    setEditingMetric(null); // Exit edit mode
    showNotification("Metric updated successfully! ✓");
  }

  // Delete an activity by ID
  function deleteActivity(id) {
    setActivities((s) => s.filter((x) => x.id !== id)); // Remove activity with matching ID
    showNotification("Activity deleted");
  }

  // Delete a metric by ID
  function deleteMetric(id) {
    setMetrics((s) => s.filter((x) => x.id !== id)); // Remove metric with matching ID
    showNotification("Metric deleted");
  }

  // NEW: Reset date filter to 14 days (quick "Today" button)
  function resetToToday() {
    setRangeDays(14); // Reset to default 14-day range
    showNotification("Date range reset to 14 days");
  }

  // Export all data as JSON file
  function exportData() {
    const data = {
      activities,
      metrics,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };

    // Create downloadable JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ucenpulse-data-${todayISO(0)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Data exported successfully! 📥");
  }

  // Clear all data with confirmation
  function clearAllData() {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setActivities([]);
      setMetrics([]);
      showNotification("All data cleared", "success");
    }
  }

  // Calculate today's summary data for dashboard
  const summary = useMemo(() => {
    const today = todayISO(0);
    const todaysMetrics = metrics.filter((m) => m.date === today); // Get only today's metrics

    // Sum up all metrics for today
    const totals = {};
    todaysMetrics.forEach((m) => {
      totals[m.metric] = (totals[m.metric] || 0) + Number(m.value);
    });

    // Get 5 most recent activities
    const recentActivities = activities
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date)) // Sort by date (newest first)
      .slice(0, 5); // Take first 5

    return { totals, recentActivities };
  }, [metrics, activities]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300 animate-fade-in">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="max-w-6xl mx-auto mb-6 animate-scale-in" role="banner">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <hgroup>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
              UCENPulse — Personal Fitness Tracker
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors">
              Log activities, record health metrics, and visualise trends — client-side only.
            </p>
          </hgroup>
          <nav className="flex gap-2 flex-wrap">
            {/* NEW: Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={exportData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
              aria-label="Export all data"
            >
              📥 Export Data
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm font-medium animate-scale-in"
              aria-label="Clear all data"
            >
              🗑️ Clear All
            </button>
          </nav>
        </section>
      </header>

      <main id="main-content" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6" role="main">
        {/* Left column: Forms */}
        <section aria-labelledby="inputs" className="lg:col-span-1" role="region">
          <article className="space-y-4">
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
              <h2 id="inputs" className="text-lg font-medium dark:text-white transition-colors">
                Add activity
              </h2>
              <ActivityForm onAdd={addActivity} />
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
              <h2 className="text-lg font-medium dark:text-white transition-colors">Record metric</h2>
              <MetricForm onAdd={addMetric} />
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
              <h2 className="text-lg font-medium dark:text-white transition-colors">Filters & Search</h2>
              <form className="mt-3 space-y-3">
                {/* NEW: Search bar */}
                <label className="block">
                  <span className="text-sm dark:text-gray-300">🔍 Search activities</span>
                  <input
                    type="text"
                    placeholder="Search by type, notes, or date..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-label="Search activities"
                  />
                </label>

                <label className="block">
                  <span className="text-sm dark:text-gray-300">Metric</span>
                  <select
                    aria-label="Select metric"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 transition-colors"
                  >
                    <option value="steps">Steps</option>
                    <option value="water">Water (litres)</option>
                    <option value="sleep">Sleep (hours)</option>
                    <option value="calories">Calories</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm dark:text-gray-300">Activity type</span>
                  <select
                    aria-label="Filter activities"
                    value={selectedActivityFilter}
                    onChange={(e) => setSelectedActivityFilter(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 transition-colors"
                  >
                    {activityTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                {/* NEW: Activity sort options */}
                <label className="block">
                  <span className="text-sm dark:text-gray-300">Sort activities by</span>
                  <select
                    value={activitySortBy}
                    onChange={(e) => setActivitySortBy(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 transition-colors"
                    aria-label="Sort activities"
                  >
                    <option value="date-desc">Date (newest first)</option>
                    <option value="date-asc">Date (oldest first)</option>
                    <option value="duration-desc">Duration (longest first)</option>
                    <option value="duration-asc">Duration (shortest first)</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm dark:text-gray-300">Range (days)</span>
                  <input
                    aria-label="Range days"
                    type="range"
                    min="7"
                    max="90"
                    value={rangeDays}
                    onChange={(e) => setRangeDays(Number(e.target.value))}
                    className="mt-1 block w-full"
                  />
                  <output className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
                    Showing last {rangeDays} days
                  </output>
                </label>

                {/* NEW: Today button */}
                <button
                  type="button"
                  onClick={resetToToday}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
                  aria-label="Reset to today"
                >
                  📅 Reset to 14 Days
                </button>
              </form>
            </section>
          </article>
        </section>

        {/* Middle column: Charts */}
        <section className="lg:col-span-2 space-y-6" aria-label="Dashboard and visualizations" role="region">
          <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm transition-colors animate-fade-in">
            <h2 className="text-lg font-semibold mb-4 dark:text-white transition-colors">Today's Overview</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Steps Card */}
              <article
                className="p-4 border-2 border-blue-100 rounded-xl bg-blue-50"
                role="status"
                aria-label="steps today"
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-700">Steps</h3>
                  <span className="text-2xl" aria-hidden="true">👟</span>
                </header>
                <p className="text-2xl font-bold text-blue-900">
                  {summary.totals.steps || 0}
                </p>
                <p className="mt-2 text-xs text-blue-600">
                  Goal: 10,000
                </p>
                <div className="mt-1 w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((summary.totals.steps || 0) / 10000 * 100, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={summary.totals.steps || 0}
                    aria-valuemin="0"
                    aria-valuemax="10000"
                  ></div>
                </div>
              </article>

              {/* Water Card */}
              <article
                className="p-4 border-2 border-cyan-100 rounded-xl bg-cyan-50"
                role="status"
                aria-label="water today"
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-cyan-700">Water</h3>
                  <span className="text-2xl" aria-hidden="true">💧</span>
                </header>
                <p className="text-2xl font-bold text-cyan-900">
                  {summary.totals.water || 0} L
                </p>
                <p className="mt-2 text-xs text-cyan-600">
                  Goal: 2.5 L
                </p>
                <div className="mt-1 w-full bg-cyan-200 rounded-full h-2">
                  <div
                    className="bg-cyan-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((summary.totals.water || 0) / 2.5 * 100, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={summary.totals.water || 0}
                    aria-valuemin="0"
                    aria-valuemax="2.5"
                  ></div>
                </div>
              </article>

              {/* Sleep Card */}
              <article
                className="p-4 border-2 border-purple-100 rounded-xl bg-purple-50"
                role="status"
                aria-label="sleep today"
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-purple-700">Sleep</h3>
                  <span className="text-2xl" aria-hidden="true">😴</span>
                </header>
                <p className="text-2xl font-bold text-purple-900">
                  {summary.totals.sleep || 0} hrs
                </p>
                <p className="mt-2 text-xs text-purple-600">
                  Goal: 8 hrs
                </p>
                <div className="mt-1 w-full bg-purple-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((summary.totals.sleep || 0) / 8 * 100, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={summary.totals.sleep || 0}
                    aria-valuemin="0"
                    aria-valuemax="8"
                  ></div>
                </div>
              </article>

              {/* Calories Card */}
              <article
                className="p-4 border-2 border-orange-100 rounded-xl bg-orange-50"
                role="status"
                aria-label="calories today"
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-orange-700">Calories</h3>
                  <span className="text-2xl" aria-hidden="true">🔥</span>
                </header>
                <p className="text-2xl font-bold text-orange-900">
                  {summary.totals.calories || 0}
                </p>
                <p className="mt-2 text-xs text-orange-600">
                  Goal: 2,000
                </p>
                <div className="mt-1 w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((summary.totals.calories || 0) / 2000 * 100, 100)}%` }}
                    role="progressbar"
                    aria-valuenow={summary.totals.calories || 0}
                    aria-valuemin="0"
                    aria-valuemax="2000"
                  ></div>
                </div>
              </article>
            </section>

            <section className="mt-6">
              <h3 className="text-md font-semibold mb-3 dark:text-white transition-colors">Trend Analysis</h3>
              <ChartsView data={chartData} metric={selectedMetric} />
            </section>
          </article>

          <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
            <header className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium dark:text-white transition-colors">
                Recent activities ({filteredActivities.length})
              </h2>
              {searchQuery && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Filtered by: "{searchQuery}"
                </span>
              )}
            </header>
            <section className="mt-3">
              <ActivityList
                activities={filteredActivities.slice(0, 20)}
                onDelete={deleteActivity}
              />
            </section>
          </article>

          <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
            <header className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium dark:text-white transition-colors">Raw metrics (recent)</h2>
              {/* NEW: Metric sort options */}
              <select
                value={metricSortBy}
                onChange={(e) => setMetricSortBy(e.target.value)}
                className="text-xs rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-1 transition-colors"
                aria-label="Sort metrics"
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="value-desc">Highest value</option>
                <option value="value-asc">Lowest value</option>
              </select>
            </header>
            <section className="mt-3">
              <MetricList
                metrics={filteredMetrics.slice(0, 20)}
                onDelete={deleteMetric}
              />
            </section>
          </article>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors" role="contentinfo">
        <p className="text-center">
          Client-side demo • Accessible & responsive • Data saved locally in your browser
        </p>
        <p className="mt-2 text-xs text-center">
          <span className="font-medium">Keyboard shortcuts:</span> Tab to navigate, Enter to submit forms, Space to toggle buttons
        </p>
      </footer>
    </div>
  );
}
