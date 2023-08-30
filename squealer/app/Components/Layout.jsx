import NavigationBar from './NavigationBar'
import PublicChannelsList from './PublicChannelsList'
import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Layout({ children, hidenavigation }) {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [publicChannels, setPublicChannels] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('isLogged') === 'true') {
      fetchPublicChannels()
    }
  }, [])

  function fetchPublicChannels() {
    supabase
      .from('public_channels')
      .select('id, name, banner, description, avatar, handle')
      .then(result => {
        setPublicChannels(result.data)
      })
  }

  return (
    <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 '>
      {!hidenavigation && (
        <div className='relative'>
          <NavigationBar />
        </div>

      )}
      <div
        className={
          hidenavigation
            ? 'w-full relative left-25%'
            : 'mx-2 relative top-36 md:top-0  md:mx-0 md:w-9/12 md:left-1/4'
        }
      >
        {children}
      </div>
      {!hidenavigation && (
        <div className='px-4 relative md:left-1/4'>
          <PublicChannelsList publicChannels={publicChannels} />
        </div>
      )}
    </div>
  )
}
