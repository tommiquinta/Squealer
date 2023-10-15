'use client'
import Card from '../Card'
import moment from 'moment'
import Avatar from '../Avatar'
import Reaction from '../reaction/Reaction'
import DeleteBtn from '../moderators/DeleteBtn'
import PostContent from './PostContent'
import { updateView } from '../../../helper/squealsServerActions'
import Link from 'next/link'
import Media from './Media'

export default async function PublicChannelsPost ({
  post,
  disableReaction,
  moderator,
  profile,
  userAvatar,
  children
}) {
  //se è un canale, metto le info del canale
  var info = null

  if (post.channel_id == null) {
    info = { username: post.username, avatar: post.avatar }
  } else {
    info = { username: post.channel_name, avatar: post.channel_avatar }
  }

  const uploads = post?.photos

  var color = null

  switch (post.categoria) {
    case 'pop':
      color = 'border-2 border-teal-700/50'
      break
    case 'unpop':
      color = 'border-2 border-red-800/50 '
      break
    case 'contr':
      color = 'border-2 border-blue-600/50'
      break
    default:
      color = null
  }

  return (
    <Card add={color}>
      <div className='flex gap-3'>
        <div>
          <Link href={'/channels/' + post.channel_id}>
            <span className='cursor-pointer'>
              <Avatar url={info?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={'/channels/' + post.channel_id}>
              <span className='font-semibold hover:underline cursor-pointer '>
                {info?.name ? info?.name : info?.username}
              </span>{' '}
              shared a squeal
            </Link>
          </p>
          <p className='text-gray-500 text-sm'>
            {moment(post.created_at).fromNow()}
          </p>
        </div>
      </div>

      <div className='my-4'>
        <PostContent callbackFn={updateView} postId={post.id}>
          {post.content}
        </PostContent>
      </div>

      {post.photos?.length > 0 && (
        <div
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'container'
          }}
          className='w-full h-full rounded-2xl bg-center'
        >
          <Media media={post?.photos} />
        </div>
      )}

      <div className='flex'>
        <Reaction
          id={post.id}
          numLikes={post.likes}
          numDislikes={post.dislikes}
          hasLiked={post.hasliked}
          hasDisliked={post.hasdisliked}
          disable={disableReaction}
          views={post.views}
          profile={profile}
          avatar={userAvatar}
        />
        {moderator && <DeleteBtn id={post.id} />}
      </div>
      {children}
    </Card>
  )
}
