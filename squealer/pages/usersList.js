import Card from '@/app/Components/Card'
import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import UsersCard from '@/app/Components/UserCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import LoginPage from './login'
import { useEffect } from 'react'

export default function UsersListPage () {
  const supabase = useSupabaseClient()
  const session = useSession()
  if (!session) {
    return <LoginPage />
  }
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    fetchProfiles()
  }, [])

  function fetchProfiles () {
    supabase
      .from('profiles')
      .select('id, name, avatar, username)')
      .neq('id', session.user.id)
      .then(result => {
        setProfiles(result.data)
      })
  }

  return (
    <Layout hidenavigation={false}>
      <div className='flex flex-col items-center px-4 py-2'>
        {profiles.map(
        (
          profile 
        ) => (
          <UsersCard key={profile.id} {...profile} />
        )
      )}
      </div>
    </Layout>
  )
}
