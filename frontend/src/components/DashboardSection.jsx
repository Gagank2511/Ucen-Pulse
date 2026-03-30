/**
 * DashboardSection Component
 * Displays today's overview with metric cards and trend analysis charts
 */

import React from "react";
import DashboardCards from "./DashboardCards.jsx";
import ChartsView from "./ChartsView.jsx";

export default function DashboardSection({ summary, chartData, selectedMetric }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm transition-colors animate-fade-in">
      <h2 className="text-lg font-semibold mb-4 dark:text-white transition-colors">Today's Overview</h2>
      <DashboardCards summary={summary} />

      <section className="mt-6">
        <h3 className="text-md font-semibold mb-3 dark:text-white transition-colors">Trend Analysis</h3>
        <ChartsView data={chartData} metric={selectedMetric} />
      </section>
    </article>
  );
}

