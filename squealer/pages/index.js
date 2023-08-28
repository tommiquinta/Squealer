import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import PostCard from '@/app/Components/PostCard'
import Header from '@/app/Components/Header'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const session = useSession()
  const router = useRouter();
  const supabase = useSupabaseClient()
  

  const [posts, setPosts] = useState([])
  const [userName, setUsername] = useState(null)
  const [channels, setChannels] = useState()

  useEffect(() => {
    if (session) {
      setChannels(false)
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

  const updateUserChannel = (showChannel) => {
    setChannels(showChannel);
  }


  return (
    <div className='flex'>
      {userName ? (
        <Layout>
         <Header updatePost={updateUserChannel}/>
          {channels == false ? (
            <div>
              <PostFormCard onPost={fetchPosts} />
            
              {posts?.length > 0 &&
                posts.map(post => <PostCard key={post.id} {...post} />)}
            </div>
          ) : (
            <div>
              
              <h4>else should be getting post from channel</h4>
              
            </div>
          )}
          
        </Layout>
      ) : (
        <Layout hidenavigation={true}>
          <form onSubmit={handleUsernameSubmit} className='flex bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4'>
            <label className='text-gray-600'>
              Insert your username:
              <input type='text' name='username' />
            </label>
            <button type='submit' className='bg-socialBlue p-3 text-white'>Submit</button>
          </form>
        </Layout>
      )}
      
    </div>
  )
}
