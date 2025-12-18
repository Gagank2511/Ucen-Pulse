/**
 * ActivityForm Component
 * Form for logging daily activities (running, cycling, gym, etc.)
 */

import React, { useState } from "react";
import { todayISO } from "../utils/storage.js";
import { ACTIVITY_TYPES, VALIDATION } from "../constants/appConstants.js";
import FormField from "./FormField.jsx";

export default function ActivityForm({ onAdd }) {
  const [date, setDate] = useState(todayISO(0));
  const [type, setType] = useState("Running");
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const { DURATION_MIN, DURATION_MAX, NOTES_MAX_LENGTH } = VALIDATION.ACTIVITY;

  function validate() {
    const newErrors = {};
    if (!date) newErrors.date = "Date is required";
    if (!duration || duration < DURATION_MIN) {
      newErrors.duration = `Duration must be at least ${DURATION_MIN} minute`;
    }
    if (duration > DURATION_MAX) {
      newErrors.duration = `Duration cannot exceed ${DURATION_MAX} minutes`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    onAdd({ date, type, duration, notes });
    setNotes("");
    setErrors({});
  }

  return (
    <form onSubmit={submit} className="space-y-3" aria-label="Add activity form" noValidate>
      <fieldset className="space-y-3 border-0 p-0 m-0">
        <legend className="sr-only">Activity Details</legend>

        <FormField id="activity-date" label="Date" error={errors.date} required>
          <input
            id="activity-date"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-invalid={errors.date ? "true" : "false"}
          />
        </FormField>

        <FormField id="activity-type" label="Type">
          <select
            id="activity-type"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {ACTIVITY_TYPES.map((activityType) => (
              <option key={activityType} value={activityType}>
                {activityType}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="activity-duration" label="Duration (minutes)" error={errors.duration} required>
          <input
            id="activity-duration"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
            type="number"
            min={DURATION_MIN}
            max={DURATION_MAX}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            aria-invalid={errors.duration ? "true" : "false"}
          />
        </FormField>

        <FormField id="activity-notes" label="Notes (optional)">
          <textarea
            id="activity-notes"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={NOTES_MAX_LENGTH}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {notes.length}/{NOTES_MAX_LENGTH} characters
          </span>
        </FormField>
      </fieldset>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all animate-scale-in"
      >
        Add Activity
      </button>
    </form>
  );
}
