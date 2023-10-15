'use server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChannelContainer from './ChannelContainer'
import { cookies } from 'next/headers'
import PublicChannelsPost from '../media/PublicChannelsPost'
import { checkElon } from '../../../helper/automaticMessages.js'
import NotFoundPage from '../profile/noProfileAlert'
import Form from '../media/Form'

export default async function ChannelPage ({
  channelId,
  loggedUserInfo,
  children,
  user_uuid,
  isPrivate,
  userAvatar
}) {
  const supabase = createClientComponentClient({ cookies })

  var userObj = null
  if (user_uuid) {
    userObj = await supabase.rpc('get_logged_user', {
      user_uuid: user_uuid
    })
  }

  var channelInfo = null
  var squeals = null
  var isModerator = null
  var isSubscribed = null
  var hasRequested = null
  var isOwner = null

  if (isPrivate && user_uuid) {
    channelInfo = await supabase
      .from('private_channels')
      .select('*, channels(handle)')
      .eq('id', channelId)
    isSubscribed = await supabase
      .from('private_channel_subscription')
      .select('*')
      .eq('user_id', user_uuid)
      .eq('channel', channelId)
    hasRequested = await supabase
      .from('sub_requests')
      .select('*')
      .eq('user_id', user_uuid)
      .eq('channel', channelId)
    isOwner = await supabase
      .from('private_channels')
      .select('*')
      .eq('creator', loggedUserInfo)
  } else {
    channelInfo = await supabase
      .from('public_channels')
      .select('*, channels(handle)')
      .eq('id', channelId)
  }

  if (!channelInfo.data.length) {
    return <NotFoundPage channel={true}></NotFoundPage>
  }

  isSubscribed = isSubscribed?.data.length > 0 ? true : false
  hasRequested = hasRequested?.data.length > 0 ? true : false
  isOwner = isOwner?.data.length ? true : false

  if (!isPrivate) {
    var channelHandle = channelInfo?.data[0]?.channels.handle
    if (channelHandle == 'ELONTWEET') {
      const result = await checkElon()
      if (!result) {
        alert('Something went wrong')
      }
    }
  }

  if (user_uuid) {
    if (channelHandle == 'CONTROVERSIAL') {
      squeals = await supabase.rpc('get_controversial_with_user', {
        user_uuid: user_uuid
      })
    } else {
      squeals = await supabase.rpc('get_specific_public_channel_posts', {
        channelid: channelId,
        user_uuid: user_uuid
      })
    }

    const existModerator = await supabase
      .from('moderators')
      .select('*')
      .eq('id', user_uuid)
    isModerator = existModerator?.data.length > 0 ? true : false
  } else {
    if (channelHandle == 'CONTROVERSIAL') {
      squeals = await supabase.rpc('get_controversial_general')
    } else {
      squeals = await supabase.rpc('get_single_channel', {
        id_channel: channelId
      })
    }
  }

  const subCounter = await supabase
    .from('private_channel_subscription')
    .select('count')
    .eq('channel', channelId)

  var channel = channelInfo?.data[0]
  var handle = channelInfo?.data[0]?.channels.handle

  return (
    <div className='md:w-[85%]'>
      {children}
      <div className='flex-col'>
        {
          //non loggato e canale pubblico
          !user_uuid && !isPrivate && (
            <ChannelContainer
              channelInfo={channelInfo?.data[0]}
              channelHandle={channelInfo?.data[0]?.channels.handle}
              squeals={squeals}
              isPublic={!isPrivate}
            >
              {squeals?.data?.map(publicPost => (
                <PublicChannelsPost
                  key={publicPost.id}
                  post={publicPost}
                  disableReaction={true}
                />
              ))}
            </ChannelContainer>
          )
        }

        {
          //loggato e canale pubblico
          user_uuid && !isPrivate && (
            <ChannelContainer
              channelInfo={channelInfo?.data[0]}
              channelHandle={channelInfo?.data[0]?.channels.handle}
              squeals={squeals}
              isPublic={!isPrivate}
              userAvatar={userAvatar}
              profile={user_uuid}
            >
              {isModerator && (
                <div>
                  <Form
                    profile={userObj.data ? userObj.data[0] : null}
                    channel={channel}
                    handle={handle}
                    isPrivate={false}
                  />
                  <hr className='mb-5' />
                </div>
              )}

              {squeals?.data?.map(publicPost => (
                <PublicChannelsPost
                  key={publicPost.id}
                  post={publicPost}
                  disableReaction={false}
                  moderator={isModerator}
                  userAvatar={userAvatar}
                  profile={user_uuid}
                />
              ))}
            </ChannelContainer>
          )
        }

        {
          //loggato e privato
          user_uuid && isPrivate && (
            <ChannelContainer
              channelInfo={channelInfo?.data[0]}
              channelHandle={channelInfo?.data[0]?.channels.handle}
              squeals={squeals}
              isPublic={!isPrivate}
              isSubscribed={isSubscribed}
              isOwner={isOwner}
              hasRequested={hasRequested}
              subCounter={subCounter?.data[0].count}
              userAvatar={userAvatar}
              profile={user_uuid}
            >
              <div>
                <Form
                  profile={userObj.data ? userObj.data[0] : null}
                  channel={channel}
                  handle={handle}
                  isPrivate={true}
                />
                <hr className='mb-5' />
              </div>
            </ChannelContainer>
          )
        }
      </div>
    </div>
  )
}
