import { useState } from "react"
import Card from "../Card";

export default function PostFilter({insertFilters, channelsList}){

    const [text, setText] = useState('');
    const [channel, setChannel] =useState(null);


    function sendFilters(){
        insertFilters(text, channel);
    }

    return(
        <Card add={'absolute left-[108%] mt-8 z-20'}>
        <form action={sendFilters} className="flex flex-col gap-2 text-slate-500">
            <label htmlFor="content">Search by content:</label>
            <input type="text" id="content" value={text} placeholder="Insert words to search by" onChange={(e) => setText(e.target.value)}
                className="rounded p-1 border-2 border-slate-500/50 text-sm"/>

            <label>Search by channel:</label>
            <select className="text-black rounded p-1 border-2 border-slate-500/50" defaultValue={null} onInput={(e) =>setChannel(e.target.value)}>
                <option value={null}>All channels</option>
               {channelsList.map(subChannel =>
                <option value={subChannel.id} key={subChannel.id}>§{subChannel.handle}</option>)}
            </select>
            <button type="submit" className="text-white bg-socialBlue mx-auto px-2 py-1 rounded mt-2">Filter posts</button>
        </form>
        </Card>
    )

}