import React from "react";

const metricIcons = {
  steps: "👟",
  water: "💧",
  sleep: "😴",
  calories: "🔥"
};

const metricLabels = {
  steps: "Steps",
  water: "Water",
  sleep: "Sleep",
  calories: "Calories"
};

const metricUnits = {
  steps: "",
  water: "L",
  sleep: "hrs",
  calories: "kcal"
};

export default function MetricList({ metrics, onDelete }) {
  if (!metrics.length)
    return (
      <article className="text-center py-8 text-gray-500" role="status" aria-live="polite">
        <p className="text-lg">📊 No metrics recorded yet.</p>
        <p className="text-sm mt-2">Start tracking your health metrics above!</p>
      </article>
    );

  return (
    <ul className="space-y-3" aria-live="polite" aria-label="Metrics list">
      {metrics.map((m) => (
        <li
          key={m.id}
          className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:shadow-md transition-shadow bg-white"
        >
          <article className="flex items-center gap-3 flex-1">
            <span className="text-2xl" aria-hidden="true">{metricIcons[m.metric]}</span>
            <section>
              <header className="flex items-center gap-2 mb-1">
                <time className="text-sm text-gray-600 font-medium" dateTime={m.date}>
                  {new Date(m.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </time>
                <span className="text-gray-400" aria-hidden="true">•</span>
                <span className="text-sm font-semibold text-gray-900">{metricLabels[m.metric]}</span>
              </header>
              <p className="text-lg font-bold text-gray-800">
                {m.value} <span className="text-sm font-normal text-gray-600">{metricUnits[m.metric]}</span>
              </p>
            </section>
          </article>
          <nav>
            <button
              aria-label={`Delete ${metricLabels[m.metric]} metric from ${m.date}, value ${m.value} ${metricUnits[m.metric]}`}
              onClick={() => onDelete(m.id)}
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
