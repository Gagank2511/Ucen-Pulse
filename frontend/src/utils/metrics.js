function uid() {
  return Math.floor(Math.random() * 1e9).toString(36);
}

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

// Group by date + metric for chart-friendly data
function formatISODate(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function aggregateMetrics(metrics, metricName, rangeDays = 30) {
  const now = new Date();
  const out = {};

  // Initialize output for last N days
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    out[iso] = { date: iso };
  }

  metrics.forEach((m) => {
    if (metricName && m.metric !== metricName) return;

    const iso = formatISODate(m.date); // normalize
    if (!out[iso]) return; // ignore out-of-range
    out[iso][m.metric] = (out[iso][m.metric] || 0) + Number(m.value || 0);
  });

  return Object.values(out);
}

export { uid, todayISO, formatISODate, aggregateMetrics };
