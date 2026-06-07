async function showMap() {
  const mapSection = document.getElementById("map");
  const coords = {
    latitude: +mapSection.dataset.lat,
    longitude: +mapSection.dataset.lng,
  };

  const mapModule = await import('./map-builder');
  const mapBuilder = new mapModule.MapBuilder(coords, "map", 16);
  const marker = mapBuilder.createMarker(coords);
}

const mapSection = document.getElementById("map");

if (mapSection) {
  const mapObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showMap(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px 300px 0px",
    threshold: 0
  });

  mapObserver.observe(mapSection);
}