'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NavigationBar from '../components/layout/Navbar'
import ChannelsFilterContainer from '../components/channel/ChannelsFilterContainer'

export default async function Explore () {
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) {
    redirect('/')
  }

  const privateChannelsList = await supabase
    .from('private_channels')
    .select('*, channels(handle)')

  const loggedUsername = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session.user.id)

  return (
    <div>
      <NavigationBar
        hasLoggedIn={true}
        sessionUsername={loggedUsername.data[0].username}
      />
      <ChannelsFilterContainer channels={privateChannelsList} />
    </div>
  )
}
