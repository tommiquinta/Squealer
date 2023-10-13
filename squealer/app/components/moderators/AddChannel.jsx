'use client'
import { useState } from 'react'
import Card from '../Card'
import { insertPublicChannel } from '../../../helper/moderatorServerActions'
import { useRouter } from 'next/navigation'
import { insertPrivateChannel } from '.././../../helper/channelServerAction'

export default function AddChannel ({ pvt }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [descr, setDescr] = useState('')
  const [handle, setHandle] = useState('')
  const [avatar, setAvatar] = useState('')
  const [cover, setCover] = useState('')

  const labelClasses = 'text-sm text-slate-500 mt-2'
  const inputClasses = 'border-2 border-slate-300 rounded p-2'

  async function createChannel (pvt) {
    if (!pvt) {
      const result = await insertPublicChannel(
        name,
        descr,
        handle.toUpperCase(),
        avatar === '' && avatar.includes('http') ? avatar : undefined,
        cover === '' && cover.includes('http') ? cover : undefined
      )
      if (result) {
        alert(`New Channel ${name} created`)
      } else {
        alert('Something went wrong')
      }
    } else {
      const result = await insertPrivateChannel(
        name,
        descr,
        handle.toLowerCase(),
        avatar === '' && avatar.includes('http') ? avatar : undefined,
        cover === '' && cover.includes('http') ? cover : undefined
      )
      if (result) {
        alert(`New Channel ${name} created`)
      } else {
        alert('Something went wrong')
      }
    }

    setName('')
    setDescr('')
    setHandle('')
    setAvatar('')
    setCover('')
    router.refresh()
  }

  return (
    <Card>
      <form
        className='flex flex-col gap-2 p-3'
        onSubmit={e => {
          e.preventDefault()
          createChannel(pvt)
        }}
      >
        <p className='text-center font-bold'> Create a new {pvt ? 'private' : 'public'} channel</p>
        <label className={labelClasses} htmlFor='channelName'>
          Insert your new channel&apos;s name:
        </label>
        <input
          value={name}
          type='text'
          id='channelName'
          onChange={e => setName(e.target.value)}
          placeholder='Insert name'
          className={inputClasses}
        />

        <label className={labelClasses} htmlFor='channelDescr'>
          Insert a brief description of this channel:
        </label>
        <input
          value={descr}
          type='text'
          id='channelDescr'
          onChange={e => setDescr(e.target.value)}
          placeholder='Insert description'
          className={inputClasses}
        />

        <label className={labelClasses} htmlFor='channelHandle'>
          Insert the handle of this channel, in capital letters:
        </label>
        <input
          value={handle}
          type='text'
          id='channelHandle'
          onChange={e => setHandle(e.target.value)}
          placeholder='Insert handle'
          className={`${inputClasses}`}
        />

        <label className={labelClasses} htmlFor='avatar'>
          Insert the avatar URL, for the profile image:
        </label>
        <input
          value={avatar}
          type='text'
          id='avatar'
          onChange={e => setAvatar(e.target.value)}
          placeholder='Insert avatar URL'
          className={`${inputClasses}`}
        />

        <label className={labelClasses} htmlFor='cover'>
          Insert the cover URL:
        </label>
        <input
          value={cover}
          type='text'
          id='cover'
          onChange={e => setCover(e.target.value)}
          placeholder='Insert cover URL'
          className={`${inputClasses}`}
        />

        <button
          type='submit'
          className='bg-socialBlue p-2 px-4 text-white rounded mt-4 mx-auto'
        >
          Create{' '}
        </button>
      </form>
    </Card>
  )
}
