import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Card from '../Card';
import Avatar from '../../Avatar';
import Media from './Media';
// import Reaction from './Reaction/Reaction';

export default function PostCard(
    {
        id,
        content,
        created_at,
        photos: uploads,
        profiles: authorProfiles
    }
) {
    const userID = localStorage.getItem('userId')

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

            <p className='my-5 text-md'>
                {content}
            </p>

            {uploads.length > 0 && (
                <div
                    style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'container',
                    }}
                    className='w-full h-full rounded-2xl bg-center'>
                    <Media uploads={uploads} />
                </div>
            )}

            {/* <div className='mt-5'>
                <Reaction postId={id} userId={userID} />
            </div> */}

        </Card >
    );
} 