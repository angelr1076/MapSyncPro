const platform = new H.service.Platform({
  apikey: process.env.API_KEY,
  useHTTPS: true,
});

const defaultLayers = platform.createDefaultLayers();
let map, ui, behavior;

// Function to initialize the map
function initializeMap() {
  map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
      center: { lat: 33.158093, lng: -117.350594 }, // Default center
      zoom: 10, // Default zoom
      pixelRatio: window.devicePixelRatio || 1,
    }
  );

  behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  ui = H.ui.UI.createDefault(map, defaultLayers);
}

// Function to update the map based on chosen territory
function updateMap(chosenTerritory) {
  map.setCenter({
    lat: parseFloat(chosenTerritory.lat),
    lng: parseFloat(chosenTerritory.long),
  });
  map.setZoom(10); // Adjust zoom level as needed
}

export { initializeMap, updateMap };
