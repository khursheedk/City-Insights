export default function CityInfo({ location }) {
  return (
    <section>
      <h2>📍 City Information</h2>

      <div className="info-grid">

        <p>
          <strong>Country:</strong>{" "}
          {location.country || "Not available"}
        </p>

        <p>
          <strong>State:</strong>{" "}
          {location.admin1 || "Not available"}
        </p>

        <p>
          <strong>Timezone:</strong>{" "}
          {location.timezone || "Not available"}
        </p>

        <p>
          <strong>Latitude:</strong>{" "}
          {location.latitude}
        </p>

        <p>
          <strong>Longitude:</strong>{" "}
          {location.longitude}
        </p>

        <p>
          <strong>Elevation:</strong>{" "}
          {location.elevation || 0} m
        </p>

      </div>
    </section>
  );
}