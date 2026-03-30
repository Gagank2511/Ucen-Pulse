/**
 * ChartStats Component
 * Displays statistics summary (average, peak, total) for chart data
 */

import React from "react";

export default function ChartStats({ average, max, total, color }) {
  return (
    <section className="grid grid-cols-3 gap-3 text-center" aria-label="Statistics summary">
      <article className="bg-gray-50 p-2 rounded-lg">
        <header className="text-xs text-gray-500">Average</header>
        <p className="text-lg font-semibold" style={{ color }}>{average}</p>
      </article>
      <article className="bg-gray-50 p-2 rounded-lg">
        <header className="text-xs text-gray-500">Peak</header>
        <p className="text-lg font-semibold" style={{ color }}>{max}</p>
      </article>
      <article className="bg-gray-50 p-2 rounded-lg">
        <header className="text-xs text-gray-500">Total</header>
        <p className="text-lg font-semibold" style={{ color }}>{total}</p>
      </article>
    </section>
  );
}

