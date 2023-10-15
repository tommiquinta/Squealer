'use client'

import { useEffect, useState } from 'react'
import { cookies } from 'next/navigation'
import Avatar from '../Avatar'
import Card from '../Card'
import Preloader from '../Preloader'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Squeal from './Squeal'
import dynamic from 'next/dynamic'
import { useMapContext } from '../../context/MapContext'

export default function PostFormCard ({
  profile,
  onPost,
  isDM,
  DM_receiver,
  changeMap,
  showMap,
  isPrivate,
  channel,
  handle,
  isHome
}) {
  const Media = dynamic(() => import('./Media'), { ssr: false })
  const [daily_quota, setDaily_quota] = useState()
  const [uploads, setUploads] = useState([])
  const [mediaArray, setMediaArray] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [content, setContent] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [destinatari, setDestinatari] = useState('')
  const [addedMap, setAddedMap] = useState(true)
  const { position } = useMapContext()

  const supabase = createClientComponentClient({ cookies })
  console.log(channel)
  useEffect(() => {
    if (!isDM) {
      setDaily_quota(profile.daily_quota)
    }
    if (channel) {
      setDestinatari(`§${handle}`)
    }
    if (position.lat != 51.505 && position.lng != -0.09) {
      if (addedMap) {
        setDaily_quota(daily_quota - 125)
        setUploads(prevUploads => [...prevUploads, position])
        setAddedMap(!addedMap)
      }
    }
  }, [position])

  async function addUploads (ev, bucket) {
    try {
      const files = ev.target.files
      if (files.length > 0) {
        setIsUploading(true)
        for (const file of files) {
          setDaily_quota(daily_quota - 125)

          // questa roba deve avvenire dopo aver cliccato il tasto squeal
          const newName = Date.now() + file.name
          const result = await supabase.storage
            .from(bucket)
            .upload(newName, file)

          if (result.data) {
            const url =
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              `/storage/v1/object/public/${bucket}/` +
              result.data.path
            setUploads(prevUploads => [...prevUploads, url])

            setMediaArray(prevUploads => [...prevUploads, url])
          } else {
            console.log(result)
          }
        }
        setIsUploading(false)
      }
    } catch (error) {
      console.log(error + 'errore in addUploads in FormPostCard')
    }
  }

  // placeholder condition wether it's in homepage or in DM page
  let placeholderText = !isDM
    ? `What's on your mind, ${profile && profile.username}?`
    : `Squeal something to ${DM_receiver}!`

  if (channel) {
    placeholderText = isPrivate
      ? `Squeals into ${channel.name}`
      : placeholderText
  }
  console.log(isPrivate)
  return (
    <Card>
      <div className='flex gap-3 p-2'>
        {isHome || isDM || isPrivate ? (
          <Avatar size={'medium'} url={profile?.avatar} />
        ) : (
          <Avatar size={'medium'} url={channel?.avatar} />
        )}
        <textarea
          value={content}
          onChange={e => {
            const newValue = e.target.value
            setContent(newValue)
            if (!isDM) {
              const charDifference = newValue.length - content.length
              setDaily_quota(daily_quota - charDifference)
            }
          }}
          className='grow p-3 h-18 resize-none'
          placeholder={placeholderText}
        />
      </div>

      {isUploading && (
        <div className=''>
          <Preloader />
        </div>
      )}

      <Media media={mediaArray} hideMap={true} />

      <div className='flex mt-8 gap-2 my-3 w-full items-center'>
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
        <label className='flex gap-1'>
          <input
            type='file'
            className='hidden'
            multiple={true}
            accept='image/*'
            onChange={e => addUploads(e, 'photos')}
            {...(daily_quota <= 0 ? disabled : null)}
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
          <p className='hidden md:block'>Image</p>
        </label>

        <label className='flex gap-1'>
          <input
            type='file'
            className='hidden'
            multiple
            accept='video/*'
            onChange={e => addUploads(e, 'videos')}
            {...(daily_quota <= 0 ? disabled : null)}
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
              d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
          <p className='hidden md:block'>Video</p>
        </label>

        <button
          className='flex gap-1 w-fit'
          onClick={() => {
            changeMap()
          }}
        >
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
          <p className='hidden md:block'> {showMap ? 'Hide' : 'Show'} Map </p>
        </button>

        {!isDM ? (
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
            DM_receiver={DM_receiver}
            disabled={!DM_receiver ? daily_quota : null}
            sendTo={destinatari}
          />
        </div>
      </div>
    </Card>
  )
}
