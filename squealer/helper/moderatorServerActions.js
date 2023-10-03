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