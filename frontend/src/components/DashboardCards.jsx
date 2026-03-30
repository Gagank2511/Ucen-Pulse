/**
 * DashboardCards Component
 * Displays today's overview with metric cards (steps, water, sleep, calories)
 */

import React from "react";
import { METRIC_TYPES } from "../constants/appConstants.js";

/**
 * MetricCard - Individual metric card with progress bar
 */
function MetricCard({ title, icon, value, unit, goal, color }) {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <article
      className={`p-4 border-2 border-${color}-100 rounded-xl bg-${color}-50`}
      role="status"
      aria-label={`${title} today`}
    >
      <header className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium text-${color}-700`}>{title}</h3>
        <span className="text-2xl" aria-hidden="true">{icon}</span>
      </header>
      <p className={`text-2xl font-bold text-${color}-900`}>
        {value} {unit}
      </p>
      <p className={`mt-2 text-xs text-${color}-600`}>
        Goal: {goal.toLocaleString()} {unit}
      </p>
      <div className={`mt-1 w-full bg-${color}-200 rounded-full h-2`}>
        <div
          className={`bg-${color}-600 h-2 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={goal}
        ></div>
      </div>
    </article>
  );
}

/**
 * DashboardCards - Container for all metric cards
 */
export default function DashboardCards({ summary }) {
  const metrics = Object.values(METRIC_TYPES).map((metricType) => ({
    title: metricType.label,
    icon: metricType.icon,
    value: summary.totals[metricType.value] || 0,
    unit: metricType.unit,
    goal: metricType.goal,
    color: metricType.color,
  }));

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </section>
  );
}

