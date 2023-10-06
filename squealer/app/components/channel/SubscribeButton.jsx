'use client'

import { useState } from 'react'
import { subscribe } from '../../../helper/channelServerAction'
import { unsubscribe } from '../../../helper/channelServerAction'

function SubscribeButton ({ channel_id, isSubscribed }) {
  async function handleSubscription () {
    console.log(isSubscribed)
    if (!isSubscribed) {
      await subscribe(channel_id)
      location.reload()
    } else {
      await unsubscribe(channel_id)
      location.reload()
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubscription()
      }}
    >
      {!isSubscribed ? (
        <div>
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-1 rounded-md'
          >
            Subscribe
          </button>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400'>
            Subscribe to this channel to be able to share and read squeals.
          </p>
        </div>
      ) : (
        <div>
          <button
            type='submit'
            className='bg-gray-200 text-grey px-6 py-1 rounded-md'
          >
            Unsubscribe
          </button>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400' />
        </div>
      )}
    </form>
  )
}
export default SubscribeButton
