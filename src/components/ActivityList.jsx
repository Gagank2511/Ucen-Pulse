/**
 * ActivityList Component
 * Displays a list of logged activities with delete functionality
 * Shows empty state when no activities exist
 */

import React from "react";

export default function ActivityList({ activities, onDelete }) {
  // Show empty state message if no activities
  if (!activities.length)
    return (
      <article className="text-center py-8 text-gray-500" role="status" aria-live="polite">
        <p className="text-lg">📋 No activities yet.</p>
        <p className="text-sm mt-2">Start by adding your first activity above!</p>
      </article>
    );

  // Render list of activities
  return (
    <ul className="space-y-3" aria-live="polite" aria-label="Activities list">
      {/* Map through activities array and render each one */}
      {activities.map((a) => (
        <li
          key={a.id}
          className="p-4 border border-gray-200 rounded-lg flex justify-between items-start hover:shadow-md transition-shadow bg-white"
        >
          <article className="flex-1">
            <header className="flex items-center gap-2 mb-1">
              <time className="text-sm text-gray-600 font-medium" dateTime={a.date}>
                {new Date(a.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })}
              </time>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <span className="text-sm font-semibold text-gray-900">{a.type}</span>
            </header>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{a.duration}</span> minutes
            </p>
            {a.notes && (
              <blockquote className="text-sm text-gray-600 mt-2 italic bg-gray-50 p-2 rounded">
                "{a.notes}"
              </blockquote>
            )}
          </article>
          <nav>
            <button
              aria-label={`Delete ${a.type} activity from ${new Date(a.date).toLocaleDateString('en-GB')}, duration ${a.duration} minutes`}
              onClick={() => onDelete(a.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </nav>
        </li>
      ))}
    </ul>
  );
}
