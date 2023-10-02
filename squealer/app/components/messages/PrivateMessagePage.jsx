import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import PrivateMessageContainer from './PrivateMessageContainer'
import { cookies } from 'next/headers'
import PostFormCard from '../media/PostFormCard'
import Card from '../Card'
import Avatar from '../Avatar'
import Link from 'next/link'

export default async function PrivateMessagePage ({
  user_uuid,
  reveiver_uuid,
  receiver_handle,
  recevier_info,
  children
}) {
  const supabase = createClientComponentClient({ cookies })

  var squeals = null
  squeals = await supabase.rpc('get_private_messages', {
    author_uuid: user_uuid,
    receiver_uuid: reveiver_uuid
  })

  var userObj = null
  userObj = await supabase.rpc('get_logged_user', {
    user_uuid: user_uuid
  })

  return (
    <div className='w-[85%]'>
      {children}
      <div className='flex-col ml-8 left-1/4 relative mb-5'>
        <Card>
          <div className='flex items-center'>
            <Link href={`/profiles/${recevier_info[0].username}`}>
              <span className='cursor-pointer'>
                <Avatar size={'medium'} url={recevier_info[0].avatar} />
              </span>
            </Link>
            <div>
              <p className='text-xl ml-5 font-bold'>{recevier_info[0].name}</p>
              <p className='text-md ml-5 text-gray-400'>
                @{recevier_info[0].username}
              </p>
            </div>
          </div>
        </Card>
        <hr />
      </div>

      {squeals.data ? (
        <div
          className='flex-col ml-8 left-1/4 relative mb-5'
          style={{ height: '400px', overflowY: 'auto' }}
        >
          <div className='h-300 overscroll-auto '>
            <p className='pb-2 mb-3 font-sans text-sm text-center text-gray-400'>
              This is the beginning of your conversation with{' '}
              {recevier_info[0].username}.
            </p>
            <PrivateMessageContainer
              squeals={squeals}
              author_uuid={user_uuid}
            ></PrivateMessageContainer>
          </div>
        </div>
      ) : (
        <div
          className='flex-col ml-8 left-1/4 relative mb-5'
          style={{ height: '400px', overflowY: 'auto' }}
        >
          <p className='pb-2 mb-3 font-sans text-sm text-center text-gray-400'>
            Nothing happened between you and
            {' ' + recevier_info[0].username}. So far.
          </p>
        </div>
      )}

      <div className='flex-col ml-8 left-1/4 relative mb-5'>
        <hr />
        <div className='bottom-0 mt-5 ml-30 flex-col relative'>
          <PostFormCard
            profile={userObj.data[0]}
            isDM={true}
            DM_receiver={receiver_handle}
          />
        </div>
      </div>
    </div>
  )
}
