'use client'
import { useState } from 'react'
import PrivChannelsList from './PrivChannelsList'
import PrivChannelsFilter from './PrivChannelsFilter'


export default function PrivateChannelContainer ({
  channels
}) {
  const [withFilter, setWithFilter] = useState(false)
  const [byCreator, setByCreator] = useState(null)
  const [byPostsNum, setByPostsNum] = useState(null)

  function filters (username, posts) {

    if (username === '' && posts == '') {
      setWithFilter(false)
      setByCreator(null)
      setByPostsNum(null)
    } else {
      setWithFilter(true)
      setByCreator(username)
      setByPostsNum(posts);
    }
  }

  return (
    <div className='flex w-full flex-col md:flex-row'>
      <PrivChannelsList channels={channels.data} hasFilter={withFilter} byName={byCreator} byPosts={byPostsNum}/>
      <PrivChannelsFilter filter={filters} />
    </div>
  )
}
