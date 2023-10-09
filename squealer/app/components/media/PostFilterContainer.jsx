'use client'
import { useState } from 'react'
import PostList from './PostList'
import PostFilter from './PostFilter'

export default function PostFilterContainer ({
  allSqueals,
  loggedUser,
  channels
}) {
  const [withFilter, setWithFilter] = useState(false)
  const [byChannel, setByChannel] = useState(null)
  const [byContent, setByContent] = useState(null)

  function filters (text, channelId) {
    if (text === '' && channelId == 'All channels') {
      setWithFilter(false)
      setByContent(null)
      setByChannel(null)
    } else {
      setWithFilter(true)
      setByContent(text)
      if (channelId == 'All channels') {
        setByChannel(null)
      } else setByChannel(channelId)
    }
  }

  return (
    <div className='flex'>
      <PostList
        squeals={allSqueals}
        loggedUser={loggedUser}
        hasFilter={withFilter}
        filterByChannel={byChannel}
        filterByContent={byContent}
      />
      <PostFilter insertFilters={filters} channelsList={channels} />
    </div>
  )
}
