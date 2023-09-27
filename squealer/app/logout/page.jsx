import { redirect } from 'next/navigation'
import {
  createServerActionClient,
  createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Lougout () {
  const supabase = createServerComponentClient()

  return <div>ciao</div>
}
