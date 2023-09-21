import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth/auth-components/auth-button-server'
import { redirect } from 'next/navigation'
import NewTweet from './new-tweet'
import PostCard from './components/media/PostCard'
import PublicChannelsPost from './components/media/PublicChannelsPost'
import RootLayout from './layout'
import { Inter } from 'next/font/google'
import NavigationBar from './Components/layout/Navbar'

//const inter = Inter({ subsets: ['latin'] })


export default async function Home () {
  // Crea un oggetto supabase utilizzando createServerComponentClient e passa l'oggetto cookies come argomento
  const supabase = createServerComponentClient({ cookies })

  // Ottieni la sessione utente corrente da Supabase
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const hasLoggedIn = session ? true : false;

  // Ottieni tutti i post con dettagli aggiuntivi come profili utente associati e conteggio dei "mi piace"
  var squeals = null;

  const publicSqueals = await supabase.rpc('get_public_only');

  if(!hasLoggedIn){
    squeals = publicSqueals;

  } else {
    //TODO: passare il corretto parametro alla funzione
    var user = 'da sistemare';
    user.id = 2;
    squeals = await supabase.rpc('get_posts', {
      user_uuid : user.id
    })

    // squeals ora contiene in data un array json con:
    // id, created_at, author, content, photos, 
    // channel_id, likes (ovvero numero dei like per post), dislike (numero dei dislike per post), 
    // hasLiked (boolean true se l'utente ha messo like), hasDisliked (boolean true se l'utente ha messo dislike)
  }



  // Renderizza il componente Home con il pulsante di autenticazione, il componente per creare un nuovo tweet e la lista dei post
  console.log(squeals.data);
  console.log(hasLoggedIn);

  return (
        
        <RootLayout>  
        <NavigationBar hasLoggedIn={hasLoggedIn} />

         {/* <AuthButtonServer /> */} 
          <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 '>
            <div className={'mx-2 relative top-36 md:top-0  md:mx-0 md:w-9/12 md:left-1/4'}>
              {(!hasLoggedIn) && 
                squeals.data.map(post => <PublicChannelsPost key={post.id} post={post} disableReaction={true} /> )
              }
              
              { hasLoggedIn && squeals?.data?.length > 0 && (<NewTweet />) &&// Cambia questa riga
                squeals.data.map(post => { <PostCard key={post.id} {...post} /> })}
            </div>
          </div>
        </RootLayout>
  )
}
