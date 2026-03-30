/**
 * MetricSection Component
 * Displays the list of metrics with sorting options
 */

import React from "react";
import MetricList from "./MetricList.jsx";
import { METRIC_SORT_OPTIONS, DISPLAY_LIMITS } from "../constants/appConstants.js";

export default function MetricSection({ metrics, sortBy, onSortChange, onDelete }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium dark:text-white transition-colors">Raw metrics (recent)</h2>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-1 transition-colors"
          aria-label="Sort metrics"
        >
          {METRIC_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </header>
      <section className="mt-3">
        <MetricList
          metrics={metrics.slice(0, DISPLAY_LIMITS.METRICS)}
          onDelete={onDelete}
        />
      </section>
    </article>
  );
}

