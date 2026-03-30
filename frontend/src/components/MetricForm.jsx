/**
 * MetricForm Component
 * Form for recording health metrics (steps, water, sleep, calories)
 */

import React, { useState } from "react";
import { todayISO } from "../utils/storage.js";
import { VALIDATION, METRIC_OPTIONS } from "../constants/appConstants.js";
import FormField from "./FormField.jsx";

export default function MetricForm({ onAdd }) {
  const [date, setDate] = useState(todayISO(0));
  const [metric, setMetric] = useState("steps");
  const [value, setValue] = useState(0);
  const [errors, setErrors] = useState({});

  const config = VALIDATION.METRIC[metric];

  function validate() {
    const newErrors = {};
    if (!date) newErrors.date = "Date is required";
    if (value === "" || value < config.min) {
      newErrors.value = `Value must be at least ${config.min}`;
    }
    if (value > config.max) {
      newErrors.value = `Value cannot exceed ${config.max}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    onAdd({ date, metric, value });
    setValue(0);
    setErrors({});
  }

  return (
    <form onSubmit={submit} className="space-y-3" aria-label="Add metric form" noValidate>
      <fieldset className="space-y-3 border-0 p-0 m-0">
        <legend className="sr-only">Metric Details</legend>

        <FormField id="metric-date" label="Date" error={errors.date} required>
          <input
            id="metric-date"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-invalid={errors.date ? "true" : "false"}
          />
        </FormField>

        <FormField id="metric-type" label="Metric">
          <select
            id="metric-type"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            {METRIC_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="metric-value" label={config.label} error={errors.value} required>
          <input
            id="metric-value"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
              errors.value ? 'border-red-500' : 'border-gray-300'
            }`}
            type="number"
            step={config.step}
            min={config.min}
            max={config.max}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            aria-invalid={errors.value ? "true" : "false"}
          />
        </FormField>
      </fieldset>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all animate-scale-in"
      >
        Save Metric
      </button>
    </form>
  );
}
