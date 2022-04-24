

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.110558, 42.373611],
    zoom: 13
});

var marker = new mapboxgl.Marker();


async function move(){
  const busData = await getBusData();
  let locations = [];
  locations.push(busData.data[2].attributes.longitude);
  locations.push(busData.data[2].attributes.latitude);
  moveMarker(locations);
  setTimeout(move, 5000);
}

async function getBusData() {
  const response = await fetch('https://api-v3.mbta.com/vehicles');
  const json     = await response.json();
  return json;
}


function moveMarker(locations) {
  marker.setLngLat([locations[0], locations[1]]).addTo(map);
}