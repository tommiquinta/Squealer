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

  if (!session) {
    return <LoginPage />
  }

  // to fill the homepage with posts:
  const [posts, setPosts] = useState([])
  const [userName, setUsername] = useState(null)

  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchPosts()
    checkUsername()
  }, [])

  function fetchPosts () {
    supabase
      .from('posts')
      .select('id, content, created_at,photos, profiles(id, avatar, name)')
      .order('created_at', { ascending: false })
      .then(result => {
        setPosts(result.data)
      })
  }

  async function checkUsername () {
    await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .then(result => {
        setUsername(result.data[0].username)
        console.log(userName)
      })
  }

  const handleUsernameSubmit = async e => {
    e.preventDefault()

    const newUsername = e.target.username.value

    if (newUsername) {
      // Update the username in the database
      await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', session.user.id)
        .then(result => {
          return <Home />
        })

      // Update the local state
      setUsername(newUsername)
    }
  }

  if (userName) {
    return (
      <Layout>
        <PostFormCard onPost={fetchPosts} />
        {posts?.length > 0 &&
          posts.map(
            (
              post // this is like a foreach to loop through the posts.
            ) => <PostCard key={post.id} {...post} />
          )}
      </Layout>
    )
  } else {
    return (
      <Layout hidenavigation={true}>
        <form onSubmit={handleUsernameSubmit}>
           <label>
            this must be fixed using css: it's pretty ugly.
          </label>
          <br></br>
          <label>
            Insert your username:
            <input type='text' name='username' />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </Layout>
    )
  }
}
