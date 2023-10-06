'use client'

import Card from '../Card'
import Avatar from '../Avatar'
import PostCard from '../media/PostCard'
import Reaction from '../reaction/Reaction'
import SubscribeButton from './SubscribeButton'

export default function ChannelContainer ({
  channelInfo,
  channelHandle,
  squeals,
  isPublic,
  isSubscribed,
  children
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
        <div className='text-center'>
          {!isPublic && !isSubscribed && (
            <SubscribeButton channel_id={channelInfo.id} isSubscribed={isSubscribed}>
              Subscribe
            </SubscribeButton>
          )}
        </div>
      </Card>

      {isPublic ? (
        children
      ) : isSubscribed ? (
        <div>
          {squeals.data ? (
            <div>
              <div>
                <div className='pb-2 font-sans text-sm text-center text-gray-400'>
                  Here below are gonna be listed all squeals shared to this
                  channel.
                </div>
                {squeals?.data.map(post => (
                  <PostCard key={post.id} post={post}>
                    <Reaction
                      id={post.id}
                      numLikes={post.likes}
                      numDislikes={post.dislikes}
                      hasLiked={post.hasliked}
                      hasDisliked={post.hasdisliked}
                      disable={false}
                      views={post.views}
                    />
                  </PostCard>
                ))}
              </div>
            </div>
          ) : (
            <div className='pb-2 font-sans text-sm text-center text-gray-400'>
              All quite here, for the moment.
            </div>
          )}
        </div>
      ) : (
        <div className='pb-2 font-sans content-center text-sm text-center text-gray-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
          This channel is private.
        </div>
      )}
    </div>
  )
}
