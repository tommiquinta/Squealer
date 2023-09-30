'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function addLike (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  await supabase.rpc('add_like', {
    postid: post_id,
    userid: session?.user.id
  })

  return null
}

export async function addDislike (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  await supabase.rpc('add_dislike', {
    postid: post_id,
    userid: session?.user.id
  })

  return null
}

export async function removeLike (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  await supabase.rpc('remove_like', {
    postid: post_id,
    userid: session?.user.id
  })

  return null
}

export async function removeDislike (post_id) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const result = await supabase.rpc('remove_dislike', {
    postid: post_id,
    userid: session?.user.id
  })
  console.log(result)
  return null
}
