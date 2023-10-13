'use client'

import React, { useState, useRef, useMemo } from 'react'
import {
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  useMapEvents
} from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useMapContext } from '../../context/MapContext'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

const MAP_PROVIDERS = {
  google: {
    satellite: 'Google Satellite',
    roadmap: 'Google Roadmap'
  },
  osm: 'OpenStreetMap (Mapnik)',
  yandex: {
    satellite: 'Yandex Satellite',
    roadmap: 'Yandex Roadmap'
  },
  mapbox: 'Mapbox'
}

const tiles = [
  {
    attribution: '&copy; Google',
    name: MAP_PROVIDERS.google.satellite,
    checked: false,
    url: '//mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    crs: L.CRS.EPSG3857
  },
  {
    attribution: '&copy; Google',
    name: MAP_PROVIDERS.google.roadmap,
    checked: true,
    url: '//mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    crs: L.CRS.EPSG3857
  },
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    name: MAP_PROVIDERS.osm,
    checked: false,
    url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    crs: L.CRS.EPSG3857
  },
  {
    attribution: '&copy; Yandex',
    name: MAP_PROVIDERS.yandex.satellite,
    checked: false,
    url: '//sat04.maps.yandex.net/tiles?l=sat&v=3.456.0&x={x}&y={y}&z={z}',
    crs: L.CRS.EPSG3395
  },
  {
    attribution: '&copy; Yandex',
    name: MAP_PROVIDERS.yandex.roadmap,
    checked: false,
    url: ' https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.18-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=ru-RU',
    subdomains: ['01', '02', '03', '04'],
    crs: L.CRS.EPSG3395
  }
]

const LogicMap = ({ flag, sup }) => {
  const markerRef = useRef(null)
  const { position: contextPosition, setPosition } = useMapContext()
  const [markerPosition, setMarkerPosition] = useState(
    sup ? sup : contextPosition
  ) // Stato per la posizione del marker

  const map = useMapEvents({
    click () {
      if (flag) {
        map.locate()
      } else {
        map.flyTo(markerPosition, map.getZoom())
      }
    },
    locationfound (e) {
      if (flag) {
        map.flyTo(e.latlng, map.getZoom())
        setMarkerPosition(e.latlng)
      }
    },
    locationerror () {
      alert(
        'Impossibile trovare la posizione, attiva la geolocalizzazione del tuo dispositivo'
      )
    }
  })

  const eventHandlers = useMemo(
    () => ({
      dragend () {
        const marker = markerRef.current
        if (marker != null) {
          const newMarkerPosition = marker.getLatLng()
          setMarkerPosition(newMarkerPosition) //  Aggiorna lo stato della posizione del marker
        }
      }
    }),
    []
  )

  const handleSavePosition = () => {
    // console.log("position saved", markerPosition)
    setPosition(markerPosition)
    alert('Location loaded.')
  }

  return (
    <>
      <>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <LayersControl position='topleft'>
          {tiles.map(({ attribution, checked, name, subdomains, url }) => {
            const tileLayerProps = {
              attribution,
              url,
              name
            }
            if (subdomains) {
              tileLayerProps.subdomains = subdomains
            }
            return (
              <LayersControl.BaseLayer
                checked={!!checked}
                key={name}
                name={name}
              >
                <TileLayer maxNativeZoom={19} {...tileLayerProps} />
              </LayersControl.BaseLayer>
            )
          })}
        </LayersControl>
      </>
      {/* Aggiungi un marker sulla mappa */}
      <Marker
        position={markerPosition}
        draggable={flag}
        eventHandlers={eventHandlers}
        ref={markerRef}
      >
        {flag === true ? (
          <Popup minWidth={90}>
            <span>
              {markerPosition ? (
                <span>
                  <button onClick={() => handleSavePosition()}>
                    {' '}
                    Salva questa posizione
                  </button>{' '}
                  {/* Pulsante "Salva Posizione" */}
                </span>
              ) : (
                'Posizionamento...'
              )}
            </span>
          </Popup>
        ) : null}
      </Marker>
    </>
  )
}

export default LogicMap
