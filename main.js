import './style.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Point from 'ol/geom/Point.js';
import OSM from 'ol/source/OSM';

import {Icon, Style} from 'ol/style.js';
import {OGCMapTile, Vector as VectorSource, Cluster} from 'ol/source.js';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Text,
} from 'ol/style.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';


const adam = new Feature({
  geometry: new Point(fromLonLat([-80.598,28.388])),
  name: 'Adam',
});

const annie = new Feature({
  geometry: new Point(fromLonLat([-115.2739, 36.2377])),
  name: 'Annie',
});

const andrewj = new Feature({
  geometry: new Point(fromLonLat([-122.520861, 37.9233578])),
  name: 'Andrew Ji',
});

const test1 = new Feature({
  geometry: new Point(fromLonLat([-120.66082, 35.30064])),
  name: 'SLO Resident',
});

const test2 = new Feature({
  geometry: new Point(fromLonLat([-120.6619, 35.2764])),
  name: 'SLO Resident',
});

// adam.setStyle(
//   new Style({
//     image: new Icon({
//       anchor: [0.5, 0.5],
//       anchorXUnits: 'fraction',
//       anchorYUnits: 'fraction',
//       width: 40,
//       height: 40,
//       src: 'dist/icon.ico',
//     }),
//   }),
// );

const vectorSource = new VectorSource({
  features: [adam, annie, andrewj, test1, test2],
});

const clusterSource = new Cluster({
  distance: 100,
  minDistance: 50,
  source: vectorSource,
});

const styleCache = {};
const vectorLayer = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 13 + 4*size,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399' + (255-Math.min(size*63, 255)).toString(16).padStart(2, '0'),
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    center: fromLonLat([-120.660820, 35.300640]),
    zoom: 4
  })
});