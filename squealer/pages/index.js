import Image from 'next/image'
import { Inter } from 'next/font/google'
import PostCard from '@/app/Components/PostCard'
import NavigationBar from '@/app/Components/NavigationBar'
import PostFormCard from '@/app/Components/FormPostCard'
import Layout from '@/app/Components/Layout'
import { useSession } from '@supabase/auth-helpers-react'
import LoginPage from './login'

export default function Home() {
  const session = useSession();
  console.log("session " + session);
  if(!session){
      return<LoginPage />
  }
  return (
        <Layout>
          <PostFormCard /> 
          <PostCard />
        </Layout>

  ) 
}