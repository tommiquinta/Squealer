//pagina che visualizza l'elenco di tutti gli utenti
//vecchia userList

import Preloader from '../components/Preloader'
import UsersList from '../components/profile/UsersList'
import NavigationBar from '../components/layout/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function UsersListPage () {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  var userId = null
  if (session) {
    userId = session.user.id
  } else {
    redirect('/')
  }

  const profiles = await supabase
    .from('profiles')
    .select('id, name, avatar, username')
    .neq('id', userId)
  const username = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)

  return (
    <>
      <Suspense fallback={<Preloader />}>
        <NavigationBar
          hasLoggedIn={true}
          sessionUsername={username?.data[0].username}
        />
        <div className='md:relative md:left-1/4'>
        <UsersList profiles={profiles.data} />
        </div>
      </Suspense>
    </>
  )
}
