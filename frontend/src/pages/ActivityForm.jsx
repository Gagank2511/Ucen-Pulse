// pages/dashboard/ActivityForm.jsx
import { useState } from "react";
import { todayISO } from "../utils/metrics.js";

export default function ActivityForm({ onAdd }) {
  const [form, setForm] = useState({
    date: todayISO(0),
    type: "Running",
    duration: 30,
    notes: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.type || !form.duration) return;

    onAdd(form);

    // reset notes only
    setForm({ ...form, notes: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option>Running</option>
        <option>Cycling</option>
        <option>Gym</option>
        <option>Yoga</option>
      </select>

      <input
        type="number"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        placeholder="Duration (mins)"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Add Activity
      </button>
    </form>
  );
}