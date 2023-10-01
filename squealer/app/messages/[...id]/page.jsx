import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PrivateMessagePage from '../../components/messages/PrivateMessagePage'
import NavigationBar from '../../components/layout/Navbar'
export default async function Message ({ children, params }) {
  const recevierHandle = params.id[0]

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  var profile = session.user.id
  var loggedUserInfo = null
  var recevier_info = null
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

  try {
    recevier_info = await supabase
      .from('profiles')
      .select('id')
      .eq('username', recevierHandle)
    recevier_info = recevier_info.data[0].id
  } catch (error) {
    return <p>Error! {error}</p>
  }

  return (
    <PrivateMessagePage
      user_uuid={session.user.id}
      reveiver_uuid={recevier_info}
    >
      <NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo} />
    </PrivateMessagePage>
  )
}
