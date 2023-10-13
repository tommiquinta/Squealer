'use client'

import LogicMap from './LogicMap'
import { useMapContext } from '../../context/MapContext'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const Mappa = ({ lat, lng, stile }) => {
  const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false }
  )
  const { position: center } = useMapContext()
  const style = stile ? 'w-full h-full' : 'map-container w-96 h-96'
  let coords = lat && lng ? [lat, lng] : center

  return (
    <div className={style}>
      <MapContainer
        center={coords ? coords : center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <LogicMap flag={stile ? false : true} sup={coords ? coords : center} />
      </MapContainer>
    </div>
  )
}

export default Mappa
