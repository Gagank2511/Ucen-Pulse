/**
 * MetricForm Component
 * Form for recording health metrics (steps, water, sleep, calories)
 * Each metric has specific validation rules (min, max, step values)
 */

import React, { useState } from "react";
import { todayISO } from "../utils/storage.js";

export default function MetricForm({ onAdd }) {
  // Form state - stores user input values
  const [date, setDate] = useState(todayISO(0)); // Default to today
  const [metric, setMetric] = useState("steps"); // Default metric type
  const [value, setValue] = useState(0); // Metric value
  const [errors, setErrors] = useState({}); // Validation errors

  // Configuration for each metric type - defines validation rules
  const metricConfig = {
    steps: { min: 0, max: 100000, step: 1, label: "Steps" },
    water: { min: 0, max: 20, step: 0.1, label: "Water (L)" },
    sleep: { min: 0, max: 24, step: 0.5, label: "Sleep (hrs)" },
    calories: { min: 0, max: 10000, step: 1, label: "Calories" }
  };

  // Validate form inputs based on selected metric's configuration
  function validate() {
    const newErrors = {};
    const config = metricConfig[metric];

    // Date is required
    if (!date) {
      newErrors.date = "Date is required";
    }

    // Value must be within the metric's min/max range
    if (value === "" || value < config.min) {
      newErrors.value = `Value must be at least ${config.min}`;
    }

    if (value > config.max) {
      newErrors.value = `Value cannot exceed ${config.max}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }

  // Handle form submission
  function submit(e) {
    e.preventDefault(); // Prevent page reload

    // Only submit if validation passes
    if (!validate()) {
      return;
    }

    // Call parent component's onAdd function with form data
    onAdd({ date, metric, value });

    // Reset value field after successful submission
    setValue(0);
    setErrors({});
  }

  // Get configuration for currently selected metric
  const config = metricConfig[metric];

  return (
    <form onSubmit={submit} className="space-y-3" aria-label="Add metric form" noValidate>
      <fieldset className="space-y-3 border-0 p-0 m-0">
        <legend className="sr-only">Metric Details</legend>

        <section>
          <label htmlFor="metric-date" className="block">
            <span className="text-sm font-medium">Date</span>
            <input
              id="metric-date"
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              aria-required="true"
              aria-invalid={errors.date ? "true" : "false"}
              aria-describedby={errors.date ? "metric-date-error" : undefined}
            />
          </label>
          {errors.date && (
            <p id="metric-date-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.date}
            </p>
          )}
        </section>

        <section>
          <label htmlFor="metric-type" className="block">
            <span className="text-sm font-medium">Metric</span>
            <select
              id="metric-type"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              aria-label="Metric type"
            >
              <option value="steps">Steps</option>
              <option value="water">Water (L)</option>
              <option value="sleep">Sleep (hrs)</option>
              <option value="calories">Calories</option>
            </select>
          </label>
        </section>

        <section>
          <label htmlFor="metric-value" className="block">
            <span className="text-sm font-medium">{config.label}</span>
            <input
              id="metric-value"
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.value ? 'border-red-500' : 'border-gray-300'
              }`}
              type="number"
              step={config.step}
              min={config.min}
              max={config.max}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              aria-required="true"
              aria-invalid={errors.value ? "true" : "false"}
              aria-describedby={errors.value ? "metric-value-error" : undefined}
            />
          </label>
          {errors.value && (
            <p id="metric-value-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.value}
            </p>
          )}
        </section>
      </fieldset>

      <section>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Save Metric
        </button>
      </section>
    </form>
  );
}
