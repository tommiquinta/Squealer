'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function updatePublicChannel (channel_id, newName, newDescription) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { error } = await supabase
  .from('public_channels')
  .update({ name: newName, description: newDescription })
  .eq('id', channel_id);

  if(error){
    console.log(error);
    return false;
  }

  return true;
}

export async function deleteChannel (channel_id) {
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { session }
    } = await supabase.auth.getSession()
  
    const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', channel_id);
  
    if(error){
      console.log(error);
      return false;
    }
  
    return true;
  }

export async function insertPublicChannel (newName, newDescription, newHandle, newAvatar, newBanner) {
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { session }
    } = await supabase.auth.getSession()
  
    const { data, error } = await supabase
    .from('channels')
    .insert({id: undefined, handle: newHandle})
    .select();
  
    console.log(data);
    if(error){
      console.log(error);
      return false;
    }

    const { errorPub } = await supabase
    .from('public_channels')
    .insert({id: data[0].id, name: newName, description: newDescription, avatar: newAvatar, banner: newBanner});

    if(errorPub){
      console.log(error);
      return false;
    }
  
    return true;
  }

export async function deletePost (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const response = await supabase
  .from('posts')
  .delete()
  .eq('id', post_id);

  console.log(response);

  if(response.error){
    console.log(error);
    return false;
  }

  return true;
}

export async function blockUserById(user_id){
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const adminAuthClient = supabase.auth.admin;
  

  const { data: user, error } = await supabase.auth.admin.updateUserById( user_id,
    { ban_duration : '48h' });

  console.log(user);
  console.log(error);

  if(error){
    return false;
  }

  return true;
}

export async function updateQuota(user_id, newQuota){
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()
  
  const result = await supabase.from('profiles').update({ daily_quota : newQuota }).eq('id', user_id);

  if(result.error){
    return false;
  }

  return true;
}