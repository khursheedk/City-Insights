import { useEffect, useState } from "react";

export default function Forecast({ location }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto&forecast_days=7`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecast(data.daily);
      })
      .catch(() => {
        setForecast(null);
      });
  }, [location]);

  return (
    <section>
      <h2>📅 7-Day Forecast</h2>

      {forecast ? (
        <div className="forecast">

          {forecast.time.map((day, index) => (
            <div className="forecast-card" key={day}>

              <strong>{day}</strong>

              <p>
                🌡️ {forecast.temperature_2m_min[index]}°C -
                {" "}
                {forecast.temperature_2m_max[index]}°C
              </p>

              <p>
                🌧️ Rain:{" "}
                {forecast.precipitation_probability_max[index]}%
              </p>

              <p>
                🌅 Sunrise:{" "}
                {forecast.sunrise[index].slice(11, 16)}
              </p>

              <p>
                🌇 Sunset:{" "}
                {forecast.sunset[index].slice(11, 16)}
              </p>

            </div>
          ))}

        </div>
      ) : (
        <p>Loading forecast...</p>
      )}
    </section>
  );
}