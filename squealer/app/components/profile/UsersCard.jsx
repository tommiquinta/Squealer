'use client'

import Avatar from '../Avatar'
import Card from '../Card'
import Link from 'next/link'
import EditQuota from '../moderators/EditQuota'
import BlockBtn from '../moderators/BlockBtn';

export default function UsersCard (profile) {

  return (
    <div className='grow'>
      <Card>
        <div className='grow'>
          <div className='mb-5 '>
            <Link href={`/profiles/${profile.username}`}>
              <Avatar url={profile?.avatar} />
            </Link>
          </div>
          <hr />

          <div className='text-center mt-3 mb-3 font-semibold'>
            <Link href={`/profiles/${profile.username}`}>{profile?.name}</Link>
          </div>

          <hr />
          <div className='text-center mt-3 mb-10 text-gray-400 text-sm flex-col'>
            <Link href={`/profiles/${profile.username}`}>
              @{profile?.username}
            </Link>
            {profile.is_moderator != undefined ? (
                <div className='flex flex-col'> 
                  <hr className='mt-2'/>
                  <EditQuota quota={profile.daily_quota} userId={profile.id}/>
                  <hr className='my-2'/>
                  <BlockBtn id={profile.id} blocked={profile.blocked}/>
                </div>
            ) : null }
          </div>
          <div className='mt-2 items-center text-center'>
            <Link
              href={`/messages/${profile?.username}`}
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
