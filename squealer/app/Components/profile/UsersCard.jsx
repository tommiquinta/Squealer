'use client';
import Avatar from '../Avatar'
import Card from '../Card'
import Link from 'next/link'

export default function UsersCard (profile) {

  return (
    <div className='grow'>
      <Card>
        <div className='grow'>
          <div className='mb-5 '>
            <Link href={`/profile/${profile?.id}`} >
              <Avatar url={profile?.avatar} />
            </Link>
            
          </div>
          <hr />
          
          <div className='text-center mt-3 mb-3 font-semibold'>
            <Link href={`/profile/${profile?.id}`} >
              {profile?.name}
            </Link>
          </div>
          
          <hr />
          <div className='text-center mt-3 mb-10 text-gray-400 text-sm'>
            <Link href={`/profile/${profile?.id}`} >
             @{profile?.username}
            </Link>
          </div>
          <div className='mt-2 items-center text-center'>
            <Link
              href={`/privateMessage?username=${profile?.username}`}
              className='bg-blue-500 text-white px-6 py-2 rounded-lg'
            >
              Squeal
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}