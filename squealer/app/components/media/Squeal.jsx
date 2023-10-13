'use client'

import {
  checkAndInsertPublic,
  createPost
} from '../../../helper/squealsServerActions'
import { createDirectMessage } from '../../../helper/squealsServerActions'
import { createPrivateChannelSqueal } from '../../../helper/squealsServerActions'

function Squeal ({ content, photos, DM_receiver, disabled, sendTo }) {
  async function analyzeReceivers () {
    const destinatari = sendTo.split(',')
    if (!content && photos.length <= 0) {
      alert("A squeal with no content is a little useless, isn't it?")
      return
    }

    const promises = [] // Creare un array per tenere traccia delle promesse create nel ciclo.

    for (var receiver of destinatari) {
      const promise = createSqueal(receiver)
      promises.push(promise)
    }

    // Attendere che tutte le promesse nel ciclo siano state risolte.
    await Promise.all(promises)

    // Ora puoi eseguire il reload.
    location.reload()
  }

  async function createSqueal (destinatario) {
    document.getElementById('button').setAttribute('disabled', true)

    if (destinatario.includes('@') || DM_receiver) {
      await createDM(destinatario)
    } else if (destinatario.includes('§')) {
      //console.log('destinatario for chanel ' + destinatario)
      await createChannelPost(destinatario)
    } else {
      //console.log('destinatario for everybody ' + destinatario)
      await createGenericSqueal()
    }
  }

  async function createDM (receiver) {
    if (DM_receiver) {
      if (content.trim().length <= 0 && photos.length == 0) {
        alert("A squeal with no content is a little useless, isn't it?")
        return
      } else {
        await createDirectMessage(content, photos, DM_receiver)
        location.reload()
      }
    } else {
      const regex = /@(\w+)/
      const match = regex.exec(receiver)

      if (match) {
        const receiverHandle = match[1]

        if (
          content.trim.length - receiverHandle.length - 1 >= 0 &&
          photos.length == 0
        ) {
          alert("A squeal with no content is a little useless, isn't it?")
          return
        } else {
          await createDirectMessage(content, photos, receiverHandle)
        }
      }
    }
  }

  var isSub = true
  async function createChannelPost (receiver) {
    if (content.trim().length <= 0 && photos.length == 0) {
      alert("A squeal with no content is a little useless, isn't it?")
      return
    } else {
      const regex = /§(\w+)/
      const match = regex.exec(receiver)

      if (match) {
        const receiverHandle = match[1]
        if (
          content.trim.length - receiverHandle.length - 1 >= 0 &&
          photos.length == 0
        ) {
          alert("A squeal with no content is a little useless, isn't it?")
          return
        } else {
          isSub = await createPrivateChannelSqueal(
            content,
            photos,
            receiverHandle
          )

          if (!isSub) {
            const result = await checkAndInsertPublic(
              content,
              photos,
              receiverHandle
            )

            result
              ? console.log(result)
              : alert(
                  `Subscribe to this channel (${receiver}) to be able to share squeals in it.`
                )
          }
        }
      }
    }
  }

  async function createGenericSqueal () {
    await createPost(content, photos)
    const done = false
    return done
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        analyzeReceivers()
      }}
    >
      {disabled >= 0 || DM_receiver ? (
        <button
          type='submit'
          className='bg-blue-500 text-white px-6 py-1 rounded-md'
          id='button'
        >
          Squeal
        </button>
      ) : (
        <button
          disabled
          className='bg-blue-300 text-white px-6 py-1 rounded-md'
        >
          Squeal
        </button>
      )}
    </form>
  )
}
export default Squeal
