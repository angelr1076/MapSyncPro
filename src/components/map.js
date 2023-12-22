import '../styles/style.css';

// HERE Map
const platform = new H.service.Platform({
  apikey: process.env.API_KEY,
  useHTTPS: true,
});
const defaultLayers = platform.createDefaultLayers();
let map, ui, behavior;

function addIcon(color, opacity = 'o_100', w = 32, h = 32) {
  return new H.map.Icon(
    `https://res.cloudinary.com/ethos-outcomes/image/upload/e_colorize,co_rgb:${color},${opacity}/v1633964571/esp/ethos-blue-marker.png`,
    { size: { w, h } }
  );
}

// Initialize HERE Map
function initMap(chosenTerritory, zoom = 14) {
  const lat = parseFloat(chosenTerritory.lat);
  const lng = parseFloat(chosenTerritory.long);

  if (map) {
    // Clear existing markers
    map.removeObjects(map.getObjects());

    // Re-center the map to the new territory
    map.setCenter({ lat, lng });
    map.setZoom(zoom);
  } else {
    // Initialize the map if it doesn't exist
    map = new H.Map(
      document.querySelector('#map'),
      defaultLayers.vector.normal.map,
      {
        center: { lat, lng },
        zoom,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
    ui.setUnitSystem('imperial');
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }

  addMarkersToMap(chosenTerritory.addresses);
}

// Add markers to the map
function addMarkersToMap(customers) {
  let group = new H.map.Group();

  customers.forEach(customer => {
    const icon = addIcon(customer.hex, 'o_65', 24, 24);
    const customerLat = parseFloat(customer.lat);
    const customerLng = parseFloat(customer.lng);
    const customerMarker = new H.map.Marker(
      { lat: customerLat, lng: customerLng },
      { icon: icon }
    );

    const bubbleHtml = `
      <div>
        <b>${customer.customerName}</b><br>
        <b>${customer.customerAddress}</b><br>
        <b>${customer.zip}</b><br>
        <b>${customer.territory}</b><br>
        <hr>
        <b><a href="${customer.linkToCustomer}" target="_blank">Weblink</a></b> 
      </div>`;

    customerMarker.setData(bubbleHtml);
    group.addObject(customerMarker);

    // Re-center the map when a marker is tapped
    customerMarker.addEventListener('tap', function (evt) {
      const bubble = new H.ui.InfoBubble(
        { lat: customerLat, lng: customerLng },
        {
          content: evt.target.getData(),
        }
      );

      ui.getBubbles().forEach(bub => ui.removeBubble(bub));
      ui.addBubble(bubble);

      // Move the map center to the marker's position
      map.setCenter({ lat: customerLat, lng: customerLng }, true);
    });
  });

  map.addObject(group);
}

export { initMap };
