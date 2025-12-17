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

const ACT_KEY = "ucen_activities";
const MET_KEY = "ucen_metrics";

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

// Notification Component
function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 font-bold"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activities, setActivities] = useState(() =>
    load(ACT_KEY, sampleActivities)
  );
  const [metrics, setMetrics] = useState(() => load(MET_KEY, sampleMetrics));

  // UI state
  const [selectedMetric, setSelectedMetric] = useState("steps");
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("all");
  const [rangeDays, setRangeDays] = useState(14);
  const [notification, setNotification] = useState(null);

  useEffect(() => save(ACT_KEY, activities), [activities]);
  useEffect(() => save(MET_KEY, metrics), [metrics]);

  function showNotification(message, type = "success") {
    setNotification({ message, type });
  }

  // derived data
  const activityTypes = useMemo(() => {
    const types = new Set(activities.map((a) => a.type));
    return ["all", ...Array.from(types)];
  }, [activities]);

  const filteredActivities = activities
    .filter((a) => {
      if (selectedActivityFilter === "all") return true;
      return a.type === selectedActivityFilter;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const chartData = useMemo(
    () => aggregateMetrics(metrics, selectedMetric, rangeDays),
    [metrics, selectedMetric, rangeDays]
  );

  function addActivity({ date, type, duration, notes }) {
    const next = { id: uid(), date, type, duration: Number(duration), notes };
    setActivities((s) => [...s, next]);
    showNotification("Activity added successfully! 🎉");
  }

  function addMetric({ date, metric, value }) {
    const next = { id: uid(), date, metric, value: Number(value) };
    setMetrics((s) => [...s, next]);
    showNotification("Metric saved successfully! ✓");
  }

  function deleteActivity(id) {
    setActivities((s) => s.filter((x) => x.id !== id));
    showNotification("Activity deleted");
  }

  function deleteMetric(id) {
    setMetrics((s) => s.filter((x) => x.id !== id));
    showNotification("Metric deleted");
  }

  function exportData() {
    const data = {
      activities,
      metrics,
      exportDate: new Date().toISOString(),
      version: "1.0"
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

  function clearAllData() {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setActivities([]);
      setMetrics([]);
      showNotification("All data cleared", "success");
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              UCENPulse — Personal Fitness Tracker
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Log activities, record health metrics, and visualise trends — client-side only.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
              aria-label="Export all data"
            >
              📥 Export Data
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
              aria-label="Clear all data"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Forms */}
        <section aria-labelledby="inputs" className="lg:col-span-1">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 id="inputs" className="text-lg font-medium">
                Add activity
              </h2>
              <ActivityForm onAdd={addActivity} />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-lg font-medium">Record metric</h2>
              <MetricForm onAdd={addMetric} />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-lg font-medium">Filters</h2>
              <div className="mt-3 space-y-2">
                <label className="block">
                  <span className="text-sm">Metric</span>
                  <select
                    aria-label="Select metric"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="mt-1 block w-full rounded-md border p-2"
                  >
                    <option value="steps">Steps</option>
                    <option value="water">Water (litres)</option>
                    <option value="sleep">Sleep (hours)</option>
                    <option value="calories">Calories</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm">Activity type</span>
                  <select
                    aria-label="Filter activities"
                    value={selectedActivityFilter}
                    onChange={(e) => setSelectedActivityFilter(e.target.value)}
                    className="mt-1 block w-full rounded-md border p-2"
                  >
                    {activityTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm">Range (days)</span>
                  <input
                    aria-label="Range days"
                    type="range"
                    min="7"
                    max="90"
                    value={rangeDays}
                    onChange={(e) => setRangeDays(Number(e.target.value))}
                  />
                  <div className="text-xs text-gray-500">
                    Showing last {rangeDays} days
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Middle column: Charts */}
        <section className="lg:col-span-2 space-y-6" aria-label="Dashboard and visualizations">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Steps Card */}
              <div
                className="p-4 border-2 border-blue-100 rounded-xl bg-blue-50"
                role="status"
                aria-label="steps today"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-blue-700">Steps</div>
                  <span className="text-2xl">👟</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {summary.totals.steps || 0}
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  Goal: 10,000
                </div>
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
              </div>

              {/* Water Card */}
              <div
                className="p-4 border-2 border-cyan-100 rounded-xl bg-cyan-50"
                role="status"
                aria-label="water today"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-cyan-700">Water</div>
                  <span className="text-2xl">💧</span>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {summary.totals.water || 0} L
                </div>
                <div className="mt-2 text-xs text-cyan-600">
                  Goal: 2.5 L
                </div>
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
              </div>

              {/* Sleep Card */}
              <div
                className="p-4 border-2 border-purple-100 rounded-xl bg-purple-50"
                role="status"
                aria-label="sleep today"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-purple-700">Sleep</div>
                  <span className="text-2xl">😴</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {summary.totals.sleep || 0} hrs
                </div>
                <div className="mt-2 text-xs text-purple-600">
                  Goal: 8 hrs
                </div>
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
              </div>

              {/* Calories Card */}
              <div
                className="p-4 border-2 border-orange-100 rounded-xl bg-orange-50"
                role="status"
                aria-label="calories today"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-orange-700">Calories</div>
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {summary.totals.calories || 0}
                </div>
                <div className="mt-2 text-xs text-orange-600">
                  Goal: 2,000
                </div>
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
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold mb-3">Trend Analysis</h3>
              <ChartsView data={chartData} metric={selectedMetric} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-medium">Recent activities</h2>
            <div className="mt-3">
              <ActivityList
                activities={filteredActivities}
                onDelete={deleteActivity}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-medium">Raw metrics (recent)</h2>
            <div className="mt-3">
              <MetricList
                metrics={metrics
                  .slice()
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 20)}
                onDelete={deleteMetric}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-sm text-gray-500">
        Client-side demo • Accessible & responsive • Data saved locally in your
        browser
      </footer>
    </div>
  );
}
