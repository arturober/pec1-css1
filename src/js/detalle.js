import { MapBuilder } from './map-builder';

function showMap() {
  const mapSection = document.getElementById("map");
  const coords = {
    latitude: +mapSection.dataset.lat,
    longitude: +mapSection.dataset.lng,
  }

  const mapBuilder = new MapBuilder(coords, "map", 16);
  const marker = mapBuilder.createMarker(coords);
}

showMap();