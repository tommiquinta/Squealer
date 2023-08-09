import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Card from './Card'
import { useEffect, useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'

export default function PostFormCard ({ onPost }) {
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
            if (onPost) {
              onPost()
            }
          }
        })
    }
  }

  return (
    <div className='mb-10'>
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
        <div className=' flex gap-6 items-center mt-2'>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 512 512'
                className='w-6 h-6 mr-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z'
                />
              </svg>
              Image
            </button>
          </div>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 576 512'
                className='w-6 h-6 mr-1'
              >
                <path d='M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z' />
              </svg>
              Video
            </button>
          </div>
          <div>
            <button className='flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 384 512'
                className='w-6 h-6 mr-1'
              >
                <path d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z' />
              </svg>
              Location
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
    </div>
  )
}
