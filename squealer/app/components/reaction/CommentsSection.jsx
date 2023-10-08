'use client'

import { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import { comment, getComments } from '../../../helper/squealsServerActions'
import CommentCard from './CommentCard'
export default function CommentsSection ({ profile, id }) {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([]) // Stato per memorizzare i commenti

  useEffect(() => {
    async function fetchComments () {
      if (!id) return
      const commentsData = await getComments(id)
      if (commentsData) {
        setComments(commentsData)
      }
    }

    fetchComments() // Chiamare la funzione per ottenere i commenti
  }, [id])

  async function handleComment () {
    if (!content || !id) {
      return
    }
    await comment(content, id)
    setContent('')
    // aggiorna i commenti dopo l'aggiunta di un nuovo commento
    const newCommentsData = await getComments(id)
    if (newCommentsData) {
      setComments(newCommentsData)
    }
  }

  return (
    <di style={{ width: '100%' }}>
      <hr />
      <div className='flex gap-3 p-3'>
        {profile && <Avatar size='small' url={profile.avatar} />}
        <textarea
          placeholder='Answer this Squeal!'
          className='grow resize-none'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className='text-right'>
          <button className='bg-blue-500 text-white px-2 py-1 rounded-md' onClick={handleComment}>Share</button>
        </div>
      </div>

      <hr />
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          content={comment.comment_text}
          name={comment.name}
          avatar={comment.avatar}
        ></CommentCard>
      ))}
    </di>
  )
}
