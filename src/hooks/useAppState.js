/**
 * useAppState Hook
 * Manages all application state including activities, metrics, filters, and UI state
 */

import { useState, useEffect, useMemo } from "react";
import { load, save, todayISO, uid, aggregateMetrics } from "../utils/storage.js";
import { STORAGE_KEYS, DATE_RANGE, DISPLAY_LIMITS, APP_INFO } from "../constants/appConstants.js";

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

export function useAppState() {
  // Main application state - load from localStorage or use sample data
  const [activities, setActivities] = useState(() =>
    load(STORAGE_KEYS.ACTIVITIES, sampleActivities)
  );
  const [metrics, setMetrics] = useState(() => load(STORAGE_KEYS.METRICS, sampleMetrics));

  // UI state for filters and notifications
  const [selectedMetric, setSelectedMetric] = useState("steps");
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("all");
  const [rangeDays, setRangeDays] = useState(DATE_RANGE.DEFAULT);
  const [notification, setNotification] = useState(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => load(STORAGE_KEYS.DARK_MODE, false));

  // Search and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [activitySortBy, setActivitySortBy] = useState("date-desc");
  const [metricSortBy, setMetricSortBy] = useState("date-desc");

  // Edit mode state (future feature)
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingMetric, setEditingMetric] = useState(null);

  // Loading state (future feature)
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save to localStorage whenever data changes
  useEffect(() => save(STORAGE_KEYS.ACTIVITIES, activities), [activities]);
  useEffect(() => save(STORAGE_KEYS.METRICS, metrics), [metrics]);

  // Save dark mode preference and apply dark class to HTML element
  useEffect(() => {
    save(STORAGE_KEYS.DARK_MODE, darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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

  // Filter, search, and sort activities
  const filteredActivities = useMemo(() => {
    return activities
      .filter((a) => {
        if (selectedActivityFilter !== "all" && a.type !== selectedActivityFilter) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            a.type.toLowerCase().includes(query) ||
            (a.notes && a.notes.toLowerCase().includes(query)) ||
            a.date.includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (activitySortBy) {
          case "date-asc":
            return a.date.localeCompare(b.date);
          case "date-desc":
            return b.date.localeCompare(a.date);
          case "duration-asc":
            return a.duration - b.duration;
          case "duration-desc":
            return b.duration - a.duration;
          default:
            return b.date.localeCompare(a.date);
        }
      });
  }, [activities, selectedActivityFilter, searchQuery, activitySortBy]);

  // Sort metrics
  const filteredMetrics = useMemo(() => {
    return metrics
      .slice()
      .sort((a, b) => {
        switch (metricSortBy) {
          case "date-asc":
            return a.date.localeCompare(b.date);
          case "date-desc":
            return b.date.localeCompare(a.date);
          case "value-asc":
            return a.value - b.value;
          case "value-desc":
            return b.value - a.value;
          default:
            return b.date.localeCompare(a.date);
        }
      });
  }, [metrics, metricSortBy]);

  // Prepare data for charts
  const chartData = useMemo(
    () => aggregateMetrics(metrics, selectedMetric, rangeDays),
    [metrics, selectedMetric, rangeDays]
  );

  // Calculate today's summary
  const summary = useMemo(() => {
    const today = todayISO(0);
    const todaysMetrics = metrics.filter((m) => m.date === today);

    const totals = {};
    todaysMetrics.forEach((m) => {
      totals[m.metric] = (totals[m.metric] || 0) + Number(m.value);
    });

    const recentActivities = activities
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);

    return { totals, recentActivities };
  }, [metrics, activities]);

  // Add a new activity
  function addActivity({ date, type, duration, notes }) {
    const next = { id: uid(), date, type, duration: Number(duration), notes };
    setActivities((s) => [...s, next]);
    showNotification("Activity added successfully! 🎉");
  }

  // Add a new metric
  function addMetric({ date, metric, value }) {
    const next = { id: uid(), date, metric, value: Number(value) };
    setMetrics((s) => [...s, next]);
    showNotification("Metric saved successfully! ✓");
  }

  // Update an existing activity
  function updateActivity({ id, date, type, duration, notes }) {
    setActivities((s) =>
      s.map((a) => (a.id === id ? { id, date, type, duration: Number(duration), notes } : a))
    );
    setEditingActivity(null);
    showNotification("Activity updated successfully! ✓");
  }

  // Update an existing metric
  function updateMetric({ id, date, metric, value }) {
    setMetrics((s) =>
      s.map((m) => (m.id === id ? { id, date, metric, value: Number(value) } : m))
    );
    setEditingMetric(null);
    showNotification("Metric updated successfully! ✓");
  }

  // Delete an activity
  function deleteActivity(id) {
    setActivities((s) => s.filter((x) => x.id !== id));
    showNotification("Activity deleted");
  }

  // Delete a metric
  function deleteMetric(id) {
    setMetrics((s) => s.filter((x) => x.id !== id));
    showNotification("Metric deleted");
  }

  // Reset date filter to default days
  function resetToToday() {
    setRangeDays(DATE_RANGE.DEFAULT);
    showNotification(`Date range reset to ${DATE_RANGE.DEFAULT} days`);
  }

  // Export all data as JSON file
  function exportData() {
    const data = {
      activities,
      metrics,
      exportDate: new Date().toISOString(),
      version: APP_INFO.VERSION
    };

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

  return {
    // State
    activities,
    metrics,
    selectedMetric,
    setSelectedMetric,
    selectedActivityFilter,
    setSelectedActivityFilter,
    rangeDays,
    setRangeDays,
    notification,
    setNotification,
    darkMode,
    setDarkMode,
    searchQuery,
    setSearchQuery,
    activitySortBy,
    setActivitySortBy,
    metricSortBy,
    setMetricSortBy,
    editingActivity,
    setEditingActivity,
    editingMetric,
    setEditingMetric,
    isLoading,

    // Computed values
    activityTypes,
    filteredActivities,
    filteredMetrics,
    chartData,
    summary,

    // Actions
    addActivity,
    addMetric,
    updateActivity,
    updateMetric,
    deleteActivity,
    deleteMetric,
    resetToToday,
    exportData,
    clearAllData,
    showNotification,
  };
}

