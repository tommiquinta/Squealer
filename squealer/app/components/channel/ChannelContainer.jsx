'use client'

import Card from '../Card'
import Avatar from '../Avatar'
import PostCard from '../media/PostCard'
import Reaction from '../reaction/Reaction'
import SubscribeButton from './SubscribeButton'
import PostFormCard from '../media/PostFormCard'

export default function ChannelContainer ({
  channelInfo,
  channelHandle,
  squeals,
  isPublic,
  isSubscribed,
  hasRequested,
  isOwner,
  profile,
  subCounter,
  userAvatar,
  children
}) {
  return (
    <div className=' ml-2 mr-2 md:ml-8 md:left-1/4 relative'>
      <Card noPadding={true}>
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
          {!isPublic && `${subCounter} subscribers`}
        </div>
        <hr />
        <div className='pt-2 pb-2 font-sans text-md text-center text-gray-400'>
          {channelInfo?.description}
        </div>
        <div className='text-center'>
          {!isPublic && (
            <SubscribeButton
              channel_id={channelInfo.id}
              isSubscribed={isSubscribed}
              hasRequested={hasRequested}
              isOwner={isOwner}
            >
              Subscribe
            </SubscribeButton>
          )}
        </div>
      </Card>

      {isPublic ? (
        children
      ) : isSubscribed ? (
        <div>
          {children}
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
                      profile={profile}
                      avatar={userAvatar}
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
        <div className='pb-2 font-sans content-center text-sm text-center text-gray-400 flex-col flex items-center'>
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
