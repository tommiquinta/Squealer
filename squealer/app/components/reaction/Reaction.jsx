'use client'

import LikeButton from './LikeButton.jsx'
import DislikeButton from './DisLikeButton.jsx'
import { useEffect, useState } from 'react'
import {
  addLike,
  addDislike,
  removeLike,
  removeDislike
} from '../../../helper/reactionServerActions.js'
import CommentsSection from './CommentsSection.jsx'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
function Reaction ({
  id,
  numLikes,
  numDislikes,
  hasLiked,
  hasDisliked,
  disable,
  views,
  profile,
  avatar,
  comment_count
}) {

  const [isLiked, setIsLiked] = useState(hasLiked)
  const [isDisliked, setIsDisliked] = useState(hasDisliked)
  const [counterLikes, setCounterLikes] = useState(numLikes)
  const [counterDislikes, setCounterDislikes] = useState(numDislikes)
  const [showComments, setShowComments] = useState(false)
  const supabase = createClientComponentClient({})
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    async function getSession () {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session) {
        setLogged(true)
      }
    }
    getSession()
  }, [])

  //like
  async function handleLike (toLike) {
    if (toLike) {
      if (!isLiked) {
        setIsLiked(true)
        setCounterLikes(counterLikes => counterLikes + 1)
        handleDislike(false)
        //aggiungi like
        await addLike(id)
      } else {
        setCounterLikes(counterLikes => counterLikes - 1)
        setIsLiked(false)
        //rimuovi like
        await removeLike(id)
      }
    } else {
      //rimuovi solo grafica, fa da solo lato db
      if (isLiked) {
        setCounterLikes(counterLikes => counterLikes - 1)
        setIsLiked(false)
      }
    }
  }
  //dislike
  async function handleDislike (toDislike) {
    if (toDislike) {
      if (!isDisliked) {
        setIsDisliked(true)
        setCounterDislikes(counterDislikes => counterDislikes + 1)
        handleLike(false)
        //aggiungi dislike
        await addDislike(id)
      } else {
        setCounterDislikes(counterDislikes => counterDislikes - 1)
        setIsDisliked(false)
        //rimuovi dislike
        await removeDislike(id)
      }
    } else {
      //rimozione gestita in lato db
      if (isDisliked) {
        setCounterDislikes(counterDislikes => counterDislikes - 1)
        setIsDisliked(false)
      }
    }
  }

  async function handleComments () {
    setShowComments(!showComments)
  }

  return (
    <div className='w-full mt-3'>
      <div className='w-full h-[30px] gap-4 flex items-center'>
        <form action={handleLike}>
          <LikeButton
            hasLiked={isLiked}
            handleLikes={handleLike}
            count={counterLikes}
            toDisable={disable}
          />
        </form>

        <form action={handleDislike}>
          <DislikeButton
            key={isDisliked}
            hasDisliked={isDisliked}
            count={counterDislikes}
            toDisable={disable}
          />
        </form>
        <div className='flex items-center text-gray-400 text-m'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
          >
            <g fill='currentColor'>
              <path d='M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z' />
              <path
                fillRule='evenodd'
                d='M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 
        7.893 2.66 9.336 6.41c.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 
        1 1-8 0a4 4 0 0 1 8 0Z'
                clipRule='evenodd'
              />
            </g>
          </svg>
          <p className='ml-1'>{views}</p>
        </div>
        <div className='h-[20px] flex gap-1 items-center text-gray-400 text-m'>
          <button onClick={handleComments}>
            <svg
              width='20'
              height='20'
              viewBox='0 -1 24 24'
              id='meteor-icon-kit__solid-comments'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18 19H13C10.2386 19 8 16.7614 8 14V11C8 8.23858 10.2386 6 13 6H19C21.7614 6 24 8.23858 24 11V21.1315C24 21.3289 23.9416 21.5219 23.8321 21.6862C23.5257 22.1457 22.9048 22.2699 22.4453 21.9635L18 19zM15.9 4H13C9.13401 4 6 7.13401 6 11V13L1.5547 15.9635C1.09517 16.2699 0.474302 16.1457 0.16795 15.6862C0.058438 15.5219 0 15.3289 0 15.1315V5C0 2.23858 2.23858 0 5 0H11C13.419 0 15.4367 1.71776 15.9 4z'
                fill='#758CA3'
              />
            </svg>
          </button>
        </div>
      </div>
      {showComments && (
        <div className='comments flex'>
          <CommentsSection
            profile={profile}
            id={id}
            avatar={avatar}
            isLogged={logged}
          ></CommentsSection>
        </div>
      )}
    </div>
  )
}

export default Reaction
