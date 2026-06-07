async function showMap() {
  const mapSection = document.getElementById("map");
  const coords = {
    latitude: +mapSection.dataset.lat,
    longitude: +mapSection.dataset.lng,
  };

  const mapModule = import('./map-builder');
  const mapBuilder = new mapModule.MapBuilder(coords, "map", 16);
  const marker = mapBuilder.createMarker(coords);
}

showMap();

