import React from 'react'

export default function NotFoundPage ({ channel }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      <div className='text-center'>
        <h1 className='text-2xl text-gray-800 mb-4'>Oops! Page Not Found</h1>
        <p className='text-lg text-gray-600'>
          {channel
            ? 'You are looking for a channel that does not exist.'
            : 'You are looking for someone that does not exist.'}
        </p>  
      </div>
    </div>
  )
}
