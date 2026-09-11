import { useEffect, useState } from "react";

export default function AirQuality({ location }) {
  const [air, setAir] = useState(null);

  useEffect(() => {
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        setAir(data.current);
      })
      .catch(() => {
        setAir(null);
      });
  }, [location]);

  function getStatus(aqi) {
    if (aqi <= 20) return "Good";
    if (aqi <= 40) return "Fair";
    if (aqi <= 60) return "Moderate";
    if (aqi <= 80) return "Poor";
    if (aqi <= 100) return "Very Poor";

    return "Extremely Poor";
  }

  return (
    <section>
      <h2>🌫️ Air Quality</h2>

      {air ? (
        <div className="air-grid">

          <div>
            <strong>European AQI</strong>
            <p>{air.european_aqi}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{getStatus(air.european_aqi)}</p>
          </div>

          <div>
            <strong>PM2.5</strong>
            <p>{air.pm2_5} μg/m³</p>
          </div>

          <div>
            <strong>PM10</strong>
            <p>{air.pm10} μg/m³</p>
          </div>

          <div>
            <strong>NO₂</strong>
            <p>{air.nitrogen_dioxide} μg/m³</p>
          </div>

          <div>
            <strong>O₃</strong>
            <p>{air.ozone} μg/m³</p>
          </div>

        </div>
      ) : (
        <p>Loading air quality...</p>
      )}
    </section>
  );
}