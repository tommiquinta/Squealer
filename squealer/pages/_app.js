import '@/styles/globals.css'
import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createClientComponentClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient} // Pass the created instance here
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
