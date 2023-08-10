import Avatar from './Avatar'
import Card from './Card'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function UsersCard (profile) {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className='w-300px'>
      <Card>
        <div className='h-30 items-center flex-column'>
          <div className='mb-5 items-center'>
            <Avatar url={profile?.avatar} />
          </div>
          <hr></hr>
          <div className='text-center mt-3 font-semibold'>
            <a>{profile?.name}</a>
          </div>
        </div>
      </Card>
    </div>
  )
}
