const API = "http://localhost:5001/api";

export async function fetchWeather() {
  const res = await fetch(`${API}/weather`);
  return res.json();
}