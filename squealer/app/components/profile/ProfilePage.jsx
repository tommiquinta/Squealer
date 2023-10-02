import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
import ProfileContainer from './ProfileContainer'


export default async function ProfilePage({ children, profile, isMyUser }) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  var profileDB = await supabase
    .from('profiles')
    .select('*')
    .eq('username', profile)

  const user =
    profileDB.data && profileDB.data.length > 0 ? profileDB.data[0] : null

  if (!user) {
    return <p>i`&apos;`ve got no user</p>
  }
  //prendi solo gli squeals dell'utente
  var squeals = await supabase.rpc('get_user_posts', {
    logged_uuid: session.user.id,
    profile_username: user?.username
  })


  var moderator = false;
  if (isMyUser) {
    moderator = await supabase.from('moderators').select('*').eq('username', user.username);
  }

  return (
    <div className='w-[85%]'>
      {children}
      <ProfileContainer
        squeals={squeals}
        user={user}
        isMyUser={isMyUser}
        isModerator={moderator}
      >
      </ProfileContainer>
    </div>
  )
}
