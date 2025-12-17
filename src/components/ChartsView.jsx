import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const metricColors = {
  steps: "#3b82f6",
  water: "#06b6d4",
  sleep: "#8b5cf6",
  calories: "#f59e0b"
};

const metricLabels = {
  steps: "Steps",
  water: "Water (L)",
  sleep: "Sleep (hrs)",
  calories: "Calories"
};

const CustomTooltip = ({ active, payload, label }) => {
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
};

export default function ChartsView({ data, metric }) {
  // pick visual type: steps/calories -> bar, water/sleep -> area
  const isBar = metric === "steps" || metric === "calories";
  const color = metricColors[metric] || "#3b82f6";
  const label = metricLabels[metric] || metric;

  // Calculate statistics
  const values = data.map(d => d[metric] || 0).filter(v => v > 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const average = values.length > 0 ? (total / values.length).toFixed(1) : 0;
  const max = values.length > 0 ? Math.max(...values) : 0;

  return (
    <article className="space-y-4">
      {/* Statistics Summary */}
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

      {/* Chart */}
      <figure
        style={{ width: "100%", height: 320 }}
        role="img"
        aria-label={`${label} trend chart showing data over time. Average: ${average}, Peak: ${max}, Total: ${total}`}
      >
        <ResponsiveContainer>
          {isBar ? (
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '14px' }}
                iconType="square"
              />
              <Bar
                dataKey={metric}
                name={label}
                fill={color}
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '14px' }}
                iconType="line"
              />
              <Area
                type="monotone"
                dataKey={metric}
                name={label}
                stroke={color}
                strokeWidth={2}
                fill={`url(#color${metric})`}
                animationDuration={800}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </figure>
    </article>
  );
}
