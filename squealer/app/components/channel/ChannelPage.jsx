import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChannelContainer from './ChannelContainer'
import { cookies } from 'next/headers'
import Reaction from '../reaction/Reaction'
import PublicChannelsPost from '../media/PublicChannelsPost'
import PublicPostFormCard from '../moderators/PublicPostFormCard'
import { checkElon, checkKitty } from '../../../helper/automaticMessages.js'

export default async function ChannelPage ({
  channelId,
  children,
  user_uuid,
  isPrivate
}) {
  const supabase = createClientComponentClient({ cookies })

  var channelInfo = null
  var squeals = null
  var isModerator = null
  var isSubscribed = null

  if (isPrivate) {
    channelInfo = await supabase
      .from('private_channels')
      .select('*, channels(handle)')
      .eq('id', channelId)
    isSubscribed = await supabase
      .from('private_channel_subscription')
      .select('*')
      .eq('user_id', user_uuid)
      .eq('channel', channelId)
  } else {
    channelInfo = await supabase
      .from('public_channels')
      .select('*, channels(handle)')
      .eq('id', channelId)
  }

  isSubscribed = isSubscribed?.data.length > 0 ? true : false

  if (!isPrivate) {
    //inserisci controllo: se l'handle è dei gattini o elonmusk e l'ultimo post di questi canali ha più di 24 ore, fai una chiamata

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

  return (
    <div className='w-[85%]'>
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
              ))}ƒ
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
            >
              {isModerator && (
                <div>
                  <PublicPostFormCard
                    channel={channelInfo?.data[0]}
                    handle={channelInfo?.data[0]?.channels.handle}
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
                />
              ))}
            </ChannelContainer>
          )
        }

        {
          //loggato e canale privato
          user_uuid && isPrivate && (
            <ChannelContainer
              channelInfo={channelInfo?.data[0]}
              channelHandle={channelInfo?.data[0]?.channels.handle}
              squeals={squeals}
              isPublic={!isPrivate}
              isSubscribed={isSubscribed}
            ></ChannelContainer>
          )
        }
      </div>
    </div>
  )
}
