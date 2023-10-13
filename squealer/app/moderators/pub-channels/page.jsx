'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import NavigationBar from '../../components/layout/Navbar';
import Link from 'next/link';
import PublicChannelView from '../../components/moderators/PublicChannelView';
import AddChannel from '../../components/moderators/AddChannel';



export default async function PubChannels(){
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

    const channelsData = await supabase.from('public_channels').select('id, name, description, avatar, banner, channels(handle)');

    return(
        <div className='flex gap-4 w-full flex-col md:flex-row'>
            <div className='flex-col gap-2'>
                <NavigationBar hasLoggedIn={true} sessionUsername={moderator.data[0].username} move={true}/>
                <Link href="/moderators" className='text-white flex gap-2 mx-2 py-1 px-2 md:py-3 bg-socialBlue hover:bg-opacity-20 hover:text-black md:-mx-10 md:-ml-12 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110 md:mt-96 md:relative absolute top-20 md:top-0' >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                Back</Link>
            </div>
            <div className='flex-col gap-8 md:ml-[5%] md:w-9/12'>
                {channelsData && channelsData.data.map(
                    singleChannel => <PublicChannelView channel={singleChannel} key={singleChannel.id}/>
                )}
            </div>
            <div className='md:ml-3 md:-mr-32 md:w-4/12'>
                <AddChannel pvt={false}/>
            </div>
        </div>
    );
}