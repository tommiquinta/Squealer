'use client'
import Avatar from '../Avatar'
export default function CommentCard ({ content, name, avatar }) {
  return (
    <div className='grow flex gap-3 p-2'>
      {avatar && <Avatar size='small' url={avatar} />}
      <div>
        <p className='font-bold'> {name} </p>
        <p>{content}</p>
      </div>
    </div>
  )
}
