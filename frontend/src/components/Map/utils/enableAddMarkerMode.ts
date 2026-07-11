export default function enableAddMarkerMode(map: L.Map) {
  console.log("addMarkerMode");

  function changeElementCursor() {
    const element = map.getContainer();
    element.style.cursor = "crosshair";
  }

  changeElementCursor();
}
