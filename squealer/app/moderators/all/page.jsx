'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import NavigationBar from '../../components/layout/Navbar';
import Link from 'next/link';
import PostCard from '../../components/media/PostCard';
import Reaction from '../../components/reaction/Reaction';


export default async function All(){
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

    const posts = await supabase.rpc('get_all_posts', {user_uuid : session?.user.id});


    return(
        <div className='flex gap-4'>
          <div className='flex-col gap-4 fixed'>
              <NavigationBar hasLoggedIn={true} sessionUsername={moderator.data[0].username} move={true}/>
              <Link href="/moderators" className='text-white flex gap-2 mx-2 py-1 px-2 md:py-3 bg-socialBlue hover:bg-opacity-20 hover:text-black md:-mx-10 md:-ml-12 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110 md:mt-80' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                    Back</Link>
          </div>

        <div className='flex flex-col gap-2 left-[20%] relative'>
          {posts?.data?.map( post =>

//crea nuova postcard per gestire categoria e possibilità di cambiare messaggio (colonna laterale)
          <PostCard post={post}>
            <Reaction
                id={post.id}
                numLikes={post.likes}
                numDislikes={post.dislikes}
                hasLiked={post.hasliked}
                hasDisliked={post.hasdisliked}
                disable={false}
            />
          </PostCard>

          )}
        </div>

        {//inserisci filtri
}
        </div>
        
    );

}