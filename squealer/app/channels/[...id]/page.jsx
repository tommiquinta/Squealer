import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ChannelPage from '../../components/channel/ChannelPage'
import NavigationBar from '../../components/layout/Navbar'

export default async function Channel ({ children, params }) {
  const channelId = params.id[0]

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  var profile = session.user.id
  var loggedUserInfo = null

  try {
    if (!loggedUserInfo) {
      loggedUserInfo = await supabase
        .from('profiles')
        .select('id, username')
        .eq('id', session.user.id)
      loggedUserInfo = loggedUserInfo.data[0].username
    }
  } catch (error) {
    return <p>Error! {error}</p>
  }

  return (
    <ChannelPage channelId={channelId} user_uuid={session.user.id}>
      <NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo} />
    </ChannelPage>
  )
}
