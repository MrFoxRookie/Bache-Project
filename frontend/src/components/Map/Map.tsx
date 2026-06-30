import styles from "./Map.module.css";
import L from "leaflet";
import { useRef, useEffect } from "react";
// import currentLocationIcon from "../../assets/icons/currentLocationIcon.svg";

function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (leafletMapRef.current) return;

    leafletMapRef.current = L.map(mapRef.current, {
      center: [51.505, -0.09],
      zoom: 13,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      leafletMapRef.current,
    );

    // leafletMapRef.current.locate({ setView: true });

    // return () => {
    //   if (leafletMapRef.current) {
    //     leafletMapRef.current.remove();
    //     leafletMapRef.current = null;
    //   }
    // };
  }, []);

  return (
    <>
      <div ref={mapRef} id="map" className={styles.map}></div>
    </>
  );
}

export default Map;
