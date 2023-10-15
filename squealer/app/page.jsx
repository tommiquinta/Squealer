'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PostCard from './components/media/PostCard'
import PublicChannelsPost from './components/media/PublicChannelsPost'
import NavigationBar from './components/layout/Navbar'
import SideWidget from './components/layout/SideWidget'
import { Suspense } from 'react'
import Preloader from './components/Preloader'
import PostFilterContainer from './components/media/PostFilterContainer'
import NewUsernameForm from './components/profile/NewUsernameForm'
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'
import Form from './components/media/Form'
import CommentsSection from './components/reaction/CommentsSection'

export default async function Home () {
  // Crea un oggetto supabase utilizzando createServerComponentClient e passa l'oggetto cookies come argomento
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const hasLoggedIn = session ? true : false
  var userObj = null //oggetto per passare le informazioni dell'user ai figli della home

  var squeals = null
  var channels = null

  const publicChannelsList = await supabase.rpc('get_public_list')

  if (!hasLoggedIn) {
    const publicSqueals = await supabase.rpc('get_public_only')

    squeals = publicSqueals
  } else {
    var user = session.user

    userObj = await supabase.rpc('get_logged_user', {
      user_uuid: user.id
    })

    if (!userObj.data || !userObj?.data[0].username) {
      return <NewUsernameForm id={userObj.data[0].id} />
    }

    squeals = await supabase.rpc('get_all_posts', {
      user_uuid: user.id
    })
    channels = await supabase.rpc('get_channels_list', { user_uuid: user.id })
  }

  return (
    <Suspense fallback={<Preloader />}>
      <NavigationBar
        hasLoggedIn={hasLoggedIn}
        sessionUsername={
          hasLoggedIn ? (userObj.data ? userObj.data[0].username : null) : null
        }
      />

      <div className=' md:ml-6 w-11/12 md:max-w-4xl gap-4 md:left-1/4 relative md:ml-0 md:flex md:w-11/12 lg:w-6/12 '>
        <div className={'mx-2 relative top-24 md:top-0 md:mx-0 w-full'}>
          {!hasLoggedIn &&
            squeals?.data?.map(publicPost => (
              <PublicChannelsPost
                key={publicPost.id}
                post={publicPost}
                disableReaction={true}
              />
            ))}

          {hasLoggedIn && userObj.data && (
            <div>
              <Form profile={userObj.data[0]} isPrivate={false} isHome={true} />
              <hr className='mb-5' />
              <PostFilterContainer
                allSqueals={squeals?.data}
                loggedUser={userObj.data[0]}
                channels={channels.data}
              />
            </div>
          )}
        </div>
      </div>
      <div className='absolute right-0 md:left-1/4 md:relative ml-2 mt-32 md:mt-2'>
        <SideWidget publicChannels={publicChannelsList.data} />
      </div>
    </Suspense>
  )
}
