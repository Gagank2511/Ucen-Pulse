/**
 * ChartsView Component
 * Displays interactive charts for metric visualization
 */

import React from "react";
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend, Area, AreaChart } from "recharts";
import { METRIC_TYPES } from "../constants/appConstants.js";
import ChartStats from "./ChartStats.jsx";
import CustomTooltip from "./CustomTooltip.jsx";

export default function ChartsView({ data, metric }) {
  const isBar = metric === "steps" || metric === "calories";
  const metricType = METRIC_TYPES[metric];
  const color = metricType?.color ? `#${metricType.color === 'blue' ? '3b82f6' : metricType.color === 'cyan' ? '06b6d4' : metricType.color === 'purple' ? '8b5cf6' : 'f59e0b'}` : "#3b82f6";
  const label = metricType?.label || metric;

  const values = data.map(d => d[metric] || 0).filter(v => v > 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const average = values.length > 0 ? (total / values.length).toFixed(1) : 0;
  const max = values.length > 0 ? Math.max(...values) : 0;

  return (
    <article className="space-y-4">
      <ChartStats average={average} max={max} total={total} color={color} />

      <figure style={{ width: "100%", height: 320 }} role="img" aria-label={`${label} trend chart`}>
        <ResponsiveContainer>
          {isBar ? (
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} iconType="square" />
              <Bar dataKey={metric} name={label} fill={color} radius={[4, 4, 0, 0]} animationDuration={800} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} iconType="line" />
              <Area type="monotone" dataKey={metric} name={label} stroke={color} strokeWidth={2} fill={`url(#color${metric})`} animationDuration={800} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </figure>
    </article>
  );
}
