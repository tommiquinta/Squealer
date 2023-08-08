import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Card from './Card'
import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

export default function PostFormCard ({onPost}) {
  const [profile, setProfile] = useState(null)
  const [content, setContent] = useState()
  const supabase = useSupabaseClient()
  const session = useSession()

  useEffect(() => {
    if (session?.user) {
      supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .then(result => {
          if (result.data.length) {
            setProfile(result.data[0])
          }
        })
        .catch(error => {
          console.error('Error fetching profile data:', error)
        })
    }
  }, [session])

  if (!session) {
    return <loadingPage />
  }

  // console.log(profile)

  function createPost () {
    supabase
      .from('posts')
      .insert({
        author: session.user.id,  // in the database rules we have a check to control who actually clicks on "share"
        content
      })
      .then(response => {
        if(!response.error){
          setContent('');
            if(onPost){
              onPost();
            }
        }
      })
  }

  return (
    <Card>
      <div className='flex gap-3'>
        {profile && <Avatar url={profile.avatar} />}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className='grow p-3 h-18'
          placeholder={`What's on your mind, ${profile && profile.name}?`}
        />
      </div>
      <div className='flex gap-10 items-center mt-2'>
        <div>
          <button className='flex gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
            People
          </button>
        </div>
        <div>
          <button className='flex gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
              />
            </svg>
            Mood
          </button>
        </div>
        <div className='grow text-right'>
          <button
            onClick={createPost}
            className='bg-blue-500 text-white px-6 py-1 rounded-md'
          >
            Squeal
          </button>
        </div>
      </div>
    </Card>
  )
}
