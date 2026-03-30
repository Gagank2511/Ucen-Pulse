import React from "react";
import MetricForm from "./MetricForm.jsx";
import MetricList from "../components/MetricList.jsx";

export default function MetricSection({ metrics, onAdd, onDelete }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Record Metric</h2>
        <MetricForm onAdd={onAdd} />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">All Metrics</h2>
        <MetricList metrics={metrics} onDelete={onDelete} />
      </div>
    </div>
  );
}