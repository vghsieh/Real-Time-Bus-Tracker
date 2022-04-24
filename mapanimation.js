

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.057083, 42.361145],
    zoom: 10
});

var marker = new mapboxgl.Marker()
     .setLngLat ([-71.057083 ,42.361145])
     .addTo(map);


async function move(){
  const busData = await getBusData();
  let locations = [];
  locations.push(busData.data[1].attributes.longitude);
  locations.push(busData.data[1].attributes.latitude);
  moveMarker(locations);
  setTimeout(move, 5000);
}

async function getBusData() {
  const response = await fetch('https://api-v3.mbta.com/vehicles');
  const json     = await response.json();
  return json;
}

function moveMarker(locations) {
  marker.setLngLat([locations[0], locations[1]]);
  marker.addTo(map);
}