'use client'

import { useState } from 'react'
import { createPost } from '../../../helper/squealsServerActions'
import { createDirectMessage } from '../../../helper/squealsServerActions'

function Squeal ({ content, photos, DM_receiver }) {
  function createSqueal () {
    if (content?.includes('@') || DM_receiver) {
      createDM()
    } else if (content?.includes('§')) {
      createChannelPost()
    } else {
      createGenericSqueal()
    }
  }

  async function createDM () {
    if (DM_receiver) {
      if (content.trim().length <= 0) {
        alert("A squeaaaaal with no content is a little useless, isn't it?")
        return
      } else {
        await createDirectMessage(content, photos, DM_receiver)
        location.reload()
      }
    } else {
      const regex = /@(\w+)/
      const match = regex.exec(content)

      if (match) {
        const receiverHandle = match[1]

        if (content.trim.length - receiverHandle.length - 1 >= 0) {
          alert("A squeal with no content is a little useless, isn't it?")
          return
        } else {
          await createDirectMessage(content, photos, receiverHandle)
          location.reload()
        }
      }
    }
  }

  async function createChannelPost () {}

  async function createGenericSqueal () {
    if (!content) {
      alert("A squeal with no content is a little useless, isn't it?")
      return
    } else {
      await createPost(content, photos)
      location.reload()
    }
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        createSqueal()
      }}
    >
      <button
        type='submit'
        className='bg-blue-500 text-white px-6 py-1 rounded-md'
      >
        Squeal
      </button>
    </form>
  )
}
export default Squeal
