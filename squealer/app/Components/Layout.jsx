import NavigationBar from './NavigationBar'
import PublicChannelsList from './PublicChannelsList'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Preloader from './Preloader'

export default function Layout({ children, hidenavigation }) {
  const supabase = useSupabaseClient()
  const [publicChannels, setPublicChannels] = useState([])
  const [loading, setLoading] = useState(true) // loading è a true per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader
  const [user, setUser] = useState(null) // user è a null per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader



  useEffect(() => {
    async function checkLocalStorage() {
      try {
        setLoading(true)  // loading è a true per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader
        if (localStorage.getItem('isLogged') === 'false') {
          router.push('/login')
        }
        fetchPublicChannels()
        setLoading(false) // loading è a false per mostrare il contenuto della pagina
      } catch (error) {
        console.log(error + 'errore in useEffect in Layout.jsx')
        setLoading(false) // loading è a false per mostrare il contenuto della pagina
      }
    }
    checkLocalStorage()
  }, [])

  function fetchPublicChannels() {
    supabase
      .from('public_channels')
      .select('id, name, banner, description, avatar, handle')
      .then(result => {
        setPublicChannels(result.data)
      })
  }

  if (loading) {
    return <Preloader />
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
      
      <div className={rightColumnClasses}>
        {children}</div>

    </div>
  )
}
