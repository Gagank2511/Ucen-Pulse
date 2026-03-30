const API = "http://localhost:5001/api";

function getToken() {
  return localStorage.getItem("token");
}

// GET all activities
export async function fetchActivities() {
  const res = await fetch(`${API}/activities`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

// CREATE activity
export async function addActivity(data) {
  const res = await fetch(`${API}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// DELETE activity
export async function deleteActivity(id) {
  await fetch(`${API}/activities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

// ---------- UI HELPERS (KEEP THESE) ----------

export function getActivityTypes(activities) {
  return ["all", ...Array.from(new Set(activities.map((a) => a.type)))];
}

export function getFilteredActivities(activities, filter = "all") {
  return activities
    .filter((a) => filter === "all" || a.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}