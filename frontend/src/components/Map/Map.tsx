import { useEffect, useRef, useState } from "react";
import L from "leaflet";

import locateUser from "./utils/locateUser";
import addTileLayer from "./utils/tileLayer";
import enableAddMarkerMode from "./utils/enableAddMarkerMode";

import currentLocationIcon from "../../assets/icons/current-location.svg";

import styles from "./Map.module.css";

function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current, {});
    mapRef.current = map;

    addTileLayer(map);
    locateUser(map);

    map.on("keydown", (event) => {
      if (event.originalEvent.key === "a") {
        setIsAddMode((prev) => !prev);
      }
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (isAddMode) {
      console.log("entraste");
      enableAddMarkerMode(mapRef.current);
    } else {
      console.log("saliste");
    }
  }, [isAddMode]);

  return (
    <div ref={mapContainerRef} className={styles.map} id="map">
      <button
        className={styles.locateButton}
        aria-label="Centrar mapa en mi ubicación"
        onClick={() => {
          if (!mapRef.current) return;
          locateUser(mapRef.current);
        }}
      >
        <img className={styles.locateIcon} src={currentLocationIcon} alt="" />
      </button>
    </div>
  );
}

export default Map;
