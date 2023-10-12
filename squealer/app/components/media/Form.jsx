"use client"

import React, { useEffect, useState } from 'react'
import PostFormCard from './PostFormCard'
import dynamic from 'next/dynamic'
import { MapProvider } from '../../context/MapContext'


const Form = ({ profile, onPost, isDM, DM_receiver }) => {

    const Mappa = dynamic(() => import('./Mappa'), { ssr: false })
    const [showMap, setShowMap] = useState(false)

    const changeMap = () => { setShowMap(!showMap) }

    return (
        <div className='mb-5'>
            <MapProvider>
                <PostFormCard
                    profile={profile}
                    isDM={isDM}
                    DM_receiver={DM_receiver}
                    changeMap={changeMap}
                    showMap={showMap}
                    onPost={onPost}
                />
                {showMap ? <Mappa caller='inserimento' /> : null}
            </MapProvider>
        </div>
    )
}

export default Form
