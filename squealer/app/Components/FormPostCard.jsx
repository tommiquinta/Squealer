import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import Avatar from './Avatar'
import Card from './Card'
import Preloader from './Preloader'

//https://fzhzqznaucvfclbaadpa.supabase.co/storage/v1/object/public/photos/1691597003355ChallengingMario.jpeg?t=2023-08-09T16%3A03%3A50.136Z

export default function PostFormCard ({ onPost }) {
  const [profile, setProfile] = useState(null)
  const [daily_quota, setDaily_quota] = useState()
  const [uploads, setUploads] = useState([])
  const [isUploading, setIsUploading] = useState(false)
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
            setDaily_quota(result.data[0].daily_quota)
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

  async function createPost () {
    if (content && content.trim() !== '') {
      if (content.includes('@')) {
        const regex = /@(\w+)/

        const match = regex.exec(content)
        if (match) {
          const receiverHandle = match[1]
          supabase
            .from('profiles')
            .select()
            .eq('username', receiverHandle)
            .then(response => {
              if (!response.error) {
                supabase
                  .from('direct_messages')
                  .insert({
                    author: session.user.id,
                    receiver: response.data[0].id,
                    content: content,
                    photos: uploads
                  })
                  .then(response => {
                    if (!response.error) {
                      setContent('')
                      setUploads([])
                    }
                  })
              } else {
                console.log(response.error) // TO-DO: handle error
              }
            })
        }
      }

      if (content.includes('§')) {
        const regex = /§(\w+)/

        const match = regex.exec(content)

        if (match) {
          const receiverHandle = match[1]

          supabase
            .from('public_channels')
            .select()
            .eq('handle', receiverHandle)
            .then(response => {
              if (!response.error) {
                supabase
                  .from('posts')
                  .insert({
                    author: session.user.id,
                    public_channel: response.data[0].id,
                    content: content,
                    photos: uploads
                  })
                  .then(response => {
                    if (!response.error) {
                      setContent('')
                      setUploads([])
                    }
                  })
              } else {
                console.log(response.error) // TO-DO: handle error
              }
            })
        }
      } else {
        // cheack if the post is not empty
        supabase
          .from('posts')
          .insert({
            author: session.user.id, // in the database rules we have a check to control who actually clicks on "share"
            content,
            photos: uploads
          })
          .then(response => {
            if (!response.error) {
              setContent('')
              setUploads([])

              const newDailyQuota =
                profile.daily_quota - content.length - uploads.length * 125

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
                    console.error('daily quota update error.', response.error)
                  }
                })

              if (onPost) {
                onPost() // function to fill home with posts in index.js
              }
            }
          })
      }
    } else {
      alert("A squeal with no content is a little useless, isn't it?")
    }
  }

  async function addPhotos (ev) {
    const files = ev.target.files
    if (files.length > 0) {
      setIsUploading(true)
      for (const file of files) {
        const newName = Date.now() + file.name
        const result = await supabase.storage
          .from('photos')
          .upload(newName, file)

        if (result.data) {
          const url =
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            '/storage/v1/object/public/photos/' +
            result.data.path

          setUploads(prevUploads => [...prevUploads, url])
          setDaily_quota(daily_quota - 125)
        } else {
          console.log(result)
        }
      }
      setIsUploading(false)
    }
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
            className='grow p-3 h-18 resize-none'
            placeholder={`What's on your mind, ${profile && profile.name}?`}
          />
        </div>

        <div className=''>
          {uploads.length > 0 && (
            <div className='mt-4'>
              {uploads.length === 4 ? (
                <table className='w-full'>
                  <tbody>
                    <tr>
                      <td className='p-2'>
                        <img
                          src={uploads[0]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                      <td className='p-2'>
                        <img
                          src={uploads[1]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='p-2'>
                        <img
                          src={uploads[2]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                      <td className='p-2'>
                        <img
                          src={uploads[3]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  {uploads.map(upload => (
                    <div className='' key={upload}>
                      <img
                        src={upload}
                        className='w-auto h-40 rounded-md object-cover'
                        alt=''
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {isUploading && (
          <div className=''>
            <Preloader />
          </div>
        )}

        <div className=' flex gap-6 items-center mt-2'>
          <div>
            <label className='flex gap-1'>
              <input
                type='file'
                className='hidden'
                multiple
                onChange={addPhotos}
              />
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
            </label>
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
            <a
              className={`flex gap-1 ml-8 ${
                daily_quota < 0 ? 'text-red-500 font-semibold' : 'text-gray-400'
              }`}
            >
              Daily Quota: {daily_quota}
            </a>
          </div>

          <div className='grow text-right'>
            <button
              onClick={createPost}
              className='bg-blue-500 text-white px-6 py-1 rounded-md'
              disabled={daily_quota < 0}
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
