'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function subscribe (channel_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('subscribe', {
    user_id: session?.user.id,
    channel_id: channel_id
  })
  if (error) {
    console.error('Erroreee durante la chiamata RPC:', error.message)
    return null
  }

  return null
}

export async function unsubscribe (channel_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('unsubscribe', {
    user_uuid: session?.user.id,
    channel_id: channel_id
  })
  if (error) {
    console.error('Errore durante la chiamata RPC:', error.message)
    return null
  }
  return null
}

export async function getChannelInfo (channel_handle) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('channels')
    .select('*, private_channels(*)')
    .eq('handle', channel_handle)

  if (error) {
    console.error('Errore durante la chiamata RPC:', error.message)
    return null
  } else {
    console.log(data)
    return data
  }
  return null
}
