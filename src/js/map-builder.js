export class MapBuilder {
  #map;
  #view;
  #vectorLayer;

  constructor(
    { latitude, longitude },
    divMapId,
    zoom = 14
  ) {
    useGeographic();

    this.#view = new View({
      center: [longitude, latitude],
      zoom,
    });

    this.#map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: divMapId,
      view: this.#view,
    });

    this.#vectorLayer = new VectorLayer<VectorSource>({
      map: this.#map,
      source: new VectorSource<Feature<Geometry>>({
        features: [],
      }),
    });
  }

  get view() {
    return this.#view;
  }

  createMarker(
    { latitude, longitude },
    color = "#3399CC",
    fill = "#fff"
  ) {
    const positionFeature = new Feature({
      geometry: new Point([longitude, latitude]),
    });
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 9,
          fill: new Fill({
            color: color,
          }),
          stroke: new Stroke({
            color: fill,
            width: 3,
          }),
        }),
      })
    );

    this.#vectorLayer.getSource()?.addFeature(positionFeature);

    return positionFeature;
  }
}
