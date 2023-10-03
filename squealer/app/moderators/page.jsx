'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Square from '../components/moderators/Square'
import { redirect } from 'next/navigation';
import NavigationBar from '../components/layout/Navbar';


export default async function ModeratorSection () {
  const supabase = createServerComponentClient({cookies});
  
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if(!session){
    redirect("/");
  }

  const moderator = await supabase.rpc("get_moderator", {
    user_uuid: session?.user.id
  });
  
  if(! moderator.data){
    redirect("/");
  }

  //elenco utenti + ricerca
  //elenco post + ricerca
  //elenco canali privati
  return (
    <div className='w-full'>

    <NavigationBar hasLoggedIn={true} sessionUsername={moderator.data[0].username} move={true}/>
    
    <div className='text-center'>
      <p className='text-slate-400'>Welcome to your Moderator section!</p>

      <div className='p-5 grid gap-4 grid-cols-2 grid-rows-2 md:w-9/12 mx-auto'>
        
        <Square name={"Trends"} url={"/moderators/trends"} 
          description={"See what are the most popular and unpopular squeals running in this platform"}/>

        <Square name={"Public Channels"} url={'/moderators/pub-channels'} 
          description={"Here are all the channels managed by moderators, edit the infos or post a new squeal"}/>
  
        <Square name={"Users"} url={'/moderators/users'} 
          description={"Who are the squealers? See the list and reward (or punish them) editing thier quota"}/>
      
        <Square name={"Private Channels"} url={'/moderators/priv-channels'} 
          description={"Channels managed by the users, see their infos and edit them"}/>
        
        <Square name={"All Posts"} url={'/moderators/all'} 
          description={"See all posts and add them to the public channels"}/>
      </div>
    </div>
    </div>
  )
}