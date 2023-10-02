'use client'

import Card from '../Card'
import moment from 'moment'
import Avatar from '../Avatar'
import Link from 'next/link'
import Media from '../media/Media'

export default function PostCard ({ post, children, author_uuid }) {
  const uploads = post?.photos
  const date = new Date(post.created_at)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString(undefined, options)

  var isAuthor = false
  if (post.author.id == author_uuid) {
    isAuthor = true
  }
  return (
    <div
      className={`flex gap-3 ${
        isAuthor ? 'items-center flex-row-reverse' : 'items-center'
      }`}
    >
      <div>
        <Link href={`/profiles/${post?.author.username}`}>
          <span className='cursor-pointer'>
            <Avatar url={post?.author.avatar} />
          </span>
        </Link>
      </div>
      <Card>
        <div
          className={`flex gap-3 items-center ${
            isAuthor ? 'items-end flex-row-reverse' : ''
          }`}
        >
          <div>
            <p>{post?.content}</p>
          </div>
        </div>
        <div>
          <p className='text-gray-500 text-sm mt-5'>
            {date.getHours() + ':' + date.getMinutes() + ', ' + formattedDate}
          </p>
        </div>
      </Card>
    </div>
  )
}
