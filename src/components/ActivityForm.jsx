/**
 * ActivityForm Component
 * Form for logging daily activities (running, cycling, gym, etc.)
 * Includes validation for date, duration, and optional notes
 */

import React, { useState } from "react";
import { todayISO } from "../utils/storage.js";

export default function ActivityForm({ onAdd }) {
  // Form state - stores user input values
  const [date, setDate] = useState(todayISO(0)); // Default to today
  const [type, setType] = useState("Running"); // Default activity type
  const [duration, setDuration] = useState(30); // Default 30 minutes
  const [notes, setNotes] = useState(""); // Optional notes
  const [errors, setErrors] = useState({}); // Validation errors

  // Validate form inputs before submission
  function validate() {
    const newErrors = {};

    // Date is required
    if (!date) {
      newErrors.date = "Date is required";
    }

    // Duration must be at least 1 minute
    if (!duration || duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
    }

    // Duration cannot exceed 24 hours (1440 minutes)
    if (duration > 1440) {
      newErrors.duration = "Duration cannot exceed 24 hours (1440 minutes)";
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
    onAdd({ date, type, duration, notes });

    // Reset notes field after successful submission
    setNotes("");
    setErrors({});
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3"
      aria-label="Add activity form"
      noValidate
    >
      {/* Fieldset groups related form fields together */}
      <fieldset className="space-y-3 border-0 p-0 m-0">
        <legend className="sr-only">Activity Details</legend>

        {/* Date input field */}
        <section>
          <label htmlFor="activity-date" className="block">
            <span className="text-sm font-medium dark:text-gray-300">Date</span>
            <input
              id="activity-date"
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              aria-required="true"
              aria-invalid={errors.date ? "true" : "false"}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
          </label>
          {/* Show error message if date validation fails */}
          {errors.date && (
            <p id="date-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.date}
            </p>
          )}
        </section>

        {/* Activity type dropdown - 7 options available */}
        <section>
          <label htmlFor="activity-type" className="block">
            <span className="text-sm font-medium dark:text-gray-300">Type</span>
            <select
              id="activity-type"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Activity type"
            >
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Gym">Gym</option>
              <option value="Yoga">Yoga</option>
              <option value="Swimming">Swimming</option>
              <option value="Walking">Walking</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </section>

        {/* Duration input - must be between 1 and 1440 minutes (24 hours) */}
        <section>
          <label htmlFor="activity-duration" className="block">
            <span className="text-sm font-medium dark:text-gray-300">Duration (minutes)</span>
            <input
              id="activity-duration"
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              }`}
              type="number"
              min="1"
              max="1440"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              aria-required="true"
              aria-invalid={errors.duration ? "true" : "false"}
              aria-describedby={errors.duration ? "duration-error" : undefined}
            />
          </label>
          {/* Show error message if duration validation fails */}
          {errors.duration && (
            <p id="duration-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.duration}
            </p>
          )}
        </section>

        {/* Optional notes field with character counter (max 200 characters) */}
        <section>
          <label htmlFor="activity-notes" className="block">
            <span className="text-sm font-medium dark:text-gray-300">Notes (optional)</span>
            <textarea
              id="activity-notes"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength="200"
              aria-label="Activity notes"
            />
            {/* Character counter shows current/max characters */}
            <span className="text-xs text-gray-500 dark:text-gray-400">{notes.length}/200 characters</span>
          </label>
        </section>
      </fieldset>

      {/* Submit button */}
      <section>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all animate-scale-in"
        >
          Add Activity
        </button>
      </section>
    </form>
  );
}
