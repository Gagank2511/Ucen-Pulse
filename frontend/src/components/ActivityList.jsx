import React from "react";
import {formatISODate} from "../utils/metrics.js";

export default function ActivityList({ activities, onDelete }) {
  if (!activities.length)
    return <div className="text-sm text-gray-500">No activities yet.</div>;
  return (
    <ul className="space-y-2" aria-live="polite">
      {activities.map((a) => (
        <li
          key={a.id}
          className="p-3 border rounded-lg flex justify-between items-start"
        >
          <div>
            <div className="text-sm text-gray-500">
              {formatISODate(a.date)} • <span className="font-medium">{a.type}</span>
            </div>
            <div className="text-sm">{a.duration} min</div>
            {a.notes && (
              <div className="text-xs text-gray-600 mt-1">{a.notes}</div>
            )}
          </div>
          <div>
            <button
              aria-label={`Delete activity on ${formatISODate(a.date)}`}
              onClick={() => onDelete(a.id)}
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
