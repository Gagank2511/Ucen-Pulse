function uid() {
  return Math.floor(Math.random() * 1e9).toString(36);
}

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("failed to load", key, e);
    return fallback;
  }
}

function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("failed to save", key, e);
  }
}

// Group by date + metric for chart-friendly data
function aggregateMetrics(metrics, metricName, rangeDays = 30) {
  const now = new Date();
  const out = {};
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    out[iso] = { date: iso };
  }
  metrics.forEach((m) => {
    if (metricName && m.metric !== metricName) return;
    if (!out[m.date]) return; // ignore out-of-range
    out[m.date][m.metric] = (out[m.date][m.metric] || 0) + Number(m.value || 0);
  });
  return Object.values(out);
}

export { uid, todayISO, load, save, aggregateMetrics };
