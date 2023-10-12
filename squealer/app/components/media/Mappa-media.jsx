'use client'

import LogicMap from './LogicMap'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const MappaMedia = ({ supPos }) => {

    const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })

    return (
        <div className='map-container w-96 h-96'>
            <MapContainer center={supPos} zoom={13} scrollWheelZoom={true} >
                <LogicMap />
            </MapContainer>
        </div>
    )
}

export default MappaMedia