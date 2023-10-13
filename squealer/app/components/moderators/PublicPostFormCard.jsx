'use client'

import { useState, useEffect } from 'react'
import { cookies } from 'next/navigation'
import Avatar from '../Avatar'
import Card from '../Card'
import Preloader from '../Preloader'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Squeal from '../media/Squeal'
import dynamic from 'next/dynamic'
import { useMapContext } from '../../context/MapContext'

export default function PublicPostFormCard ({
  profile,
  channel,
  handle,
  onPost,
  isPrivate,
  changeMap,
  showMap
}) {
  const Media = dynamic(() => import('../media/Media'), { ssr: false })

  const [destinatari, setDestinatari] = useState(`§${handle}`)
  const [daily_quota, setDaily_quota] = useState()
  const [uploads, setUploads] = useState([])
  const [mediaArray, setMediaArray] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [content, setContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [addedMap, setAddedMap] = useState(true)
  const { position } = useMapContext()

  useEffect(() => {
    if (isPrivate) {
      setDaily_quota(profile.daily_quota)
    }
  }, [])

  async function addPhotos (ev) {
    try {
      const files = ev.target.files
      if (files.length > 0) {
        setIsUploading(true)

        for (const file of files) {
          setDaily_quota(daily_quota - 125)

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
          } else {
            console.log(result)
          }
        }
        setIsUploading(false)
      }
    } catch (error) {
      console.log(error + 'errore in addPhotos in PublicPost')
    }
  }

  let placeholderText = `Squeals into ${channel.name}`

  return (
    <div className='mb-5'>
      <Card>
        <div className='flex gap-3 p-2'>
          {profile && <Avatar size={'medium'} url={profile.avatar} />}
          <textarea
            value={content}
            onChange={e => {
              const newValue = e.target.value
              setContent(newValue)
              if (isPrivate) {
                const charDifference = newValue.length - content.length
                setDaily_quota(daily_quota - charDifference)
              }
            }}
            className='grow p-3 h-18 resize-none'
            placeholder={placeholderText}
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

        <div className='flex gap-2 my-3 w-full items-center'>
          <label htmlFor='destinatari' className='text-sm px-0 mx-0'>
            Send to:
          </label>
          <input
            type='text'
            placeholder="Insert §<channels' handle>  or @<username>, separe with comma"
            className='w-10/12 text-xs py-2'
            value={destinatari}
            onChange={e => setDestinatari(e.target.value)}
          />
        </div>

        <div className='flex gap-6 items-center my-3'>
          <div>
            <label className='flex gap-1'>
              <input
                type='file'
                className='hidden'
                multiple
                accept='image/*'
                onChange={addPhotos}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
              Image
            </label>
          </div>

          <button className='flex gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
            Video
          </button>

          <button className='flex gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
              />
            </svg>
            Location
          </button>
        </div>
        {isPrivate ? (
          <label
            className={`flex gap-1  ${
              daily_quota < 0 ? 'text-red-500 font-semibold' : 'text-gray-400'
            }`}
          >
            Daily Quota: {daily_quota}
          </label>
        ) : null}

        <div className='grow text-right'>
          <Squeal
            content={content}
            photos={uploads}
            disabled={false}
            sendTo={destinatari}
          >
            Squeal
          </Squeal>
        </div>
      </Card>
    </div>
  )
}
