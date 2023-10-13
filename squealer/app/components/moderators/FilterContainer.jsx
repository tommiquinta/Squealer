'use client';
import UsersList from "../profile/UsersList";
import { useState } from "react";
import UserFilter from './UserFilter';


export default function FilterContainer({profiles}){

    const [hasFilter, setHasFilter] = useState(false);
    const [name, setName] =useState(null);
    const [moderator, setModerator] = useState(null);

    function search(byName, isModerator){ 
        setName(byName === '' ? null : byName);
        setModerator(isModerator === '' ? null : isModerator);
      
        if( (moderator == null || moderator == false) && name == null){
            setHasFilter(false);
        } else{
            setHasFilter(true);
        }

    }


    return(
        <div className=' w-full md:w-10/12 flex md:flex-row flex-col'>
            <UsersList profiles={profiles.data} add={'w-full mt-48 md:mt-0 md:left-8'} 
            hasFilters={hasFilter} byName={name} isModerator={moderator}/>

            <UserFilter filter={search}/>
        </div>
    );
}