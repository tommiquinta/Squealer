import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ChannelPage from '../../components/channel/ChannelPage'
import NavigationBar from '../../components/layout/Navbar'

export default async function Channel ({ params }) {
  const supabase = createServerComponentClient({ cookies })

  var channelId = params?.id[0]

  if (isNaN(channelId)) {
    channelId = await supabase
      .from('channels')
      .select('id')
      .eq('handle', channelId)
    channelId = channelId.data[0].id
  }

  const {
    data: { session }
  } = await supabase.auth.getSession()

  var loggedUserInfo = null

  if (session) {
    loggedUserInfo = await supabase
      .from('profiles')
      .select('id, username')
      .eq('id', session.user.id)
    loggedUserInfo = loggedUserInfo.data[0].username
  }

  const isPrivate = await supabase
    .from('private_channels')
    .select('id')
    .eq('id', channelId)

  return (
    <ChannelPage
      channelId={channelId}
      user_uuid={session?.user.id}
      isPrivate={isPrivate.data.length > 0 ? true : false}
    >
      <NavigationBar
        hasLoggedIn={session ? true : false}
        sessionUsername={loggedUserInfo}
      />
    </ChannelPage>
  )
}
