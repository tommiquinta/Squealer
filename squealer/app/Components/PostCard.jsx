import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Reaction from './Reaction/Reaction';
import Card from './Card';
import Avatar from './Avatar';
import Media from './Post-Media/Media';


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

        <Media photos={photos} />
      </div>

      <div className=''>
        <Reaction
          id={id}
        />
      </div>

    </Card >
  );
} 