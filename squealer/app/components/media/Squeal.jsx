'use client'

import { useState } from 'react'
import { createPost } from '../../../helper/squealsServerActions'

function Squeal ({ receiver_channel, receiver_user, content, photos }) {
  async function createSqueal () {
    if (!content) {
      alert("A squeal with no content is a little useless, isn't it?")
      return
    } else {
      await createPost(content, photos, receiver_channel, receiver_user)
      location.reload()
    }
  }

  return (
    <form action={createSqueal}>
      <button className='bg-blue-500 text-white px-6 py-1 rounded-md'>
        Squeal
      </button>
    </form>
  )
}
export default Squeal
