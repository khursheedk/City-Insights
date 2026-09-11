import { useEffect, useState } from "react";

export default function Weather({ location }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current);
      })
      .catch(() => {
        setWeather(null);
      });
  }, [location]);

  function getWeather(code) {
    if (code === 0) {
      return {
        icon: "☀️",
        text: "Clear Sky",
      };
    }

    if (code <= 3) {
      return {
        icon: "🌤️",
        text: "Partly Cloudy",
      };
    }

    if (code <= 48) {
      return {
        icon: "🌫️",
        text: "Foggy",
      };
    }

    if (code <= 67) {
      return {
        icon: "🌧️",
        text: "Rain",
      };
    }

    if (code <= 77) {
      return {
        icon: "❄️",
        text: "Snow",
      };
    }

    if (code <= 82) {
      return {
        icon: "🌦️",
        text: "Rain Showers",
      };
    }

    if (code <= 99) {
      return {
        icon: "⛈️",
        text: "Thunderstorm",
      };
    }

    return {
      icon: "☁️",
      text: "Unknown",
    };
  }

  return (
    <section className="weather-section">
      <h2>🌤️ Current Weather</h2>

      {weather ? (
        <>
          <div className="weather-main">
            <div className="weather-icon">
              {getWeather(weather.weather_code).icon}
            </div>

            <div>
              <h3>{location.name}</h3>

              <div className="temperature">
                {weather.temperature_2m}°C
              </div>

              <p>
                {getWeather(weather.weather_code).text}
              </p>
            </div>
          </div>

          <div className="weather-grid">
            <div>
              <strong>💧 Humidity</strong>
              <p>{weather.relative_humidity_2m}%</p>
            </div>

            <div>
              <strong>🌡️ Feels Like</strong>
              <p>{weather.apparent_temperature}°C</p>
            </div>

            <div>
              <strong>💨 Wind Speed</strong>
              <p>{weather.wind_speed_10m} km/h</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </section>
  );
}