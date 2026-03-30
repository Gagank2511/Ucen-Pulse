/**
 * FiltersPanel Component
 * Contains all filter controls: search, metric selection, activity filter, sorting, and date range
 */

import React from "react";
import { METRIC_OPTIONS, ACTIVITY_SORT_OPTIONS, DATE_RANGE } from "../constants/appConstants.js";

export default function FiltersPanel({
  searchQuery,
  setSearchQuery,
  selectedMetric,
  setSelectedMetric,
  selectedActivityFilter,
  setSelectedActivityFilter,
  activityTypes,
  activitySortBy,
  setActivitySortBy,
  rangeDays,
  setRangeDays,
  onResetToToday
}) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
      <h2 className="text-lg font-medium dark:text-white transition-colors">Filters & Search</h2>
      <form className="mt-3 space-y-3">
        {/* Search bar */}
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

        {/* Metric selection */}
        <label className="block">
          <span className="text-sm dark:text-gray-300">Metric</span>
          <select
            aria-label="Select metric"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 transition-colors"
          >
            {METRIC_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Activity type filter */}
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

        {/* Activity sort options */}
        <label className="block">
          <span className="text-sm dark:text-gray-300">Sort activities by</span>
          <select
            value={activitySortBy}
            onChange={(e) => setActivitySortBy(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 transition-colors"
            aria-label="Sort activities"
          >
            {ACTIVITY_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Date range slider */}
        <label className="block">
          <span className="text-sm dark:text-gray-300">Range (days)</span>
          <input
            aria-label="Range days"
            type="range"
            min={DATE_RANGE.MIN}
            max={DATE_RANGE.MAX}
            value={rangeDays}
            onChange={(e) => setRangeDays(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <output className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
            Showing last {rangeDays} days
          </output>
        </label>

        {/* Reset button */}
        <button
          type="button"
          onClick={onResetToToday}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
          aria-label="Reset to today"
        >
          📅 Reset to {DATE_RANGE.DEFAULT} Days
        </button>
      </form>
    </section>
  );
}

