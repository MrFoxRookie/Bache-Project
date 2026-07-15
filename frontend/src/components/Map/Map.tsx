import { useEffect, useRef, useState } from "react";
import L from "leaflet";

import locateUser from "./utils/locateUser";
import addTileLayer from "./utils/tileLayer";
import {
  enableAddMarkerMode,
  disableAddMarkerMode,
} from "./utils/enableAddMarkerMode";

import currentLocationIcon from "../../assets/icons/current-location.svg";

import styles from "./Map.module.css";

import ConfirmationPopup from "./ConfirmationPopup";

function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current);
    mapRef.current = map;

    addTileLayer(map);
    locateUser(map);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function handleKeyDown(event: L.LeafletKeyboardEvent) {
      if (event.originalEvent.key !== "a") return;

      if (isAddMode) {
        setIsConfirmationOpen(true);
        return;
      }

      setIsAddMode(true);
    }

    map.on("keydown", handleKeyDown);

    if (isAddMode) {
      enableAddMarkerMode(map);
    }

    return () => {
      map.off("keydown", handleKeyDown);

      if (isAddMode) {
        disableAddMarkerMode(map);
      }
    };
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

      {isConfirmationOpen && <ConfirmationPopup />}
    </div>
  );
}

export default Map;
