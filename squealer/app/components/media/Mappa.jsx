'use client'

import LogicMap from './LogicMap'
import { useMapContext } from '../../context/MapContext'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const Mappa = ({ lat, lng, stile }) => {

  const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
  const { position: center } = useMapContext()
  let coords = []
  if (lat && lng) {
    coords = [lat, lng]
  } else {
    coords = center

  }

  const style = stile ? 'w-full h-full' : 'map-container w-96 h-96'

  useEffect(() => {
    if (!stile) {
      console.log(coords, "coords");
      console.log(center, "center");
    }
  }, [coords])

  return (
    <div className={style}>
      <MapContainer center={coords ? coords : center} zoom={13} scrollWheelZoom={true} >
        <LogicMap flag={stile ? false : true} sup={coords ? coords : center} />
      </MapContainer>
    </div>
  )
}

export default Mappa