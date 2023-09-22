import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UsersCard from "./UsersCard";

export default async function UsersList({userId}){
    //userId è l'id dell'utente loggato
    const supabase = createServerComponentClient({ cookies })

    const profiles = await supabase.from('profiles').select('id, name, avatar, username').neq('id', userId);
  
    return( 
    <div className='grid grid-cols-4 items-baseline gap-x-4 items-center px-4 py-2'>
    {profiles.map(
      profile => (
        <UsersCard key={profile.id} {...profile} />
      )
    )}
    </div>
  );
}