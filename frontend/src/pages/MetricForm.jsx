// pages/dashboard/MetricForm.jsx
import { useState } from "react";
import { todayISO } from "../utils/metrics.js";

export default function MetricForm({ onAdd }) {
  const [form, setForm] = useState({
    date: todayISO(0),
    metric: "steps",
    value: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.metric || !form.value) return;

    onAdd(form);

    setForm({ ...form, value: "" });
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
        name="metric"
        value={form.metric}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="steps">Steps</option>
        <option value="water">Water (L)</option>
        <option value="sleep">Sleep (hrs)</option>
        <option value="calories">Calories</option>
      </select>

      <input
        type="number"
        name="value"
        value={form.value}
        onChange={handleChange}
        placeholder="Enter value"
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
        Save Metric
      </button>
    </form>
  );
}