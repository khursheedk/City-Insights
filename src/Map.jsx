import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ location }) {
  return (
    <section>
      <h2>📍 Geographical Location</h2>

      <div className="map-container">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={6}
          scrollWheelZoom={true}
          className="map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[location.latitude, location.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.country}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="coordinates">
        Latitude: {location.latitude} | Longitude: {location.longitude}
      </div>
    </section>
  );
}