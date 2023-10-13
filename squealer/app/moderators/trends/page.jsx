'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import PostCard from '../../components/media/PostCard';
import Reaction from '../../components/reaction/Reaction';
import NavigationBar from '../../components/layout/Navbar';
import Link from 'next/link';
import PublicChannelsPost from '../../components/media/PublicChannelsPost'


export default async function Trends(){
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

    console.log(moderator);
    
    if(! moderator.data){
      redirect("/");
    }


    const popularPost = await supabase.rpc('get_popular_posts', {
        user_uuid : session?.user.id
    });
    const popular = popularPost.data;


    const unpopularPost = await supabase.rpc('get_unpopular_posts', {
        user_uuid : session?.user.id
    });
    const unpopular = unpopularPost.data;


    return(
        <div className='flex gap-4 w-full flex-col md:flex-row'>
            <div className='flex-col gap-2'>
                <NavigationBar hasLoggedIn={true} sessionUsername={moderator.data[0].username} move={true}/>
                <Link href="/moderators" className='text-white flex gap-2 mx-2 py-1 px-2 md:py-3 bg-socialBlue hover:bg-opacity-20 hover:text-black md:-mx-10 md:-ml-12 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110 md:mt-96 md:relative absolute top-20 md:top-0' >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                Back</Link>
            </div>
            <div className='flex-col gap-2 md:w-5/12 md:ml-24'>
                <p className='text-slate-500 text-lg my-4 text-center flex gap-2 items-center justify-center'>Most Popular Posts
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 3.5h4v4"/><path d="M13.5 3.5L7.85 9.15a.5.5 0 0 1-.7 0l-2.3-2.3a.5.5 0 0 0-.7 0L.5 10.5"/>
                        </g></svg></p>
                {popular && (
                    popular.map(pop => 
                    pop.channel_id != null && pop.channel_name != null ? (
                        <PublicChannelsPost
                            key={pop.id}
                            post={pop}
                            disableReaction={false}
                            profile={moderator.data[0]}
                        ></PublicChannelsPost>
                    ) : (
                    <PostCard key={pop.id} post={pop}>
                        <Reaction
                        id={pop.id}
                        numLikes={pop.likes}
                        numDislikes={pop.dislikes}
                        hasLiked={pop.hasliked}
                        hasDisliked={pop.hasdisliked}
                        disable={false}
                        views={pop.views} />
                    </PostCard>))
                )}
            </div>
            <hr className='md:h-full md:w-[1px] border-x-2 rounded'/>
            <div className='flex-col gap-2 w-5/12 '>
                <p className='text-slate-500 text-lg my-4 text-center flex gap-2 items-center justify-center'>Most Unpopular Posts
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 14">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 10.5h4v-4"/>
                        <path d="M13.5 10.5L7.85 4.85a.5.5 0 0 0-.7 0l-2.3 2.3a.5.5 0 0 1-.7 0L.5 3.5"/>
                        </g></svg></p>
                {unpopular && (
                    unpopular.map(unpop => <PostCard key={unpop.id} post={unpop}>
                        <Reaction
                        id={unpop.id}
                        numLikes={unpop.likes}
                        numDislikes={unpop.dislikes}
                        hasLiked={unpop.hasliked}
                        hasDisliked={unpop.hasdisliked}
                        disable={false}
                        views={unpop.views} />
                    </PostCard>)
                )}
            </div>

        </div>
    )
}