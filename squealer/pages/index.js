import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import PostCard from '@/app/Components/PostCard'
import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import LoginPage from './login'

export default function Home() {
  const session = useSession()

  // to fill the homepage with posts:
  const [posts, setPosts] = useState([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  function fetchPosts() {
    supabase
      .from('posts')
      .select('id, content, created_at,photos, profiles(id, avatar, name)')
      .order('created_at', { ascending: false })
      .then(result => {
        setPosts(result.data)
      })
  }

  // console.log('session ' + session)
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
