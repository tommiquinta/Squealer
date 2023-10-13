import { useState } from "react"
import Card from "../Card";

export default function PostFilter({insertFilters, channelsList}){

    const [text, setText] = useState('');
    const [channel, setChannel] =useState(null);


    function sendFilters(){
        insertFilters(text, channel);
    }

    return(
        <Card add={'absolute md:left-[108%] md:mt-8 z-20'}>
        <form action={sendFilters} className="flex md:flex-col gap-2 text-slate-500">
            <div>
                <label htmlFor="content">Search by content:</label>
                <input type="text" id="content" value={text} placeholder="Insert words to search by" onChange={(e) => setText(e.target.value)}
                    className="rounded p-1 border-2 border-slate-500/50 text-sm"/>
            </div>
            <div>
            <label>Search by channel:</label>
            <select className="text-black rounded p-1 border-2 border-slate-500/50" defaultValue={null} onInput={(e) =>setChannel(e.target.value)}>
                <option value={null}>All channels</option>
               {channelsList.map(subChannel =>
                <option value={subChannel.id} key={subChannel.id}>§{subChannel.handle}</option>)}
            </select>
            </div>
            <button type="submit" className="text-white bg-socialBlue mx-auto px-2 py-1 rounded mt-2 flex items-center md:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="block ">
                <path fill="currentColor" d="M.75 3h14.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5ZM3 7.75A.75.75 0 0 1 3.75 7h8.5a.75.75 0 0 
                1 0 1.5h-8.5A.75.75 0 0 1 3 7.75Zm3 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"/></svg>
                <p className="hidden md:block">Filter posts</p>
            </button>
        </form>
        </Card>
    )

}