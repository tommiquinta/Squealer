'use client';
import { useState } from "react";
import { updateQuota } from "../../../helper/moderatorServerActions";

export default function EditQuota({quota, userId}){

    const [chars, setChars] = useState(quota);

    async function save(){
       const result = await updateQuota(userId, chars);
       if(result){
        alert("Daily quota has been changed");
       } else {
        alert("Somethign went wrong");
       }
    }

    return(
        <form  className="flex flex-col gap-1 p-2 text-left mx-auto" action={save}>
            <label htmlFor="quota" className="text-black">Current Quota:</label>
            <div className="flex">
            <input type="number" className="text-black text-center p-2 w-6/12" value={chars} onChange={(e) => setChars(e.target.value)}/>
            <button type="submit" className=" bg-socialBlue px-2 py-2 text-white w-fit rounded text-right self-end text-xs md:min-w-[81px]">Save Quota</button>
            </div>
        </form>
    );
}