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
      console.error("Errore nella query del profilo dell'autore", error)
      return null
    }
    const info = data[0]
    return info
  }

  async function getReceiver (receiver_uuid) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', receiver_uuid)

    if (error) {
      console.error("Errore nella query del profilo dell'autore", error)
      return null
    }
    const info = data[0]
    return info
  }

  return (
    <div className='w-[85%]'>
      {children}
      <div className='w-full flex relative ml-[230px] flex-col'>
        {notifications.data.length > 0 ? (
          notifications?.data?.map(async notification => {
            const authorInfo = await getAuthor(notification.author) // Attendi la promise
            const receiverInfo = await getReceiver(notification.receiver)
            return (
              <NotificationsCard
                key={notification.id}
                author={authorInfo}
                isDm={notification.message}
                time={notification.created_at}
                receiver={receiverInfo}
              />
            )
          })
        ) : (
          <div className='w-full flex relative ml-[230px] text-gray-400 flex-col mt-10'>
            <p>You are all caught up.</p>
          </div>
        )}
      </div>
    </div>
  )
}
