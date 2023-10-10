'use client';
import { useState } from "react";
import Card from '../Card';

export default function PrivChannelsFilter({filter}){

    const [filterByUsername, setByUsername] = useState('');
    const [filterByPosts, setFilterByPosts]= useState(0);

    function sendSearch(){
        filter(filterByUsername, filterByPosts);
    }

    return(
        <div className="fixed right-4 w-2/12">
            <Card >
                <div className="flex flex-col gap-2 p-2">
                    <p className="text-center">Filter channel's list</p>
                <label className="text-sm text-slate-400">Search by creator's username:</label>
                <input type="text" value={filterByUsername} placeholder="Insert name" onChange={(e) => setByUsername(e.target.value)}
                className="border-2 rounded border-slate-200 px-2"/>
                
                
                <label className="text-sm text-slate-400">Insert minimum of posts:</label>
                <input type="number" name="areModerators" value={filterByPosts} 
                onChange={(e) => setFilterByPosts(e.target.value)} className="px-2 border-2 rounded border-slate-200"/>
                
                <button type="submit" onClick={sendSearch} className="text-white bg-socialBlue rounded w-fit mx-auto px-2 py-1 ">Apply filter</button>
                </div>
            </Card>
        </div>

    );
}