import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrl";
import Button from "./Button";
function Map() {
  const [mapPostion, setMapPostion] = useState([40, 0]);
  const { cities } = useCities();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation({ defaultPosition: { lat: 40, lng: 0 } });
  const [lat, lng] = useUrlPosition();
  useEffect(() => {
    if (lat && lng) setMapPostion([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) setMapPostion([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);
  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && <Button type='position' onClick={getPosition} disabled={isLoadingPosition}>
        {isLoadingPosition ? 'Loading...' : 'Get your Position'}
      </Button>}
      <MapContainer
        className={styles.map}
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>
                {city.emoji} <span>{city.cityName}</span>
              </span>
            </Popup>
          </Marker>
        ))}
        <ChnageCenter position={mapPostion} />
        <DetectLocation />
      </MapContainer>
    </div>
  );
}

function ChnageCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectLocation() {
  const navigate = useNavigate();
  useMapEvent('click', (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`))
}

export default Map;
