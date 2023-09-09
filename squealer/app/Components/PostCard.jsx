import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Reaction from './Reaction/Reaction';
import Card from './Card';
import Avatar from './Avatar';

export default function PostCard(
  {
    id,
    content,
    created_at,
    photos,
    profiles: authorProfiles
  }
) {

  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile/' + authorProfiles?.id}>
            <span className='cursor-pointer'>
              <Avatar url={authorProfiles?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={'/profile/' + authorProfiles?.id}>
              <span className='font-semibold hover:underline cursor-pointer '>
                {authorProfiles?.name}
              </span>{' '}
              shared a squeal
            </Link>
          </p>
          <p className='text-gray-500 text-sm'>
            {moment(created_at).fromNow()}
          </p>
        </div>
      </div>

      <div className='my-4'>
        <p className='my-3 text-md'>
          {content}
        </p>

        <div className=''>
          {photos.length > 0 && (
            <div className='mt-4 flex justify-center items-center'>
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
                  <div className='flex justify-center items-center'>
                    <img src={photos[0]} className="w-auto rounded-md object-cover" alt="" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      <div className=''>
        <Reaction
          id={id}
        />
      </div>

    </Card >
  );
} 