import L from "leaflet";

export default function addTileLayer(map: L.Map) {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}
