import React from "react";
import ChartsView from "../components/ChartsView.jsx";

export default function OverviewSection({ summary, chartData, selectedMetric, setSelectedMetric, rangeDays, setRangeDays }) {
  return (
    <>
      {/* Metric Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-gray-500 text-sm">Steps Today</div>
          <div className="text-2xl font-bold">{summary.steps || 0}</div>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-gray-500 text-sm">Water (L)</div>
          <div className="text-2xl font-bold">{summary.water || 0}</div>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <div className="text-gray-500 text-sm">Sleep (hrs)</div>
          <div className="text-2xl font-bold">{summary.sleep || 0}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white shadow rounded-2xl p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Overview</h2>
        <ChartsView data={chartData} metric={selectedMetric} />
      </div>
    </>
  );
}