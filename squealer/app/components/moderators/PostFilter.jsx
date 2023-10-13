'use client'
import { useState } from "react"
import Card from "../Card";

export default function PostFilter({insertFilters, channelsList}){

    const [sender, setSender] = useState('');
    const [date, setDate] = useState('');
    //i privati non li può vedere, quindi filtra solo per tutti i canali
    const [channel, setChannel] = useState(null);



    function sendFilters(){
        insertFilters(sender, channel, date);
    }

    return(
        <Card add={'absolute w-full md:w-fit md:fixed md:left-3/4'}>
        <form action={sendFilters} className="flex flex-col gap-2 text-slate-500">
            <label htmlFor="content">Search by sender:</label>
            <input type="text" id="sender" value={sender} placeholder="Insert sender username" onChange={(e) => setSender(e.target.value)}
                className="rounded p-1 border-2 border-slate-500/50 text-sm"/>

            <label>Search by channel:</label>
            <select className="text-black rounded p-1 border-2 border-slate-500/50" defaultValue={null} onInput={(e) =>setChannel(e.target.value)}>
                <option value={undefined}>All channels</option>
               {channelsList.map(subChannel =>
                <option value={subChannel.id} key={subChannel.id}>§{subChannel.handle}</option>)}
            </select>

            <label htmlFor="date">Search by date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="rounded p-1 border-2 border-slate-500/50 text-sm"/>
            <button type="submit" className="text-white bg-socialBlue mx-auto px-2 py-1 rounded mt-2">Filter posts</button>
        </form>
        </Card>
    )

}