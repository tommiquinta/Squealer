'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Card from '../components/Card';
import PublicChannelsWidget from '../components/layout/PublicChannelsWidget';
import { redirect } from 'next/navigation';


export default async function ModeratorSection () {
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
  console.log(moderator);

  //trend
  //canali pubblici + modifica + aggiungi squeal + rimuovi squeal
  //elenco utenti + ricerca
  //elenco post + ricerca
  //elenco canali privati
  return (
    <div>
      <Card>
        <p>qui canali pubblici</p>
       {/*  {squeals &&
          squeals.map(publicChannel => (
            <PublicChannelsWidget channel={publicChannel} />
          ))} */}
      </Card>
      <Card>
        <p>
          qui i trend - select all from posts where count(like) maggiore di CM
        </p>
      </Card>
    </div>
  )
}