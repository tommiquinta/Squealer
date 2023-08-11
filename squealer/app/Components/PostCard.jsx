import Card from './Card'
import Avatar from './Avatar'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import React from 'react'
import moment from 'moment';
import LikeButton from './LikeButton'

export default function PostCard({
  content,
  created_at,
  photos,
  profiles: profile }) { // profiles:propfile -> this is just to renname
  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile'}>
            <span className='cursor-pointer'>
              <Avatar url={profile?.avatar} />
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

      {/* Quando ho una sola foto */}
      {/* {photos?.length === 1 && (
          <div className='flex'>
          {photos.map(photo => (
            <div className='w-auto p-2' key={photo}>
                <img src={photo} className="w-full h-auto rounded-md" alt="" />
              </div>
            ))}
          </div>
        )} */}

      {/* Quando ho più di una foto */}
      {/* {photos?.length >= 2 && (
          <div className='flex'>
            {photos.map(photo => (
              <div className='w-2/4 p-2' key={photo}>
                <img src={photo} className="w-full h-auto rounded-md" alt="" />
              </div>
            ))}
          </div>
        )} */}

      <div className='my-4'>
        <p className='my-3 text-md'>
          {content}
        </p>

        <div className=''>
          {photos.length > 0 && (
            <div className='mt-4'>
              {photos.length === 4 ? (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        <img src={photos[0]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[1]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <img src={photos[2]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[3]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  {photos.map(photo => (
                    <div className='' key={photo}>
                      <img src={photo} className="w-auto h-40 rounded-md object-cover" alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className=''>
        <LikeButton />
      </div>

    </Card>
  )
}
