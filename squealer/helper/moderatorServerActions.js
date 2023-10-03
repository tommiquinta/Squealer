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