import { useEffect, useState } from "react";

import Weather from "./Weather";
import CityInfo from "./CityInfo";
import Forecast from "./Forecast";
import AirQuality from "./AirQuality";
import Map from "./Map";

import "./App.css";

export default function App() {
  const [city, setCity] = useState("Mumbai");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLocation(null);

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          throw new Error("City not found");
        }

        setLocation(data.results[0]);
        setLoading(false);
      })
      .catch(() => {
        setLocation(null);
        setLoading(false);
      });
  }, [city]);

  function handleSubmit(e) {
    e.preventDefault();

    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  }

  return (
    <main>
      <header className="hero">
        <div className="cloud cloud-one">☁️</div>
        <div className="cloud cloud-two">☁️</div>

        <h1>🌍 City Insights</h1>

        <p>
          Discover real-time weather, location and air quality
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a city..."
          />

          <button type="submit">Search</button>
        </form>
      </header>

      <h2 className="city-name">{city}</h2>

      {loading ? (
        <p className="loading">Finding city...</p>
      ) : location ? (
        <>
          <Weather location={location} />

          <CityInfo location={location} />

          <Map location={location} />

          <Forecast location={location} />

          <AirQuality location={location} />
        </>
      ) : (
        <p className="error">
          City not found. Please try another city.
        </p>
      )}
    </main>
  );
}