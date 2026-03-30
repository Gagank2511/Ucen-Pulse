import React from "react";
import {formatISODate} from "../utils/metrics.js";

export default function MetricList({ metrics, onDelete }) {
  if (!metrics.length)
    return <div className="text-sm text-gray-500">No metrics recorded.</div>;
  return (
    <ul className="space-y-2">
      {metrics.map((m) => (
        <li
          key={m.id}
          className="p-3 border rounded-lg flex justify-between items-center"
        >
          <div className="text-sm text-gray-700">
            {formatISODate(m.date)} — <span className="font-medium">{m.metric}</span>:{" "}
            {m.value}
          </div>
          <div>
            <button
              aria-label={`Delete metric ${m.metric} on ${formatISODate(m.date)}`}
              onClick={() => onDelete(m.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
