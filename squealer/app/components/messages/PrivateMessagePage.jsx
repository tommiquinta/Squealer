'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import PrivateMessageContainer from './PrivateMessageContainer'
import { cookies } from 'next/navigation'
import PostFormCard from '../media/PostFormCard'
import Card from '../Card'
import Avatar from '../Avatar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MapProvider } from '../../context/MapContext'
import Form from '../media/Form'

export default function PrivateMessagePage ({
  user_uuid,
  reveiver_uuid,
  receiver_handle,
  recevier_info,
  children
}) {
  const supabase = createClientComponentClient({ cookies })

  const [squeals, setSqueals] = useState([])
  const [userObj, setUserObj] = useState([])

  useEffect(() => {
    /*  const elementToScrollTo = document.getElementById('end')
    elementToScrollTo.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'nearest'
    }) */

    if (squeals.length === 0) {
      supabase
        .rpc('get_private_messages', {
          author_uuid: user_uuid,
          receiver_uuid: reveiver_uuid
        })
        .then(data => {
          setSqueals(data)
        })
    }

    if (userObj.length === 0) {
      supabase
        .rpc('get_logged_user', {
          user_uuid: user_uuid
        })
        .then(data => {
          setUserObj(data)
        })
    }

    supabase
      .rpc('delete_notifications', {
        receiver_uuid: user_uuid,
        author_uuid: reveiver_uuid
      })
      .then(response => {})
      .catch(error => {
        console.error('Errore nella chiamata a supabase.rpc:', error)
      })
  }, [])
  return (
    <div className='md:w-[85%]'>
      {children}
      <div className='flex-col ml-2 md:ml-8 md:left-1/4 relative mb-5'>
        <Card>
          <div className='flex items-center'>
            <Link href={`/profiles/${recevier_info.username}`}>
              <span className='cursor-pointer'>
                <Avatar size={'medium'} url={recevier_info.avatar} />
              </span>
            </Link>
            <div>
              <p className='text-xl ml-5 font-bold'>{recevier_info.name}</p>
              <p className='text-md ml-5 text-gray-400'>
                @{recevier_info.username}
              </p>
            </div>
          </div>
        </Card>
        <hr />
      </div>

      {squeals.data ? (
        <div
          className='flex-col ml-2 md:ml-8 md:left-1/4 relative mb-5'
          style={{ height: '400px', overflowY: 'auto' }}
        >
          <div className='h-300 overscroll-auto'>
            <p className='pb-2 mb-3 font-sans text-sm text-center text-gray-400'>
              This is the beginning of your conversation with{' '}
              {recevier_info.username}.
            </p>

            <div id='squeals'>
              <PrivateMessageContainer
                squeals={squeals}
                author_uuid={user_uuid}
              ></PrivateMessageContainer>
              <div id='end' />
            </div>
          </div>
        </div>
      ) : (
        <div
          className='flex-col ml-2 md:ml-8 md:left-1/4 relative mb-5'
          style={{ height: '400px', overflowY: 'auto' }}
        >
          <p className='pb-2 mb-3 font-sans text-sm text-center text-gray-400'>
            Nothing happened between you and
            {' ' + recevier_info.username}. So far.
          </p>
        </div>
      )}

      <div className='flex-col ml-2 md:ml-8 md:left-1/4 relative mb-5'>
        <hr />
        <div className='bottom-0 mt-5 ml-30 flex-col relative'>

          <Form profile={userObj?.data?.[0]} isDM={true} DM_receiver={receiver_handle}/>
        </div>
      </div>
    </div>
  )
}
