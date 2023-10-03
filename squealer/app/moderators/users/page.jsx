'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export default async function UsersModerator(){
    const supabase = createServerComponentClient({cookies});
  
    const {
      data: { session }
    } = await supabase.auth.getSession();
  
    if(!session){
      redirect("/");
    }
  
    const moderator = await supabase.rpc("get_moderator", {
      user_uuid: session?.user.id
    });
    
    if(! moderator.data){
      redirect("/");
    }


    return(
        <div>
        <p>Qui ci devo mettere un elenco degli utenti (quindi forse users list ma con più opzioni) </p>
        <p>Devo poter modificare la loro quota, aumentandola o dimunuendola</p>
        </div>
    );
}