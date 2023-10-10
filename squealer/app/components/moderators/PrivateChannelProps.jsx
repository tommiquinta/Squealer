'use client'
import { useState } from 'react'

export default function PrivateChannelProps ({
  channelName,
  channelCreator,
  handle,
  numPost,
  editable,
  save
}) {
  const [name, setName] = useState(channelName)
  const [creator, setCreator] = useState(channelCreator)

  const editableClasses = 'text-black break-normal '

  return (
    <form
      className='flex-col gap-8 w-8/12 '
      action={e => save(e, name, creator)}
    >
      <div className='flex gap-3'>
        <label className='font-bold' htmlFor='channelName'>
          Name:
        </label>
        <input
          value={name}
          className={editableClasses}
          type='text'
          id='channelName'
          disabled={!editable}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className='flex gap-3'>
        <label className='font-bold w-fit' htmlFor='channelCreator'>
          Created by:
        </label>
        <input
          value={creator}
          className={`${editableClasses} w-6/12`}
          type='text'
          id='channelCreator'
          disabled={!editable}
          onChange={e => setCreator(e.target.value)}
        />
      </div>

      <p className='font-bold flex gap-3'>
        Handle: <span className='font-normal'>§{handle}</span>
      </p>
      <p className='font-bold flex gap-3'>
        Number of posts: <span className='font-normal'>{numPost}</span>
      </p>

      {editable && (
        <button
          type='submit'
          className='text-white flex gap-2 py-1 px-2 md:px-4 mt-3 bg-socialBlue hover:bg-green-700 rounded-md hover:shadow-md shadow-gray-300 transition-all float-right'
        >
          Save
        </button>
      )}
    </form>
  )
}