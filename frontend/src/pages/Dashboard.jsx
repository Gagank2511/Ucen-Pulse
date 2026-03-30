// frontend/pages/Dashboard.jsx

import React, { useState, useMemo } from "react";
import Header from "../components/Header.jsx";
import ActivitySection from "./ActivitySection.jsx";
import MetricSection from "./MetricSection.jsx";
import OverviewSection from "./OverviewSection.jsx";
import useDashboardData from "../hooks/useDashboardData.js";
import { aggregateMetrics } from "../utils/metrics.js";
import { getFilteredActivities } from "../controllers/activityController.js";

export default function Dashboard({ onLogout }) {
  const {
    activities,
    metrics,
    loading,
    handleAddActivity,
    handleDeleteActivity,
    handleAddMetric,
    handleDeleteMetric,
  } = useDashboardData();

  const [selectedMetric, setSelectedMetric] = useState("steps");
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("all");
  const [rangeDays, setRangeDays] = useState(14);

  const filteredActivities = useMemo(
    () => getFilteredActivities(activities, selectedActivityFilter),
    [activities, selectedActivityFilter]
  );

  const chartData = useMemo(
    () => aggregateMetrics(metrics, selectedMetric, rangeDays),
    [metrics, selectedMetric, rangeDays]
  );

  const summary = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todaysMetrics = metrics.filter((m) => m.date.startsWith(today));

    const totals = {};
    todaysMetrics.forEach((m) => {
      totals[m.metric] = (totals[m.metric] || 0) + Number(m.value);
    });

    return totals;
  }, [metrics]);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onLogout={onLogout} />

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1">
          <ActivitySection
            activities={filteredActivities}
            onAdd={handleAddActivity}
            onDelete={handleDeleteActivity}
          />
        </section>

        <section className="lg:col-span-2 space-y-6">
          <OverviewSection
            summary={summary}
            chartData={chartData}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            rangeDays={rangeDays}
            setRangeDays={setRangeDays}
          />

          <MetricSection
            metrics={metrics}
            onAdd={handleAddMetric}
            onDelete={handleDeleteMetric}
          />
        </section>
      </main>
    </div>
  );
}