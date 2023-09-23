import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UsersCard from "./UsersCard";

export default async function UsersList({profiles}){
    //userId è l'id dell'utente loggato
    const supabase = createServerComponentClient({ cookies })
  
    return( 
    <div className='grid grid-cols-4 items-baseline gap-x-4 items-center px-4 py-2 left-1/4 relative'>
    {profiles?.map(
      profile => (
        <UsersCard key={profile.username} {...profile} />
      )
      )}
    </div>
  );
}