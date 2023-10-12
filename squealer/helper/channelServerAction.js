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

export async function request_sub (channel_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('request_sub', {
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

export async function insertPrivateChannel (
  newName,
  newDescription,
  newHandle,
  newAvatar,
  newBanner
) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('channels')
    .insert({ id: undefined, handle: newHandle })
    .select()

  if (error) {
    console.log(error)
    return false
  } else {
    var id = data[0].id
    await insertPrivateChannelReal(
      id,
      newName,
      newDescription,
      newAvatar,
      newBanner
    )
  }
  return true
}

export async function insertPrivateChannelReal (
  id,
  newName,
  newDescription,
  newAvatar,
  newBanner
) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var profile = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session.user.id)

  profile = profile.data[0].username
  const { datapub, errorPub } = await supabase.from('private_channels').insert({
    id: id,
    name: newName,
    description: newDescription,
    avatar: newAvatar,
    banner: newBanner,
    creator: profile
  })
  console.log(datapub)

  if (errorPub) {
    console.log(error)
    return false
  } else {
    await subscribe(id)
  }

  return true
}
