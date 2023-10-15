'use client'
import Link from 'next/link'
import Avatar from '../Avatar'
export default function CommentCard ({ content, name, avatar, handle }) {
  return (
    <div className='grow flex gap-3 p-2'>
      <Link href={'/profiles/' + handle}>
        <span className='cursor-pointer'>
          {avatar && <Avatar size='small' url={avatar} />}
        </span>
      </Link>

      <div>
        <p className='font-bold'> {name} </p>
        <p>{content}</p>
      </div>
    </div>
  )
}
