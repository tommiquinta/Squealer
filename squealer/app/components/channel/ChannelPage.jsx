import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChannelContainer from './ChannelContainer'
import { cookies } from 'next/headers'
import Reaction from '../reaction/Reaction'
import PublicChannelsPost from '../media/PublicChannelsPost'

export default async function ChannelPage ({ channelId, children, user_uuid, isPrivate }) {
  const supabase = createClientComponentClient({ cookies })

  var channelInfo = null; 
  var squeals = null;

  if(user_uuid){
    squeals = await supabase.rpc('get_specific_public_channel_posts', {
      channelid: channelId,
      user_uuid: user_uuid
    })
  } else {
    squeals = await supabase.rpc('get_single_channel', {id_channel : channelId});
  } 

  if(isPrivate){
    channelInfo = await supabase
    .from('private_channels')
    .select('*, channels(handle)')
    .eq('id', channelId);

  } else {
    channelInfo = await supabase
      .from('public_channels')
      .select('*, channels(handle)')
      .eq('id', channelId);
  }


  return (
    <div className='w-[85%]'>
      {children}
      <div className='flex-col'>
        { !user_uuid && (
          <ChannelContainer
          channelInfo={channelInfo?.data[0]}
          channelHandle={channelInfo?.data[0]?.channels.handle}
          squeals={squeals} 
          isPublic={!isPrivate}>

            {squeals?.data?.map(publicPost => (
                <PublicChannelsPost
                  key={publicPost.id}
                  post={publicPost}
                  disableReaction={true}
                />
              ))}

          </ChannelContainer>
        )}

        { user_uuid && (
          <ChannelContainer
          channelInfo={channelInfo?.data[0]}
          channelHandle={channelInfo?.data[0]?.channels.handle}
          squeals={squeals}
          isPublic={!isPrivate}
        ></ChannelContainer>
        )}
      </div>
    </div>
  )
}
