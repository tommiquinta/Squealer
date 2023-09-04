import PostFormCard from '@/app/Components/Post-Media/FormPostCard'
import Layout from '@/app/Components/Layout'
import PostCard from '@/app/Components/Post-Media/PostCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const session = useSession()
  const router = useRouter();
  const supabase = useSupabaseClient()

  const [posts, setPosts] = useState([])
  const [userName, setUsername] = useState(null)

  useEffect(() => {
    if (session) {
      fetchPosts()
      checkUsername()
    }
  }, [session])

  function fetchPosts() {
    supabase
      .from('posts')
      .select('id, content, created_at,photos, profiles(id, avatar, name)')
      .order('created_at', { ascending: false })
      .then(result => {
        setPosts(result.data)
      })
  }

  async function checkUsername() {
    if (session) {
      const result = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)

      setUsername(result.data[0].username)
    }
  }

  

  const handleUsernameSubmit = async e => {
    e.preventDefault()

    const newUsername = e.target.username.value

    if (newUsername && session) {
      // Update the username in the database
      await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', session.user.id)

      // Update the local state
      setUsername(newUsername)
    }
  }

  return (
    <div className='flex'>
      {userName ? (
        <Layout>
          <PostFormCard onPost={fetchPosts} />
          {posts?.length > 0 &&
            posts.map(post => <PostCard key={post.id} {...post} />)}
          
        </Layout>
      ) : (
        <Layout hidenavigation={true}>
          <form onSubmit={handleUsernameSubmit}>
            <label>this must be fixed using css: its pretty ugly.</label>
            <br />
            <label>
              Insert your username:
              <input type='text' name='username' />
            </label>
            <button type='submit'>Submit</button>
          </form>
        </Layout>
      )}
      
    </div>
  )
}
