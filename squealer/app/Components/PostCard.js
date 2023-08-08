import Card from './Card'
import Avatar from './Avatar'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import React from 'react'
import moment from 'moment';


export default function PostCard ({content, created_at, profiles:profile}) { // profiles:propfile -> this is just to renname
  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile'}>
            <span className='cursor-pointer'>
              <Avatar url={profile?.avatar}/>
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={'/profile'}>
              <span className='font-semibold hover:underline cursor-pointer'>
                {profile?.name}
              </span>{' '}
              shared a squeal
            </Link>
          </p>
          <p className='text-gray-500 text-sm'>
             {moment(created_at).fromNow()}
          </p>
        </div>
      </div>
      <div>  
        <p className='my-3 text-md'>
          {content}
        </p>
      </div>
    </Card>
  )
}
