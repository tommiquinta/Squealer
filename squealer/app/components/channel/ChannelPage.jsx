import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChannelContainer from './ChannelContainer'
import { cookies } from 'next/headers'
import Reaction from '../reaction/Reaction'
import PublicChannelsPost from '../media/PublicChannelsPost'
import PublicPostFormCard from '../moderators/PublicPostFormCard'

export default async function ChannelPage ({ channelId, children, user_uuid, isPrivate }) {
  const supabase = createClientComponentClient({ cookies })

  var channelInfo = null; 
  var squeals = null;
  var isModerator = null;

  if(user_uuid){
    squeals = await supabase.rpc('get_specific_public_channel_posts', {
      channelid: channelId,
      user_uuid: user_uuid
    });
    const existModerator = await supabase.from('moderators').select('*').eq('id', user_uuid);
    isModerator = existModerator?.data.length > 0 ? true : false;

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

console.log(isModerator);
  return (
    <div className='w-[85%]'>
      {children}
      <div className='flex-col'>
        { //non loggato e canale pubblico
          !user_uuid && (
          !isPrivate && (
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
          )
        )}

        { //loggato e canale pubblico
          user_uuid && (
          !isPrivate && (
            <ChannelContainer
              channelInfo={channelInfo?.data[0]}
              channelHandle={channelInfo?.data[0]?.channels.handle}
              squeals={squeals} 
              isPublic={!isPrivate}>
                {isModerator && (
                  <div>
                    <PublicPostFormCard channel={channelInfo?.data[0]} handle={channelInfo?.data[0]?.channels.handle}/>
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
        )}

        { //loggato e canale privato
          user_uuid && (
          isPrivate && (   
          <ChannelContainer
          channelInfo={channelInfo?.data[0]}
          channelHandle={channelInfo?.data[0]?.channels.handle}
          squeals={squeals}
          isPublic={!isPrivate}
        ></ChannelContainer>
        ))}

      </div>
    </div>
  )
}
