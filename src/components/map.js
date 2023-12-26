import { setCenter } from './ui.js';
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
function initMap(territoryArray, territoryName, zoom = 14) {
  const territoryBool = territoryName === 'All Territories';

  if (map) {
    map.removeObjects(map.getObjects());
    setCenter(territoryArray, territoryBool, map);
    map.setZoom(zoom);
  } else {
    map = new H.Map(
      document.querySelector('#map'),
      defaultLayers.vector.normal.map,
      {
        zoom,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    setCenter(territoryArray, territoryBool, map);

    ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
    ui.setUnitSystem('imperial');
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }

  addMarkersToMap(territoryArray);
  return map;
}

// Add markers to the map
async function addMarkersToMap(customers) {
  let group = new H.map.Group();
  try {
    await customers.forEach(customer => {
      const customerLat = parseFloat(customer[38].value);
      const customerLng = parseFloat(customer[39].value);
      const hex = customer[42].value;
      const icon = addIcon(hex, 'o_65', 24, 24);
      const customerMarker = new H.map.Marker(
        { lat: customerLat, lng: customerLng },
        { icon: icon }
      );

      const firstName = customer[11].value;
      const lastName = customer[13].value;
      const address_1 = customer[30].value;
      const company = customer[22].value;
      const phone = customer[17].value;
      const territory = customer[40].value;
      const linkToCustomer = customer[43].value;

      const bubbleHtml = `
        <div>
          <b>${firstName} ${lastName}</b><br>
          <b>${company}</b><br>
          <b>${phone}</b><br>
          <b>${address_1}</b><br>
          <b>${territory}</b><br>
          <hr>
          <b><a href="${linkToCustomer}" target="_blank">Weblink</a></b>
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
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

export { initMap };
