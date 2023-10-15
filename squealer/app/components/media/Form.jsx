'use client'

import React, { useEffect, useState } from 'react'
import PostFormCard from './PostFormCard'
import dynamic from 'next/dynamic'
import { MapProvider } from '../../context/MapContext'
import PublicPostFormCard from '../moderators/PublicPostFormCard'

const Form = ({
  profile,
  onPost,
  isDM,
  DM_receiver,
  isPrivate,
  channel,
  handle,
  isHome
}) => {
  const Mappa = dynamic(() => import('./Mappa'), { ssr: false })
  const [showMap, setShowMap] = useState(false)

  const changeMap = () => {
    setShowMap(!showMap)
  }

  if (isHome) {
    return (
      <MapProvider>
        <PostFormCard
          isDM={isDM}
          DM_receiver={DM_receiver}
          changeMap={changeMap}
          showMap={showMap}
          onPost={onPost}
          profile={profile}
          channel={channel}
          handle={handle}
          isPrivate={true}
          isHome={true}
        />
        {showMap ? <Mappa caller='inserimento' /> : null}
      </MapProvider>
    )
  }

  return (
    <div className='mb-5'>
      {isPrivate ? (
        <MapProvider>
          <PostFormCard
            profile={profile}
            isDM={isDM}
            DM_receiver={DM_receiver}
            changeMap={changeMap}
            showMap={showMap}
            onPost={onPost}
            channel={channel}
            handle={handle}
            isPrivate={true}
          />
          {showMap ? <Mappa caller='inserimento' /> : null}
        </MapProvider>
      ) : (
        <MapProvider>
          <PostFormCard
            isDM={isDM}
            DM_receiver={DM_receiver}
            changeMap={changeMap}
            showMap={showMap}
            onPost={onPost}
            profile={profile}
            channel={channel}
            handle={handle}
            isPrivate={false}
          />
          {showMap ? <Mappa caller='inserimento' /> : null}
        </MapProvider>
      )}
    </div>
  )
}

export default Form
