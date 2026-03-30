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
} from "recharts";

export default function ChartsView({ data, metric }) {
  // pick visual type: steps -> bar, water/sleep -> line
  const isBar = metric === "steps" || metric === "calories";

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        {isBar ? (
          <BarChart data={data} aria-label={`Bar chart for ${metric}`}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={metric} name={metric} />
          </BarChart>
        ) : (
          <LineChart data={data} aria-label={`Line chart for ${metric}`}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={metric} stroke="#8884d8" dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
