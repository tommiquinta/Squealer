import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NotificationsCard from '../notifications/NotificationsCard'
import { cookies } from 'next/headers'

export default async function NotificationsPage ({ notifications, children }) {
  const supabase = createClientComponentClient({ cookies })

  async function getAuthor (author_uuid) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', author_uuid)

    if (error) {
      console.error("Errore nella query del profilo dell'autore1", error)
      return null
    }

    const info = data && data.length > 0 ? data[0] : null
    return info
  }

  async function getReceiver (receiver_uuid) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', receiver_uuid)

    if (error) {
      console.error("Errore nella query del profilo dell'autore2", error)
      return null
    }
    const info = data && data.length > 0 ? data[0] : null
    return info
  }

  async function getChannelInfo (sub_request) {
    if (!sub_request) {
      return null
    }
    console.log(sub_request)
    const channelId = await getChannelId(sub_request)
    const { data, error } = await supabase
      .from('private_channels')
      .select('*, channels(handle)')
      .eq('id', channelId)
    if (error) {
      console.error("Errore nella query del profilo dell'autore3", error)
      return null
    }
    const info = data && data.length > 0 ? data[0] : null
    return info
  }

  async function getChannelId (sub_request) {
    if (!sub_request) {
      return null
    } else {
      console.log(sub_request)
      const { data, error } = await supabase
        .from('sub_requests')
        .select('channel')
        .eq('id', sub_request)

      if (error) {
        console.error("Errore nella query del profilo dell'autore4", error)
        return null
      }
      const info = data[0]
      console.log(info)
      return info.channel
    }
  }

  return (
    <div className='md:w-[85%]'>
      <div>{children}</div>
      <div className='w-3/4 mx-auto md:mx-[unset] md:w-[85%] flex relative md:ml-[230px] flex-col'>
        {notifications.data.length > 0 ? (
          notifications?.data?.map(async notification => {
            const authorInfo = await getAuthor(notification.author) // Attendi la promise
            const receiverInfo = await getReceiver(notification.receiver)
            const channelInfo = await getChannelInfo(notification.sub_request)
            return (
              <div key={notification.id}>
                <NotificationsCard
                  id={notification.id}
                  author={authorInfo}
                  isDm={notification.message}
                  time={notification.created_at}
                  receiver={receiverInfo}
                  sub_request={notification.sub_request}
                  channel_info={channelInfo}
                />
              </div>
            )
          })
        ) : (
          <div className='w-full flex relative text-center md:ml-[230px] text-gray-400 flex-col mt-10'>
            <p>You are all caught up.</p>
          </div>
        )}
      </div>
    </div>
  )
}
