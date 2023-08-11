import Avatar from './Avatar'
import Card from './Card'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function UsersCard (profile) {
  const session = useSession()
  const supabase = useSupabaseClient()

  function squeal (data) {
    console.log(data)
  }

  return (
    <div className='grow'>
      <Card>
        <div className='grow'>
          <div className='mb-5 '>
            <Avatar url={profile?.avatar} />
          </div>
          <hr />
          <div className='text-center mt-3 mb-3 font-semibold'>
            <a>{profile?.name}</a>
          </div>
          <hr />
          <div className='text-center mt-3 mb-10 text-gray-400 text-sm'>
            <a>@{profile?.username}</a>
          </div>
          <div className='mt-2 items-center text-center'>
            <Link
              href={`/privateMessage?username=${profile?.username}`}
              className='bg-blue-500 text-white px-6 py-2 rounded-lg'
            >
              Squeal
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
