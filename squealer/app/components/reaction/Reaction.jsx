'use client'

import LikeButton from './LikeButton.jsx'
import DislikeButton from './DisLikeButton.jsx'
import { useState } from 'react'
import {
  addLike,
  addDislike,
  removeLike,
  removeDislike
} from '../../../helper/reactionServerActions.js'

function Reaction ({
  id,
  numLikes,
  numDislikes,
  hasLiked,
  hasDisliked,
  disable,
  views
}) {
  const [isLiked, setIsLiked] = useState(hasLiked ? true : false)
  const [isDisliked, setIsDisliked] = useState(hasDisliked ? true : false)
  const [counterLikes, setCounterLikes] = useState(numLikes)
  const [counterDislikes, setCounterDislikes] = useState(numDislikes)

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

  return (
    <div className='w-full h-[30px] gap-2 flex items-center'>
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
      <div className='flex items-center text-gray-400 text-sm'>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"/>
        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 
        7.893 2.66 9.336 6.41c.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 
        1 1-8 0a4 4 0 0 1 8 0Z" clipRule="evenodd"/></g></svg>        
        <p className='ml-1'>{views}</p>
      </div>
    </div>
  )
}

export default Reaction
