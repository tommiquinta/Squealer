import Layout from '@/app/Components/Layout'
import Card from '@/app/Components/Card'
import Avatar from '@/app/Components/Avatar'
import PostCard from '@/app/Components/PostCard'
import Cover from '@/app/Components/Cover'
import Link from 'next/link'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [profileUser, setProfile] = useState([])
  const [posts, setPosts] = useState([])
  const [isAuthor, setIsAuthor] = useState(false)
  const userId = router.query.id
  const selected = 'border-b-4 rounded-sm border-socialBlue text-sky-600 w-4'

  useEffect(() => {
    checkSessionStorage()
    try {
      if (sessionStorage.getItem('isLogged') === 'false') {
        router.push('/login')
      }
      fetchAll()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, []) // Include userId e session come dipendenze

  async function fetchAll() {
    try {
      await fetchUser()
      await fetchPosts()
      checkIfIsAuthor()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function fetchUser() {
    try {
      await supabase
        .from('profiles')
        .select()
        .eq('id', sessionStorage.getItem('userId'))
        .single()
        .then(result => {
          setProfile(result.data)
        })
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }


  async function checkSessionStorage() {
    try {
      if (sessionStorage.getItem('username') === null) {
        await supabase
          .from('profiles')
          .select('username')
          .eq('id', sessionStorage.getItem('userId'))
          .single()
          .then(result => {
            console.log(result)
            sessionStorage.setItem('username', result.data.username)
            // console.log(sessionStorage)
          })
      }
    } catch (error) {
      console.log('Error fetching user data: ', error)
    }
  }

  async function fetchPosts() {
    try {
      await supabase
        .from('posts')
        .select('id, content, created_at, photos, profiles(id, avatar, name, cover)')
        .eq('author', userId)
        .then(data => {
          setIsAuthor(true)
          setPosts(data)
        })

    } catch (error) {
      setIsAuthor(false)
      console.log('Error fetching user posts:', error)
    }
  }

  async function checkIfIsAuthor() {
    try {
      console.log(sessionStorage)
      setIsAuthor(userId === sessionStorage.getItem('userId'));
    } catch (error) {
      console.log('Error checking if is author:', error)
    }
  }

  return (
    <Layout>
      <Card noPadding={true}>
        <div className='relative'>
          <div>
            <Cover
              url={profileUser.cover}
              editable={isAuthor}
              onChange={fetchAll}
            />
          </div>
          <div className='z-20'>
            <div className='absolute top-28 left-4 '>
              <Avatar
                url={profileUser.avatar}
                size={'big'}
                editable={isAuthor}
                onChange={fetchAll}
              />
            </div>
            <div className='p-4 pb-2 items-left'>
              <div className='ml-28'>
                <h1 className='font-bold text-2xl'>
                  {`${profileUser && profileUser.name} `}
                </h1>
                <div className='text-gray-500 leading-4'>
                  {' '}
                  {`@${profileUser && profileUser.username} `}
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='mt-10 flex flex-col gap-0 items-center'>
                  <Link
                    href={'/#squeals'}
                    className={`flex gap-1 px-4 py-1 items-center`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      viewBox='0 0 14 14'
                    >
                      <g
                        fill='none'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      >
                        <rect width='9' height='4' x='1.5' y='1' rx='1' />
                        <rect width='9' height='4' x='4.5' y='8.5' rx='1' />
                      </g>
                    </svg>
                    Squeals
                  </Link>
                  <div className={`${selected}`}></div>
                </div>

                {isAuthor && (
                  <div className='mt-10 place-items-center self-center text-gray-400 float-right'>
                    <p>Remaining Quota: {`${profileUser.daily_quota}`}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      {
        //TODO: farli comparire solo quando sono nel link #squeals
      }
      <div className='my-8'>
        {posts?.length > 0 &&
          posts.map(
            (
              post // this is like a foreach to loop through the posts.
            ) => <PostCard key={post.id} {...post} />
          )}
      </div>
    </Layout>
  )
}
