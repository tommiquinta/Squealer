'use client'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import Card from '../Card'
import moment from 'moment'
import { cookies } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function NotificationsCard ({ author, receiver, isDm, time }) {
  const supabase = createClientComponentClient({ cookies })
  const router = useRouter()
  var date = new Date(time)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  var formattedTime = date.toLocaleDateString(undefined, options)

  async function openNotification () {
    supabase
      .rpc('delete_notifications', {
        receiver_uuid: receiver,
        author_uuid: author
      })
      .then(response => {})
      .catch(error => {
        console.error('Errore nella chiamata a supabase.rpc:', error)
      })

    router.push('/messages/' + author.username)
  }
  return (
    <div className=' hover:shadow' onClick={openNotification}>
      <Card>
        <div>
          <div className='flex'>
            <Link href={'/profiles/' + author.username}>
              <p className='text-blue-500 hover:underline font-semibold'>
                {author.username}
              </p>
            </Link>
            {isDm && <p> &#160;sent you a direct message</p>}{' '}
          </div>
          <p className='text-gray-500 text-sm'>
            {date.getHours() + ':' + date.getMinutes() + ', ' + formattedTime}
          </p>
        </div>
      </Card>
    </div>
  )
}
