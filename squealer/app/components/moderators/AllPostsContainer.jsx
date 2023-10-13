'use client'
import { useState } from 'react';
import PostList from './PostList';
import PostFilter from './PostFilter';


export default function AllPostsContainer({posts, username, channels}){

    const [useFilter, setUseFilter] = useState(false);
    const [sender, setSender] = useState('');
    const [date, setDate] = useState(null);
    const [channel, setChannel] = useState(null);

    function filters(bySender, byChannel, byDate){
        console.log(bySender);
        console.log(byChannel);
        console.log(byDate);
        if(bySender === '' && (byChannel == null || byChannel==='All channels') && byDate== ''){
            setUseFilter(false);
            setDate(null);
            setSender('');
            setChannel(null);
        } else{
            setUseFilter(true);
            setDate(byDate);
            setSender(bySender);
            if(byChannel==='All channels'){
                setChannel(null)
            } else {
                setChannel(byChannel);
            }
        }

    }

    return(
        <div className='flex flex-col gap-2 relative md:w-8/12 mx-auto'>
            <PostList squeals={posts} loggedUser={username} hasFilter={useFilter} filterBySender={sender} filterByChannel={channel} filterDate={date} allChannels={channels}/>
            <PostFilter insertFilters={filters} channelsList={channels}/>
        </div>
    );
}