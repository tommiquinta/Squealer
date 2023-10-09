'use client'
import { useState } from 'react'

export default function ChannelProps ({
  channelName,
  channelDescription,
  handle,
  editable,
  save
}) {
  const [name, setName] = useState(channelName)
  const [description, setDescription] = useState(channelDescription)

  const editableClasses = 'text-black break-normal w-full'

  return (
    <form
      className='flex-col gap-2 w-6/12 '
      action={e => save(e, name, description)}
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
        <label className='font-bold' htmlFor='channelDescription'>
          Description:
        </label>
        <textarea
          value={description}
          className={`${editableClasses} h-20`}
          type='text'
          id='channelDescription'
          disabled={!editable}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <p className='font-bold flex gap-3'>
        Handle: <span className='font-normal'>§{handle}</span>
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
