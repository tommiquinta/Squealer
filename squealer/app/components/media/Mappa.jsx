"use client"

import { MapContainer, Marker, Popup, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// serve a prendere le iconde di leaflet che per qualche stracazzo di oscura ragione non venivano caricate
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

const MAP_PROVIDERS = {
  google: {
    satellite: "Google Satellite",
    roadmap: "Google Roadmap"
  },
  osm: "OpenStreetMap (Mapnik)",
  yandex: {
    satellite: "Yandex Satellite",
    roadmap: "Yandex Roadmap"
  },
  mapbox: "Mapbox"
};

const tiles = [
  {
    attribution: "&copy; Google",
    name: MAP_PROVIDERS.google.satellite,
    checked: false,
    url: "//mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    crs: L.CRS.EPSG3857
  },
  {
    attribution: "&copy; Google",
    name: MAP_PROVIDERS.google.roadmap,
    checked: true,
    url: "//mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    crs: L.CRS.EPSG3857
  },
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    name: MAP_PROVIDERS.osm,
    checked: false,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    crs: L.CRS.EPSG3857
  },
  {
    attribution: "&copy; Yandex",
    name: MAP_PROVIDERS.yandex.satellite,
    checked: false,
    url: "//sat04.maps.yandex.net/tiles?l=sat&v=3.456.0&x={x}&y={y}&z={z}",
    crs: L.CRS.EPSG3395
  },
  {
    attribution: "&copy; Yandex",
    name: MAP_PROVIDERS.yandex.roadmap,
    checked: false,
    url:
      " https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.18-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=ru-RU",
    subdomains: ["01", "02", "03", "04"],
    crs: L.CRS.EPSG3395
  }
];

const Mappa = () => {

  return (

    <div className='map-container w-96 h-96'>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topleft">
          {tiles.map(({ attribution, checked, name, subdomains, url }) => {
            const tileLayerProps = {
              attribution,
              url,
              name
            };
            if (subdomains) {
              tileLayerProps.subdomains = subdomains;
            }
            return (
              <LayersControl.BaseLayer
                checked={!!checked}
                key={name}
                name={name}
              >
                <TileLayer maxNativeZoom={19} {...tileLayerProps} />
              </LayersControl.BaseLayer>
            );
          })}
        </LayersControl>

        {/* Aggiungi un marker sulla mappa */}
        <Marker position={[51.505, -0.09]} draggable={true}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Mappa