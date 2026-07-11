export default function locateUser(map: L.Map) {
  map.locate({
    setView: true,
    maxZoom: 15.5,
  });
}
