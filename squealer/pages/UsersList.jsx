import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/app/Components/Layout'
import UsersCard from '@/app/Components/UserCard'
import Preloader from '@/app/Components/Preloader'

export default function UsersListPage() {
  const supabase = useSupabaseClient()
  const [profiles, setProfiles] = useState([])
  const router = useRouter()
  const [loading, setLoading] = useState(true) // usato per il refresh della pagina
  const [userPage, setUserpage] = useState(null) // usato per il refresh della pagina

  useEffect(() => {
    async function fetchData() {
      try {
        await checkLocalStorage()
        const isLoggedIn = localStorage.getItem('isLogged')
        if (isLoggedIn === 'false') {
          router.push('/login')
          return
        }
        await fetchProfiles()
        setLoading(false) // caricamento completato
      } catch (error) {
        console.log('Error fetching data:', error + ' errore in fetchData')
        setLoading(false) // caricamento false anche se c'è un errore
      }
    }
    fetchData()
  }, [])

  async function checkLocalStorage() {
    try {
      if (localStorage.getItem('username') === null) {
        await supabase
          .from('profiles')
          .select('username')
          .eq('id', localStorage.getItem('userId'))
          .single()
          .then(result => {
            localStorage.setItem('username', result.data.username)
          })
      }
    } catch (error) {
      console.log('Error fetching user data: ', error)
    }
  }

  async function fetchProfiles() {
    try {
      await supabase
        .from('profiles')
        .select('id, name, avatar, username')
        .neq('id', localStorage.getItem('userId'))
        .then(result => {
          setProfiles(result.data)
        })
    } catch (error) {
      console.log('Error fetching profiles:', error + ' errore in fetchProfiles')
    }
  }
  
  if (loading) {
    console.log('fetchProfiles');
    return <Preloader />
  }

  return (
    <Layout hidenavigation={false}>
      <div className='grid grid-cols-4 items-baseline gap-x-4 items-center px-4 py-2'>
        {profiles.map(
          profile => (
            <UsersCard key={profile.id} {...profile} />
          )
        )}
      </div>
    </Layout>
  )
}
