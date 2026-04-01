import { useEffect, useState } from "react";
import { fetchWeather } from "../controllers/weatherController.js";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchWeather();
      setWeather(data);
    }
    load();
  }, []);

  if (!weather) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow">
      <h3 className="font-semibold text-blue-700">Today's Weather</h3>
      <p className="text-lg">{weather.temp}°C</p>
      <p className="text-sm">{weather.condition}</p>

      {/* Smart suggestion */}
      <p className="mt-2 text-sm font-medium">
        {weather.condition === "Rain"
          ? "🌧️ Rain expected — consider indoor workout"
          : weather.condition === "Clear"
          ? "☀️ Perfect for outdoor activities!"
          : "🌥️ Good for light exercise"}
      </p>
    </div>
  );
}