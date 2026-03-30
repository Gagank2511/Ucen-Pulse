const API = "http://localhost:5001/api";

function getToken() {
  return localStorage.getItem("token");
}

// GET
export async function fetchMetrics() {
  const res = await fetch(`${API}/metrics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

// CREATE
export async function addMetric(data) {
  const res = await fetch(`${API}/metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// DELETE
export async function deleteMetric(id) {
  await fetch(`${API}/metrics/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}