'use client';

import { useState } from "react";
import Card from "../Card";
import { updateDefaultValue } from "../../../helper/moderatorServerActions";

export default function EditDefaultQuota({value}){

    var number = value[0].value;
  
    const [quota, setQuota] = useState(number);


    async function update(){
       const result = await updateDefaultValue(quota);
       if(result){
        alert("The default value for the daily quota has been updated successfully!");
       } else {
        alert( "Something went wrong");
       }
    }



    return (
        <div className="md:fixed right-2 top-72">
            <Card>
                <form className="flex flex-col gap-2" action={update}>
                    <label htmlFor="quotaInput">Default quota value:</label>
                    <input type="text" id="quotaInput" value={quota} onChange={(e) => setQuota(e.target.value)} className="border-2 rounded border-slate-200 px-2"/>
                    <button type="submit" className="text-white bg-socialBlue rounded py-1 px-2 m-2 mx-auto">Set new default value</button>
                </form>
            </Card>
        </div>
    );
}