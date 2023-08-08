import '@/styles/globals.css'
import {
  SupabaseClient,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import TimeAgo from 'javascript-time-ago'
import { useState } from 'react'
import it from 'javascript-time-ago/locale/it' 
import en from 'javascript-time-ago/locale/en' 

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(it);

export default function App ({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createClientComponentClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient} // Pass the created instance here
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
