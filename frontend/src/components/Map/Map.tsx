import styles from "./Map.module.css"
import { useEffect, useRef } from "react";
import L from "leaflet";
import currentLocationIcon from "../../assets/icons/currentLocationIcon.svg"

function Map() {
    
const map: any = useRef<any>(null);

  useEffect(() => {
  // Crea una instancia del mapa dentro del div con id="map",
  // centra la vista en las coordenadas indicadas
  // y establece el nivel inicial de zoom.
  map.current = L.map("map").setView([21.025722, -89.637389], 13);

  // Agrega la capa visual del mapa (tiles).
  // Sin esto solo existiría el contenedor del mapa, pero no se verían calles ni terreno.
  // {z}, {x}, {y} representan las coordenadas de cada mosaico descargado.
  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      // Obligatorio para dar créditos a OpenStreetMap.
      attribution: "&copy; OpenStreetMap contributors",
    }
  ).addTo(map.current);

  // Crea un marcador en las coordenadas indicadas
  // y lo agrega al mapa.
  const marker = L.marker([21.025722, -89.637389]).addTo(map.current);

  // Asocia un popup al marcador.
  // openPopup() hace que aparezca automáticamente al cargar la página.
  // Si lo quitamos, el popup solo aparece al hacer click en el marcador.
  marker
    .bindPopup("<b>Hello world!</b><br>I am a popup.")
    .openPopup();

  // Crea un popup independiente (no ligado a un marcador).
  // Se coloca manualmente en coordenadas específicas.
  const popup = L.popup()
    .setLatLng([21.025722, -89.637389])
    .setContent("I am a standalone popup.")
    .openOn(map.current);

  // Función que se ejecuta cuando el usuario hace click en el mapa.
  // El parámetro e (event) contiene información del evento.
  // e.latlng devuelve las coordenadas exactas donde ocurrió el click.
  function onMapClick(e: any) {
    alert("You clicked the map at " + e.latlng);
  }

  // Suscribe el evento click al objeto map.
  // Cada objeto de Leaflet (mapas, markers, polígonos, etc.)
  // tiene eventos diferentes revisables en la documentación.
  map.current.on("click", onMapClick);

  // Limpieza del componente:
  // elimina la instancia del mapa cuando el componente se desmonta
  // para evitar fugas de memoria o mapas duplicados.
  return () => {
    map.current.remove();
  };
}, []);

function onUserLocationClick() {
map.current.locate({setView: true, maxZoom: 15, enableHighAcuracy: true })

}
   return (
  <div className={styles.container}>
   <div id="map" className={styles.map}></div>
      <button
  className={styles.locationButton}
  onClick={onUserLocationClick}
>
  <img
    src={currentLocationIcon}
    alt="Ubicación actual"
  />
</button>
     
   

   
  </div>
);
}

export default Map