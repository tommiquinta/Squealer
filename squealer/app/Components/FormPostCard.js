import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Card from './Card'
import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

export default function PostFormCard ({ onPost }) {
  const [profile, setProfile] = useState(null)
  const [daily_quota, setDaily_quota] = useState(profile?.daily_quota)
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
    if (content && content.trim() !== '') {
      // cheack if the post is not empty
      supabase
        .from('posts')
        .insert({
          author: session.user.id, // in the database rules we have a check to control who actually clicks on "share"
          content
        })
        .then(response => {
          if (!response.error) {
            setContent('')
            const newDailyQuota = profile.daily_quota - content.length
            console.log(newDailyQuota)

            supabase
              .from('profiles')
              .update({
                daily_quota: newDailyQuota
              })
              .eq('id', session.user.id)
              .then(response => {
                if (!response.error) {
                  setDaily_quota(newDailyQuota) // update local dailyQuota
                } else {
                  console.error(
                    "daily quota update error.",
                    response.error
                  )
                }
              })

            if (onPost) {
              onPost() // function to fill home with posts in index.js
            }
          }
        })
    }
  }

  function updateDailyQuota () {
    supabase
      .from('profiles')
      .update({ daily_quota: 2000 })
      .eq('id', session.user.id)
  }

  return (
    <div className='mb-5'>
      <Card>
        <div className='flex gap-3'>
          {profile && <Avatar url={profile.avatar} />}
          <textarea
            value={content}
            onChange={e => {
              setContent(e.target.value)
              setDaily_quota(profile.daily_quota - e.target.value.length)
            }}
            className='grow p-3 h-18'
            placeholder={`What's on your mind, ${profile && profile.name}?`}
          />
        </div>
        <div className=' flex gap-6 items-center mt-2'>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
              Image
            </button>
          </div>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                />
              </svg>
              Video
            </button>
          </div>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                />
              </svg>
              Location
            </button>
          </div>

          <div>
            <a className='flex gap-1 ml-8 text-gray-400'>
              Daily Quota: {profile && daily_quota}
            </a>
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
      <hr></hr>
    </div>
  )
}
