import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import PrivateMessageContainer from './PrivateMessageContainer'
import { cookies } from 'next/headers'

export default async function PrivateMessagePage ({
  user_uuid,
  reveiver_uuid,
  children
}) {
  const supabase = createClientComponentClient({ cookies })

  var squeals = null
  squeals = await supabase.rpc('get_private_messages', {
    author_uuid: user_uuid,
    receiver_uuid: reveiver_uuid
  })

  return (
    <div className='w-[85%]'>
      {children}
      <div className='flex-col'>
        <PrivateMessageContainer squeals={squeals}></PrivateMessageContainer>
      </div>
    </div>
  )
}
