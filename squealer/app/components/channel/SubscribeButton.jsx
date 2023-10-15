'use client'

import { request_sub, unsubscribe } from '../../../helper/channelServerAction'

function SubscribeButton ({ channel_id, isSubscribed, hasRequested, isOwner }) {
  async function handleSubscription () {
    console.log(hasRequested)
    if (!isSubscribed) {
      await request_sub(channel_id)
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
      {isOwner ? (
        <div>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400'>
            You are the owner of this channel.
          </p>
        </div>
      ) : isSubscribed ? (
        <div>
          <button
            type='submit'
            className='bg-gray-200 text-grey px-6 py-1 rounded-md'
          >
            Unsubscribe
          </button>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400' />
        </div>
      ) : hasRequested ? (
        <div>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400'>
            Your subscription request is pending approval.
          </p>
        </div>
      ) : (
        <div>
          <button
            type='submit'
            className='bg-blue-500 text-white px-6 py-1 rounded-md'
          >
            Request subscription
          </button>
          <p className='pt-2 pb-2 font-sans text-sm text-center text-gray-400'>
            Subscribe to this channel to be able to share and read squeals.
          </p>
        </div>
      )}
    </form>
  )
}
export default SubscribeButton
