import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import PostCard from '@/app/Components/PostCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Home() {

  const session = useSession()
  const supabase = useSupabaseClient()

  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState('')

  useEffect(() => {
    checkUsername()
    fetchPosts()
    console.log(localStorage, "localStorage in useEffect");
  }, [])

  async function fetchPosts() {
    try {
      await supabase
        .from('posts')
        .select('id, content, created_at,photos, profiles(id, avatar, name)')
        .order('created_at', { ascending: false })
        .then(result => {
          setPosts(result.data)
        })

    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  async function checkUsername() {
    try {
      console.log(localStorage, "localStorage in checkUsername");
      if (localStorage.getItem('isLogged') === 'true') {
        await supabase
          .from('profiles')
          .select()
          .eq('id', localStorage.getItem('userId'))
          .single()
          .then(result => {
            setUsername(result.data.username)
            localStorage.setItem('username', username)
            localStorage.setItem('userId', session.user.id)
          })
          if (localStorage.getItem('isLogged' === 'false')) {
            router.push('/login') 
          }
      }
    } catch (error) {
      console.log('Error fetching user data: ', error)
    }
  }


  const handleUsernameSubmit = async e => {
    e.preventDefault()
    const newUsername = e.target.username.value

    if (newUsername && localStorage.getItem('isLogged') === 'true') {
      // Update the username in the database
      await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', localStorage.getItem('userId'))

      // Update the local state
      setUsername(newUsername)
    }
  }

  return (
    <div className='flex'>
      {username ? (
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
