'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export async function updatePublicChannel (channel_id, newName, newDescription) {
  const supabase = createServerComponentClient({ cookies })

  const { error } = await supabase
    .from('public_channels')
    .update({ name: newName, description: newDescription })
    .eq('id', channel_id)

  if (error) {
    console.log(error)
    return false
  }

  return true
}

export async function deleteChannel (channel_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', channel_id)

  if (error) {
    console.log(error)
    return false
  }

  return true
}

export async function insertPublicChannel (
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

  console.log(data)
  if (error) {
    console.log(error)
    return false
  }

  const { errorPub } = await supabase
    .from('public_channels')
    .insert({
      id: data[0].id,
      name: newName,
      description: newDescription,
      avatar: newAvatar,
      banner: newBanner
    })

  if (errorPub) {
    console.log(error)
    return false
  }

  return true
}

export async function deletePost (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const response = await supabase.from('posts').delete().eq('id', post_id)

  console.log(response)

  if (response.error) {
    console.log(error)
    return false
  }

  return true
}

export async function blockUserById (user_id) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SB_SERVICE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data: user, error } = await supabase.auth.admin.updateUserById(
    user_id,
    { ban_duration: '24h' }
  )

  if (error) {
    return false
  }

  return true
}

export async function listAll () {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SB_SERVICE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data: users, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.log(error)
  }

  return users
}

export async function updateQuota (user_id, newQuota) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const result = await supabase
    .from('profiles')
    .update({ daily_quota: newQuota })
    .eq('id', user_id)

  if (result.error) {
    return false
  }

  return true
}

export async function updateDefaultValue (newQuota) {
  const supabase = createServerComponentClient({ cookies })

  const { error } = await supabase
    .from('envs')
    .update({ value: newQuota })
    .eq('name', 'daily_quota')

  if (error) {
    console.log(error)
    return false
  }

  return true
}


export async function updatePrivateChannel (channel_id, newName, newCreator) {
  const supabase = createServerComponentClient({ cookies });

  const isUser = await supabase.from('profiles').select('username').eq('username', newCreator);

  if(isUser.data.length == 0){
    return 400;
  }

  const { error } = await supabase
    .from('private_channels')
    .update({ name: newName, creator: newCreator })
    .eq('id', channel_id)

  if (error) {
    console.log(error)
    return false
  }

  return true
}


export async function addReceiver(postId, receiverId){
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.rpc('add_receiver', { post_id : postId, new_channel_id : receiverId});

  if (error) {
    console.log(error)
    return false
  }

  return true
}