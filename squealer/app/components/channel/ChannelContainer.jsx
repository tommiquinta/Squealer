'use client'

import Card from '../Card'
import Avatar from '../Avatar'
import PostCard from '../media/PostCard'

export default function ChannelContainer ({
  channelInfo,
  channelHandle,
  squeals
}) {
  return (
    <div className='ml-8 left-1/4 relative'>
      <Card noPadding={true}>
        {/* banner */}
        <div className='h-40 overflow-hidden flex justify-center items-center rounded-md'>
          <img src={channelInfo?.banner} />
        </div>
        <div className='absolute top-28 left-1/2 transform -translate-x-1/2 rounded-full bg-white border-8 border-white'>
          <Avatar size={'big'} url={channelInfo?.avatar} />
        </div>
        <div className='pt-16 pb-2 font-sans text-4xl font-semibold text-center text-gray-800'>
          {channelInfo?.name}
        </div>
        <div className='pb-1 font-sans text-xl text-center text-gray-500'>
          §{channelHandle}
        </div>
        <div className='pb-2 font-sans text-lg text-center text-gray-400'>
          2k iscritti - still to handle
        </div>
        <hr />
        <div className='pt-2 pb-2 font-sans text-md text-center text-gray-400'>
          {channelInfo?.description}
        </div>
      </Card>
      {squeals.data ? (
        <div>
          <div className='pb-2 font-sans text-sm text-center text-gray-400'>
            Here below are gonna be listed all squeals shared to this channel.
          </div>
          <div>
            {squeals?.data.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
         <div className='pb-2 font-sans text-sm text-center text-gray-400'>
          All quite here, for the moment.
        </div>
      )}
    </div>
  )
}
