import Image from 'next/image'
import { Inter } from 'next/font/google'
import PostCard from '@/app/Components/PostCard'
import NavigationBar from '@/app/Components/NavigationBar'
import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginPage from './login'
import { useEffect, useState } from 'react'
import { Result } from 'postcss'

export default function Home () {
  const session = useSession()

  const isGuest = session?.guest == null ? false : true;

  // to fill the homepage with posts:
  const [posts, setPosts] = useState([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  function fetchPosts () {
    if(isGuest){
      //deve filtrare i post e mettere solo quelli dei canali ufficiali
    }
    supabase
      .from('posts')
      .select('id, content, created_at,photos, profiles(id, avatar, name)')
      .order('created_at', { ascending: false })
      .then(result => {
        setPosts(result.data)
      })
  }

  console.log('session ' + session)
  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout hidenavigation={false}>
      <PostFormCard onPost={fetchPosts} />
      {posts?.length > 0 &&
        posts.map(
          (
            post // this is like a foreach to loop through the posts.
          ) => <PostCard key={post.id} {...post} />
        )}
    </Layout>
  )
}
