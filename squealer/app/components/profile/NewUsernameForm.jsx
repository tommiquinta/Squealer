'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/navigation'
import React, { use, useState } from 'react'

export default function NewUsernameForm ({ id }) {
  const supabase = createClientComponentClient({ cookies })
  const [username, setUsername] = useState('')

  const handleUsernameSubmit = async event => {
    event.preventDefault()

    if (!username) {
      alert('You must choose an handler for your profile.')
      return
    }
    if (username.length < 4) {
      alert('Please insert an at least 4 carachters username long.')
      return
    } else {
      try {
        var user = username
        if (user.startsWith('@')) {
          user = user.substring(1)
        }

        const { data, error } = await supabase
          .from('profiles')
          .update([
            {
              username: user
            }
          ])
          .eq('id', id)

        if (error) {
          alert('this username is already used.')
          console.error("Errore nell'invio dell'username al database", error)
        } else {
          console.log('Username inviato con successo al database:', data)
          location.reload()
        }
      } catch (error) {
        console.error("Errore nell'invio dell'username al database", error)
      }
    }
  }

  return (
    <div className='flex flex-col gap-2.5 items-center justify-center w-8/12 h-full mx-auto'>
      <h1 className='text-5xl subpixel-antialiased font-medium text-center text-gray-400 my-2 mt-20'>
        One last step.
      </h1>
      <p className='text-center text-gray-400 mt-2 mb-3'>
        Insert your username: it will be your unique identifier.
      </p>
      <div className='flex flex-col items-center'>
        <form
          onSubmit={handleUsernameSubmit}
          className='flex flex-col items-center'
        >
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='shadow-sm shadow-slate-400 rounded-md leading-8 p-1'
            placeholder='username'
          />
          <button
            className='bg-blue-500 text-white px-6 py-1 rounded-md mt-6'
            type='submit'
          >
            Enter Squealer
          </button>
        </form>
      </div>
    </div>
  )
}
