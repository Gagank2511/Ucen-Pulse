import React, { useState } from "react";
import { todayISO } from "../utils/storage.js";

export default function ActivityForm({ onAdd }) {
  const [date, setDate] = useState(todayISO(0));
  const [type, setType] = useState("Running");
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!duration || duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
    }

    if (duration > 1440) {
      newErrors.duration = "Duration cannot exceed 24 hours (1440 minutes)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onAdd({ date, type, duration, notes });
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
      <div>
        <label htmlFor="activity-date" className="block">
          <span className="text-sm font-medium">Date</span>
          <input
            id="activity-date"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
        {errors.date && (
          <p id="date-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.date}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="activity-type" className="block">
          <span className="text-sm font-medium">Type</span>
          <select
            id="activity-type"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      </div>

      <div>
        <label htmlFor="activity-duration" className="block">
          <span className="text-sm font-medium">Duration (minutes)</span>
          <input
            id="activity-duration"
            className={`mt-1 block w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
        {errors.duration && (
          <p id="duration-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.duration}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="activity-notes" className="block">
          <span className="text-sm font-medium">Notes (optional)</span>
          <textarea
            id="activity-notes"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength="200"
            aria-label="Activity notes"
          />
          <span className="text-xs text-gray-500">{notes.length}/200 characters</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Activity
        </button>
      </div>
    </form>
  );
}
