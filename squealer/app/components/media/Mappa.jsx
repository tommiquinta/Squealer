'use client'

import LogicMap from './LogicMap'
import { useMapContext } from '../../context/MapContext'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const Mappa = ({ supMap, caller }) => {

  const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
  const { position: center, setPosition } = useMapContext()
  const [flag] = useState(caller === 'form' ? false : true)

  if (caller === 'postcard') {
    setPosition(supMap)
  }

  console.log(caller, 'caller');
  useEffect(() => {
    console.log(flag);
  }, [flag]);


  return (
    <div className='map-container w-96 h-96'>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} >
        <LogicMap flag={true} />
      </MapContainer>
    </div>
  )
}

export default Mappa