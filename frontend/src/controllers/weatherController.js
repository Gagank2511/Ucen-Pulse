const API_KEY = process.env.WEATHER_API_KEY;

export async function getWeather(city = "London") {
	const coordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
	const { lat, lon } = (await coordinates.json())[0];
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const data = await res.json();

  return {
    temp: data.main.temp,
    condition: data.weather[0].main, // Rain, Clear, Clouds
  };
}