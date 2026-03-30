/**
 * CustomTooltip Component
 * Custom tooltip for chart hover interactions
 */

import React from "react";

export default function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <aside className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg" role="tooltip">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          {payload[0].name}: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </aside>
    );
  }
  return null;
}

