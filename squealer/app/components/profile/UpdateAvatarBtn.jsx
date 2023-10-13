'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { uploadPhoto } from '../../../helper/uploadOnSupabase.js'
import { cookies } from 'next/navigation';
import { Suspense } from 'react'
import Preloader from '../Preloader.jsx';

export default function UpdateAvatarBtn({ add }) {
  const supabase = createClientComponentClient({ cookies })

  async function updateAvatar(ev) {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      const file = ev.target.files?.[0]
      if (file) {
        await uploadPhoto(
          supabase,
          user.id,
          'avatars',
          'avatar',
          file
        )
        location.reload()
      }
    } catch (error) {
      console.log(error + ' errore in updateAvatar')
    }
  }
  const position =
    'bg-white rounded-full absolute right-0 p-2 bottom-0 shadow-black shadow-md cursor-pointer'

  return (
    <Suspense fallback={<Preloader />} >
      <label className={`${position} ${add}`}>
        <input type='file' className='hidden' onChange={(ev) => updateAvatar(ev)} />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='w-4 h-4'
        >
          <path
            fillRule='evenodd'
            d='M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z'
            clipRule='evenodd'
          />
        </svg>
      </label>
    </Suspense>
  )
}
