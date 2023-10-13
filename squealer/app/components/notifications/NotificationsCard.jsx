'use client'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import Card from '../Card'
import { cookies } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function NotificationsCard ({
  id,
  author,
  receiver,
  isDm,
  sub_request,
  channel_info,
  time
}) {
  const supabase = createClientComponentClient({ cookies })
  const router = useRouter()
  var date = new Date(time)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  //console.log(channel_info.channsels.handle)
  var formattedTime = date.toLocaleDateString(undefined, options)

  async function openNotification () {
    if (isDm) {
      supabase
        .rpc('delete_notifications', {
          receiver_uuid: receiver.id,
          author_uuid: author.id
        })
        .then(response => {})
        .catch(error => {
          console.error('Errore nella chiamata a supabase.rpc:', error)
        })

      router.push('/messages/' + author.username)
    }
  }
  async function acceptRequest () {
    await supabase
      .rpc('subscribe', {
        user_id: author.id,
        channel_id: channel_info.id
      })
      .then(declineRequest())
      .catch(error => {
        console.error('Errore nella chiamata a supabase.rpc:', error)
      })
  }
  async function declineRequest () {
    await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .then(await supabase.from('sub_requests').delete().eq('id', sub_request))

    location.reload()
  }

  return (
    <div className='hover:shadow'>
      <Card>
        <div>
          <div className='flex' onClick={openNotification}>
            {/* notifica messaggio diretto */}
            {isDm && (
              <Link href={'/profiles/' + author.username}>
                <p className='text-blue-500 hover:underline font-semibold my-3'>
                  {author.username}
                </p>
              </Link>
            )}
            {isDm && <p className='my-3'> &#160;sent you a direct message.</p>}

            {/* notifica richiesta inesso canale */}

            {sub_request && (
              <div className='flex items-center'>
                <Link href={'/profiles/' + author.username}>
                  <p className='text-blue-500 hover:underline font-semibold'>
                    {author.username}
                  </p>
                </Link>
                &#160;would like to be part of your channel&#160;
                <a> §{channel_info.channels.handle}</a>.
                <div className='flex'>
                  <button
                    className='rounded-full w-8 h-8 bg-green-500 flex m-2 items-center justify-center text-white'
                    onClick={acceptRequest}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </button>

                  <button
                    className='rounded-full w-8 h-8 bg-red-500 flex m-2 items-center justify-center text-white'
                    onClick={declineRequest}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className='text-gray-500 text-sm'>
            {date.getHours() + ':' + date.getMinutes() + ', ' + formattedTime}
          </p>
        </div>
      </Card>
    </div>
  )
}
