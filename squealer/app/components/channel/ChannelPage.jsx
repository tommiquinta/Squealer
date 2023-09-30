import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ChannelContainer from './ChannelContainer'
import { cookies } from 'next/headers'
import PostCard from '../media/PostCard'

export default async function ChannelPage({ channelId, children, user_uuid }) {
  var channelInfo = null
  var channelHandle = null
  const supabase = createClientComponentClient({ cookies })

  try {
    if (channelId) {
      channelInfo = await supabase
        .from('public_channels')
        .select()
        .eq('id', channelId)
      channelInfo = channelInfo.data[0]
    }
  } catch (error) {
    return <p>Error! {error}</p>
  }

  try {
    if (channelId) {
      channelHandle = await supabase
        .from('channels')
        .select()
        .eq('id', channelId)
      channelHandle = channelHandle.data[0].handle
    }
  } catch (error) {
    return <p>Error! {error}</p>
  }

  var squeals = null
  squeals = await supabase.rpc('get_specific_public_channel_posts', {
    channelid: channelId,
    user_uuid: user_uuid
  })
  console.log(squeals)

    return (
      <div className='w-[85%]'>
        {children}
        <div className='flex-col'>
          <ChannelContainer
            channelInfo={channelInfo}
            channelHandle={channelHandle}
            squeals={squeals}
          ></ChannelContainer>
          
        </div>
      </div>
    )
 
}
