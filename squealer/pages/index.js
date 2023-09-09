import PostFormCard from '@/app/Components/Post-Media/FormPostCard.jsx'
import Layout from '@/app/Components/Layout'
import PostCard from '@/app/Components/Post-Media/PostCard'
import Header from '@/app/Components/Header'
import Preloader from '@/app/Components/Preloader'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const session = useSession()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [user, setUser] = useState(null) // user è a null per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader

  const [loading, setLoading] = useState(true) // loading è a true per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader
  const [postFormLoading, setPostFormLoading] = useState(true)


  const isGuest = session?.guest == null ? false : true;

  // to fill the homepage with posts:

  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState('')
  const [channels, setChannels] = useState()

  useEffect(() => { 
    async function fetchData() {
      try {
        await checkLocalStorage()
        const isLoggedIn = localStorage.getItem('isLogged');
        if (isLoggedIn === 'false') {
          router.push('/login');
          return;
        }
        await checkUsername()
        await fetchPosts()
        setLoading(false)
        setPostFormLoading(false) // se non ci sono errori, loading viene settato a false per evitare che venga mostrato il componente Preloader
      } catch (error) {
        console.log('Error fetching user data: ', error + " in useEffect Home")
        setLoading(false) // se c'è un errore, loading viene settato a false per evitare che venga mostrato il componente Preloader
        setPostFormLoading(false) // se c'è un errore, setPostFormLoading viene settato a false per evitare che venga mostrato il componente Preloader
      }
    }

    fetchData()
  }, [])

  async function fetchPosts() {
    if (isGuest) {
      //deve filtrare i post e mettere solo quelli dei canali ufficiali
    }
    try {
      await supabase
        .from('posts')
        .select('id, content, created_at,photos, profiles(id, avatar, name)')
        .order('created_at', { ascending: false })
        .then(result => {
          setPosts(result.data)
        })
    } catch (error) {
      console.log('Error fetching posts:', error + " in fetchPosts in Home")
    }
  }


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

  async function checkUsername() {
    try {
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
      localStorage.setItem('username', username)
      console.log(username);

    }
  }

  const updateUserChannel = (showChannel) => {
    setChannels(showChannel);
  }


  const anythingIsLoading = postFormLoading || loading

  if (anythingIsLoading) {
    return <Preloader />;
  }

  return (
    <div className='flex'>
      {username ? (
        <Layout>

          <Header updatePost={updateUserChannel} />
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
