'use client'
import { useState } from 'react'
import ChannelFilter from './ChannelFilter'
import ChannelsList from './ChannelsList'

export default function ChannelsFilterContainer ({ channels }) {
  const [hasFilter, setHasFilter] = useState(false)
  const [name, setName] = useState(null)

  function search (byName) {
    setName(byName === '' ? null : byName)

    if (name == null) {
      setHasFilter(false)
    } else {
      setHasFilter(true)
    }
  }

  return (
    <div className='w-11/12 md:w-full flex relative mx-auto md:mx-3 md:ml-[240px] flex-col gap-4 items-center md:items-start'>
      <ChannelFilter filter={search} />
      <ChannelsList
        channels={channels.data}
        hasFilter={hasFilter}
        nameFilter={name}
      />
    </div>
  )
}
