import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { uploadUserProfileImage } from '../../Helpers/user.js'
import Preloader from './Preloader'

export default function Avatar ({ url, size, editable, onChange }) {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [isUploading, setIsUploading] = useState(false)

  async function updateAvatar (ev) {
    try {
      const file = ev.target.files?.[0]
      if (file) {
        setIsUploading(true)
        await uploadUserProfileImage(
          supabase,
          session.user.id,
          'avatars',
          'avatar',
          file
        )
        setIsUploading(false)
        if (onChange) onChange()
      }
    } catch (error) {
      console.log(error + ' errore in updateAvatar')
    }
  }

  let sizeWidth = 'w-12 h-12'
  if (size === 'big') {
    sizeWidth = 'w-24 h-24'
  }
  
   if (size === 'medium') {
    sizeWidth = 'w-17 h-17'
  }

  return (
    <div className='h-30 flex justify-center items-center relative'>
      <div className={`${sizeWidth} relative rounded-full overflow-hidden`}>
        <div
          className='items-center justify-center'
          style={{
            overflow: 'hidden',
            margin: '0 auto' // Centra orizzontalmente
          }}
        >
          <img
            src={url}
            alt='aggiungi una foto profilo'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {isUploading && (
            <div className='absolute inset-0 flex items-center bg-white bg-opacity-50 rounded-full'>
              <div className='inline-block mx-auto'>
                <Preloader />
              </div>
            </div>
          )}
        </div>
      </div>

      {editable && (
        <label className='bg-white rounded-full absolute right-0 p-2 bottom-0 shadow-black shadow-md cursor-pointer'>
          <input type='file' className='hidden' onChange={updateAvatar} />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            class='w-4 h-4'
          >
            <path
              fill-rule='evenodd'
              d='M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z'
              clip-rule='evenodd'
            />
          </svg>
        </label>
      )}
    </div>
  )
}
