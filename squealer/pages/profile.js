import Layout from "@/app/Components/Layout"
import Card from "@/app/Components/Card"
import Avatar from "@/app/Components/Avatar"
import Cover from "@/app/Components/Cover"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { use, useEffect, useState } from 'react'
import { useRouter } from "next/router"
import LoginPage from "./login"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import AllSqueals from "@/app/Components/AllSqueals"
import SelectedBar from "@/app/Components/SelectedBar"

export default function ProfilePage() {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  const [profileUser, setProfile] = useState([])
  const [posts, setPosts] = useState([])
  const [isModerator, setIsModerator] = useState(false)
  const [channels, setChannels] = useState([])
  const userId = router.query.id
  

  useEffect(() => {
    if (!userId) {
      <LoginPage />
    }
    fetchAll()
  }, [])

  function fetchAll() {
    fetchUser()
    fetchPosts()
  }

  function fetchUser() {
    supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .then(result => {
        if (result.error) {
          throw result.error
        }
        if (result.data) {
          setProfile(result.data[0])
        }
      })
  }

  function fetchPosts() {
    try {
      supabase
        .from('posts')
        .select('id, content, created_at,photos, profiles(id, avatar, name, cover)')
        .eq('author', userId)
        .then(result => {
          setPosts(result.data);
        })
      
    } catch (error) {
      console.error(error + " fetchPosts per prendere i post dell'utente")
    }

  }


  const isMyUser = userId === session?.user?.id
  if(isMyUser){
    try {
      supabase
        .from('moderators')
        .select('id')
        .eq('id', userId)
        .then(result => setIsModerator(true))
    } catch (error) {
      console.error(error + " trying to define if moderator")
    }
  }

  return (
    <Router>
    <Layout>
      <Card noPadding={true}>
        <div className="relative">
          <div>
            <Cover url={profileUser.cover} editable={isMyUser} onChange={fetchAll} />
          </div>
          <div className="z-20">
            <div className="absolute top-28 left-4 ">
              <Avatar url={profileUser.avatar} size={'big'} editable={isMyUser} onChange={fetchAll} />
            </div>
            <div className="p-4 pb-2 items-left">
              <div className="ml-28">
                <h1 className="font-bold text-2xl">
                  {`${profileUser && profileUser.name} `}</h1>
                <div className="text-gray-500 leading-4"> {`@${profileUser && profileUser.username} `}</div>
              </div>
              <div className="flex gap-2 mt-10 -mb-2">
                <div className="flex flex-col gap-1 items-center hover:bg-socialBlue/40 hover:py-1 hover:-mb-1 hover:rounded-t">
                  <Link to={`${userId}`} className={`flex gap-1 px-4 py-1 items-center`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                      viewBox="0 0 14 14">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="9" height="4" x="1.5" y="1" rx="1" />
                        <rect width="9" height="4" x="4.5" y="8.5" rx="1" /></g>
                    </svg>
                    Squeals
                  </Link>
                  <SelectedBar selected={false}/>
                </div>

                {isModerator && (
                  <div className="flex">
                     <div className="flex flex-col gap-1 items-center hover:bg-socialBlue/40 hover:py-1 hover:-mb-1 hover:rounded-t">
                     <Link to={`${userId}/channels`} className={`flex gap-1 px-4 py-1 items-center`} >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 17q.425 0 .713-.288T8 16q0-.425-.288-.713T7 15q-.425 0-.713.288T6 16q0 .425.288.713T7 17ZM7 7q-.425 0-.713.288T6 8v4q0 .425.288.713T7 13q.425 
                      0 .713-.288T8 12V8q0-.425-.288-.713T7 7Zm10 10q.425 0 .713-.288T18 16q0-.425-.288-.713T17 15h-5q-.425 0-.713.288T11 16q0 .425.288.713T12 17h5Zm0-4q.425 0 .713-.288T18 12q0-.425-.288-.713T17 
                      11h-5q-.425 0-.713.288T11 12q0 .425.288.713T12 13h5Zm0-4q.425 0 .713-.288T18 8q0-.425-.288-.713T17 7h-5q-.425 0-.713.288T11 8q0 .425.288.713T12 9h5ZM4 21q-.825 0-1.413-.588T2 19V5q0-.825.588-1.413T4 3h16q.825 
                      0 1.413.588T22 5v14q0 .825-.588 1.413T20 21H4Zm0-2h16V5H4v14Zm0 0V5v14Z"/></svg>
                    Channels
                  </Link>
                    <SelectedBar selected={false}/>
                  </div>
                  <div className="flex flex-col gap-1 items-center hover:bg-socialBlue/40 hover:py-1 hover:-mb-1 hover:rounded-t">
                  <Link to={`${userId}/moderators`} className={`flex gap-1 px-4 py-1 items-center`} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" 
                    d="M17 20c0-1.657-2.239-3-5-3s-5 1.343-5 3m14-3c0-1.23-1.234-2.287-3-2.75M3 17c0-1.23 1.234-2.287 3-2.75m12-4.014a3 3 0 1 0-4-4.472m-8 4.472a3 3 0 0 1 4-4.472M12 14a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"/>
                    </svg>
                    Moderators
                    </Link>
                    <SelectedBar selected={false}/>
                  </div>
                </div>
                )}
                {isMyUser && (
                  <div className=" place-items-center py-1 text-gray-400 float-right">
                    <p>Remaining Quota: {`${profileUser.daily_quota}`}</p>
                  </div>
                )}

                
              </div>
            </div>
          </div>

        </div>
      </Card>

      
      <Routes>
        <Route path={`${userId}`} element={<AllSqueals posts={posts}/>}/>
        <Route path={`${userId}/channels`} element={"PublicChannels"}/>
        <Route path={`${userId}/moderators`} element={<Card></Card>}/>
      </Routes>
      
    </Layout>
    </Router>
  )
}