'use client'

import LogicMap from './LogicMap'
import { useMapContext } from '../../context/MapContext'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const Mappa = ({ coords }) => {

  const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
  const { position: center } = useMapContext()

  return (
    <div className='map-container w-96 h-96'>
      <MapContainer center={coords ? coords : center} zoom={13} scrollWheelZoom={true} >
        <LogicMap flag={coords ? false : true} />
      </MapContainer>
    </div>
  )
}

export default Mappa