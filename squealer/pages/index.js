import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import PostCard from '@/app/Components/PostCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import LoginPage from './login'
import PublicChannelsList from '@/app/Components/PublicChannelsList'

export default function Home () {
  const session = useSession()

  if (!session) {
    return <LoginPage />
  }

  // to fill the homepage with posts:
  const [posts, setPosts] = useState([])
  const [userName, setUsername] = useState(null)
  const [publicChannels, setPublicChannels] = useState([])

  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchPosts()
    checkUsername()
    fetchPublicChannels()
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
      })
  }

  function fetchPublicChannels () {
    supabase
      .from('public_channels')
      .select('id, name, banner, description, avatar, handle')
      .then(result => {
        setPublicChannels(result.data)
        console.log(publicChannels)
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
      <div className='flex'>
        <Layout>
          {' '}
          <PostFormCard onPost={fetchPosts} />
          {posts?.length > 0 &&
            posts.map(
              (
                post // this is like a foreach to loop through the posts.
              ) => <PostCard key={post.id} {...post} />
            )}
        </Layout>
        <div className='mt-2 px-4 py-2 relative'>
          <PublicChannelsList publicChannels={publicChannels} />
        </div>
      </div>
    )
  } else {
    return (
      <Layout hidenavigation={true}>
        <form onSubmit={handleUsernameSubmit}>
          <label>this must be fixed using css: it's pretty ugly.</label>
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
