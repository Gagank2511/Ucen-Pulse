// frontend/hooks/useDashboardData.js

import { useState, useEffect } from "react";
import * as activityCtrl from "../controllers/activityController.js";
import * as metricCtrl from "../controllers/metricController.js";

export default function useDashboardData() {
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [activitiesData, metricsData] = await Promise.all([
          activityCtrl.fetchActivities(),
          metricCtrl.fetchMetrics(),
        ]);

        setActivities(activitiesData);
        setMetrics(metricsData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Activity handlers
  async function handleAddActivity(activity) {
    const newActivity = await activityCtrl.addActivity(activity);
    setActivities((prev) => [newActivity, ...prev]);
  }

  async function handleDeleteActivity(id) {
    await activityCtrl.deleteActivity(id);
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  // Metric handlers
  async function handleAddMetric(metric) {
    const newMetric = await metricCtrl.addMetric(metric);
    setMetrics((prev) => [newMetric, ...prev]);
  }

  async function handleDeleteMetric(id) {
    await metricCtrl.deleteMetric(id);
    setMetrics((prev) => prev.filter((m) => m.id !== id));
  }

  return {
    activities,
    metrics,
    loading,
    handleAddActivity,
    handleDeleteActivity,
    handleAddMetric,
    handleDeleteMetric,
  };
}