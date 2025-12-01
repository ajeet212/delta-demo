const MAPTITLER_KEY = mapTOKEN;

let mapdeta;
if (coordinates && coordinates !== "null") {
  try {
    mapdeta = JSON.parse(coordinates);
  } catch (error) {
    mapdeta = [77.209, 28.6139];
  }
} else {
  mapdeta = [77.209, 28.6139];
}

console.log("parsed coordinates :", mapdeta);
const map = new maplibregl.Map({
  container: "map",
  style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTITLER_KEY}`, // OSM style
  center: mapdeta, // Example: Delhi
  zoom: 7,
});

const marker = new maplibregl.Marker({ color: "red" })
  .setLngLat(mapdeta)
  .setPopup(
    new maplibregl.Popup({ offset: 25, closeOnClick: false }).setHTML(
      "<p>Exact Location After Booking!</p>"
    )
  )
  .addTo(map);

// "https://demotiles.maplibre.org/globe.json"
