"use client"

import Card from '../Card'
import moment from 'moment'
import Avatar from '../Avatar'
import Link from 'next/link'
import Media from './Media'
import PostContent from './PostContent'
import { updateView } from '../../../helper/squealsServerActions'

export default function PostCard({ post, children }) {
  const uploads = post?.photos;


  function increaseViews(){
      updateView(post?.id);
  }

  var color= null;

  switch (post.categoria){
    case 'pop':
      color="border-2 border-teal-700/50";
      break;
    case 'unpop':
      color="border-2 border-red-800/50 ";
      break;
    case 'contr':
      color="border-2 border-blue-600/50";
      break;
    default:
      color=null;
  }
  
  
  return (
    <Card add={color}>
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
      
          <PostContent callbackFn={increaseViews}>
            {post?.content}
          </PostContent>


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
        {children}
      </div>
    </Card>
  )
}
