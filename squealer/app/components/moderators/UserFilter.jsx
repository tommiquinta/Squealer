'use client';
import { useState } from "react";
import Card from '../Card';

export default function UserFilter({filter}){

    const [filterName, setFilterName] = useState('');
    const [filterModerator, setFilterModerator]=useState(false);

    function sendSearch(){
        filter(filterName, filterModerator);
    }

    return(
        <div className="w-full absolute top-36 md:top-[unset] md:w-fit md:fixed md:right-0">
            <Card >
                <div className="flex flex-col gap-2 p-2">
                    <p className="text-center">Filter user&apos;s list</p>
                <label className="text-sm text-slate-400">Search by name or username:</label>
                <input type="text" value={filterName} placeholder="Insert name" onChange={(e) => setFilterName(e.target.value)}
                className="border-2 rounded border-slate-200 px-2"/>
                
                <div className="flex gap-2 items-center">
                <label className="text-sm text-slate-400">Show only moderators:</label>
                <input type="checkbox" name="areModerators" value={filterModerator} onClick={() => setFilterModerator(!filterModerator)}/>
                </div>
                <button type="submit" onClick={sendSearch} className="text-white bg-socialBlue rounded w-fit mx-auto px-2 py-1 ">Search using filter</button>
                </div>
            </Card>
        </div>

    );
}