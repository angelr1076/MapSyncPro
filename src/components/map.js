import '../styles/style.css';

const platform = new H.service.Platform({
  apikey: process.env.API_KEY,
  useHTTPS: true,
});

const defaultLayers = platform.createDefaultLayers();
let map;

// Function to set the map based on chosen territory
function initMap(chosenTerritory) {
  map = new H.Map(
    document.querySelector('#map'),
    defaultLayers.vector.normal.map,
    {
      center: { lat: chosenTerritory.lat, lng: chosenTerritory.long },
      zoom: 10, // Default zoom
      pixelRatio: window.devicePixelRatio || 1,
    }
  );

  const ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
  ui.setUnitSystem('imperial');

  window.addEventListener('resize', () => map.getViewPort().resize());
  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
}

export { initMap };
