import Avatar from '@/app/Components/Avatar'
import Card from '@/app/Components/Card'
import Layout from '@/app/Components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import PostCard from '@/app/Components/Post-Media/PostCard'
import LoginPage from './login'
import PostFormCard from '@/app/Components/FormPostCard'

export default function channel () {
  const session = useSession()

  if (!session) {
    return <LoginPage />
  }

  const router = useRouter()
  const { channelId } = router.query
  const [channelName, setChannelName] = useState([])
  const [channelHandle, setChannelHandle] = useState([])
  const [channelAvatar, setChannelAvatar] = useState([])
  const [channelBanner, setChannelBanner] = useState([])
  const [channelDescription, setChannelDescription] = useState([])
  const [posts, setPosts] = useState([])

  const supabase = useSupabaseClient()

  useEffect(() => {
    if (channelId && session) {
      fetchData()
      fetchChannelPosts()
    }
  }, [channelId, session])

  async function fetchData () {
    try {
      const { data, error } = await supabase
        .from('public_channels')
        .select()
        .eq('id', channelId)
        .single()

      if (data) {
        setChannelName(data.name)
        setChannelHandle(data.handle)
        setChannelAvatar(data.avatar)
        setChannelBanner(data.banner)
        setChannelDescription(data.description)
      }

      if (error) {
        console.error('Error fetching channel data:', error)
      }
    } catch (error) {
      console.error('Error fetching channel data:', error)
    }
  }

  async function fetchChannelPosts () {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(
          'id, content, created_at,photos, profiles(id, avatar, name), public_channel'
        )
        .eq('public_channel', channelId)
        .order('created_at', { ascending: false })

      if (data) {
        setPosts(data)
      }

      if (error) {
        console.error('Error fetching channel posts:', error)
      }
    } catch (error) {
      console.error('Error fetching channel posts:', error)
    }
  }

  return (
    <div className='flex'>
      <Layout>
        <Card noPadding={true}>
          {/* banner */}
          <div className='h-40 overflow-hidden flex justify-center items-center rounded-md'>
            <img src={channelBanner} />
          </div>
          <div className='absolute top-28 left-1/2 transform -translate-x-1/2 rounded-full bg-white border-8 border-white'>
            <Avatar size={'big'} url={channelAvatar} />
          </div>
          <div className='pt-16 pb-2 font-sans text-4xl font-semibold text-center text-gray-800'>
            {channelName}
          </div>
          <div className='pb-1 font-sans text-xl text-center text-gray-500'>
            §{channelHandle}
          </div>
          <div className='pb-2 font-sans text-lg text-center text-gray-400'>
            2k iscritti - still to handle
          </div>
          <hr />
          <div className='pt-2 pb-2 font-sans text-md text-center text-gray-400'>
            {channelDescription}
          </div>
        </Card>
        <PostFormCard />

        <div className='pb-2 font-sans text-sm text-center text-gray-400'>
          Here below are gonna be listed all squeals shared to this channel.
        </div>

        {posts?.length > 0 &&
          posts.map(post => <PostCard key={post.id} {...post} />)}
      </Layout>
    </div>
  )
}
