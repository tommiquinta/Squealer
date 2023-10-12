'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NavigationBar from '../components/layout/Navbar'
import NotificationsPage from '../components/notifications/NotificationsPage'

export default async function Notifications () {
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) {
    redirect('/')
  }

  const loggedUsername = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session.user.id)

  const notifications = await supabase
    .from('notifications')
    .select('*')
    .eq('receiver', session.user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <NotificationsPage notifications={notifications}>
        <NavigationBar
          hasLoggedIn={session ? true : false}
          sessionUsername={loggedUsername.data[0].username}
        />
      </NotificationsPage>
    </div>
  )
}
