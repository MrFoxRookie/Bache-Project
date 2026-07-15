function setCursor(map: L.Map, cursor: string) {
  map.getContainer().style.cursor = cursor;
}

export function enableAddMarkerMode(map: L.Map) {
  console.log("enable");
  setCursor(map, "crosshair");
}

export function disableAddMarkerMode(map: L.Map) {
  console.log("disable");
  setCursor(map, "");
}
