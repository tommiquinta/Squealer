import NavigationBar from './NavigationBar'
import postcssConfig from '@/postcss.config'
import PublicChannelsList from './PublicChannelsList'
import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Layout ({ children, hidenavigation }) {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [publicChannels, setPublicChannels] = useState([])

  useEffect(() => {
    if (session) {
      fetchPublicChannels()
    }
  }, [session])

  function fetchPublicChannels() {
    supabase
      .from('public_channels')
      .select('id, name, banner, description, avatar, handle')
      .then(result => {
        setPublicChannels(result.data)
      })
  }

  return (
    <div className='md:flex mt-4 md:w-8/12 mx-auto gap-6 '>
      {!hidenavigation && (
        <div className='relative mx-2'>
          <NavigationBar />
        </div>
        
      )}
      <div
        className={
          hidenavigation
            ? 'w-full relative left-25%'
            : 'mx-2 relative top-36 md:top-0  md:mx-0 md:w-[57%] md:left-[23%] 2xl:left-[20%]'
        }
      >
        {children}
      </div>
      {!hidenavigation && (
          <div className='px-4 relative md:left-[23%] 2xl:left-[21%]'>
                <PublicChannelsList publicChannels={publicChannels} />
          </div>
       )}
    </div>
  )
}
