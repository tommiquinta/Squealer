import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NotFoundPage from '../../components/profile/noProfileAlert'

import ChannelPage from '../../components/channel/ChannelPage'
import NavigationBar from '../../components/layout/Navbar'
import { redirect } from 'next/navigation'

export default async function Channel ({ params }) {
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var channelId = params?.id[0]

  if (isNaN(channelId)) {
    channelId = await supabase
      .from('channels')
      .select('id')
      .eq('handle', channelId)
    if (!channelId.data[0]) {
      return <NotFoundPage />
    }

    channelId = channelId.data[0].id
  }

  var loggedUserInfo = null
  var userAvatar = null

  if (session) {
    loggedUserInfo = await supabase
      .from('profiles')
      .select('id, username, avatar')
      .eq('id', session.user.id)
    userAvatar = loggedUserInfo.data[0].avatar
    loggedUserInfo = loggedUserInfo.data[0].username
  }

  const isPrivate = await supabase
    .from('private_channels')
    .select('id')
    .eq('id', channelId)

  var isPrivateBool = null
  isPrivateBool = isPrivate?.data.length > 0 ? true : false

  if (isPrivateBool && !session) {
    redirect('/')
  }

  return (
    <ChannelPage
      channelId={channelId}
      user_uuid={session?.user.id}
      loggedUserInfo={loggedUserInfo}
      isPrivate={isPrivate.data.length > 0 ? true : false}
      userAvatar={userAvatar}
    >
      <NavigationBar
        hasLoggedIn={session ? true : false}
        sessionUsername={loggedUserInfo}
      />
    </ChannelPage>
  )
}
