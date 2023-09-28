"use client"
import Card from '../Card'
import moment from 'moment'
import Reaction from '../reaction/Reaction'
import Avatar from '../Avatar'
import Link from 'next/link'
import Media from './Media'

export default function PostCard({ post }) {
  const uploads = post?.photos
  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={`/profiles/${post?.username}`}>
            <span className='cursor-pointer'>
              <Avatar url={post?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={`/profiles/${post?.username}`}>
              <span className='font-semibold hover:underline cursor-pointer '>
                {post?.username}
              </span>{' '}
              shared a squeal
            </Link>
          </p>
          <p className='text-gray-500 text-sm'>
            {moment(post?.created_at).fromNow()}
          </p>
        </div>
      </div>

      <div className='my-4'>
        <p className='my-3 text-md'>{post?.content}</p>

        {uploads?.length > 0 && (
          <div
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'container',
            }}
            className='w-full h-full rounded-2xl bg-center'>

            <Media uploads={uploads} />
          </div>
        )}

      </div>

      <div className=''>
        <Reaction
          id={post.id}
          numLikes={post.likes}
          numDislikes={post.dislikes}
          hasLiked={post.hasLiked}
          hasDisliked={post.hasDisliked}
          disable={false}
        />
      </div>
    </Card>
  )
}