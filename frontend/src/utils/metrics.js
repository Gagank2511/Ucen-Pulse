/**
 * Utility functions for data storage and date handling
 * This file contains helper functions for localStorage operations and data processing
 */

// Generate a unique ID for activities and metrics
function uid() {
  return Math.floor(Math.random() * 1e9).toString(36);
}

// Get today's date in ISO format (YYYY-MM-DD) with optional offset
// offsetDays: number of days to add/subtract from today
function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

// Load data from localStorage with fallback if not found
// key: localStorage key name
// fallback: default value if key doesn't exist
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("failed to load", key, e);
    return fallback;
  }
}

// Save data to localStorage
// key: localStorage key name
// data: data to save (will be JSON stringified)
function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("failed to save", key, e);
  }
}

// Aggregate metrics by date for chart visualization
// Creates an array of objects with dates and metric values for the specified range
// metrics: array of metric objects
// metricName: which metric to aggregate (steps, water, sleep, calories)
// rangeDays: number of days to include (default 30)
function aggregateMetrics(metrics, metricName, rangeDays = 30) {
  const now = new Date();
  const out = {};

  // Create empty entries for each day in the range
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    out[iso] = { date: iso };
  }

  // Add metric values to their corresponding dates
  metrics.forEach((m) => {
    if (metricName && m.metric !== metricName) return; // Skip if not the selected metric
    if (!out[m.date]) return; // Ignore dates outside the range
    out[m.date][m.metric] = (out[m.date][m.metric] || 0) + Number(m.value || 0);
  });

  return Object.values(out);
}

export { uid, todayISO, load, save, aggregateMetrics };
