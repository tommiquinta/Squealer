'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function createPost (
  content,
  photos,
  receiver_channel,
  receiver_user
) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('create_generic_post', {
    author_id: session?.user.id,
    post_content: content,
    post_photos: photos
  })
  if (error) {
    console.error('Erroreee durante la chiamata RPC:', error.message)
    return null
  }

  return null
}
