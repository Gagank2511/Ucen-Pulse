/**
 * InputFormsSection Component
 * Contains all input forms: activity form, metric form, and filters panel
 */

import React from "react";
import ActivityForm from "./ActivityForm.jsx";
import MetricForm from "./MetricForm.jsx";
import FiltersPanel from "./FiltersPanel.jsx";

export default function InputFormsSection({
  onAddActivity,
  onAddMetric,
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
  onResetToToday,
}) {
  return (
    <section aria-labelledby="inputs" className="lg:col-span-1" role="region">
      <article className="space-y-4">
        {/* Activity Form */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
          <h2 id="inputs" className="text-lg font-medium dark:text-white transition-colors">
            Add activity
          </h2>
          <ActivityForm onAdd={onAddActivity} />
        </section>

        {/* Metric Form */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm transition-colors animate-fade-in">
          <h2 className="text-lg font-medium dark:text-white transition-colors">Record metric</h2>
          <MetricForm onAdd={onAddMetric} />
        </section>

        {/* Filters Panel */}
        <FiltersPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          selectedActivityFilter={selectedActivityFilter}
          setSelectedActivityFilter={setSelectedActivityFilter}
          activityTypes={activityTypes}
          activitySortBy={activitySortBy}
          setActivitySortBy={setActivitySortBy}
          rangeDays={rangeDays}
          setRangeDays={setRangeDays}
          onResetToToday={onResetToToday}
        />
      </article>
    </section>
  );
}

