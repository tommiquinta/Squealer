'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function createPost (content, photos) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var quota = await supabase
    .from('profiles')
    .select('daily_quota')
    .eq('id', session.user.id)

  if (
    quota.data[0].daily_quota >= content.length &&
    quota.data[0].daily_quota > 0
  ) {
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
}

export async function createDirectMessage (content, photos, receiver_user) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('create_direct_message', {
    author_id: session?.user.id,
    receiver_handle: receiver_user,
    post_content: content,
    post_photos: photos
  })
  if (error) {
    console.error('Erroreee durante la chiamata RPC:', error.message)
    return null
  }
  return null
}

export async function createPrivateChannelSqueal (
  content,
  photos,
  receiver_channel
) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  var isSub = null // variable to check wether the user is subscripted to the channel or not

  isSub = await supabase.rpc('get_private_subscription', {
    user_uuid: session?.user.id,
    channel_handle: receiver_channel
  })

  isSub = isSub.data ? true : false

  if (!isSub) {
    return false;

  } else {
    const { data, error } = await supabase.rpc(
      'create_private_channel_squeal',
      {
        author_id: session?.user.id,
        receiver_channel: receiver_channel,
        post_content: content,
        post_photos: photos
      }
    )
    if (error) {
      console.error('Errore durante la chiamata RPC:', error.message)
      return null
    } else {
      return true
    }
  }
  return null
}

export async function comment (content, post) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('comment', {
    author_id: session?.user.id,
    content: content,
    post: post
  })
  if (error) {
    console.error('Errore durante la chiamata RPC:', error.message)
    return null
  }
  return null
}

export async function getComments (post) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const { data, error } = await supabase.rpc('get_comments', {
    post_id: post
  })
  if (error) {
    console.error('Errore durante la chiamata RPC:', error.message)
    return null
  } else {
    return data
  }
  return null
}

export async function updateView (postId) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    const { data, error } = await supabase
      .from('impressions')
      .insert({ post_id: postId })

    if (error) {
      console.log(error)
      return false
    }
    return true
  } else {
    const { data, error } = await supabase
      .from('impressions')
      .insert({ post_id: postId, viewer_id: session.user.id })

    if (error) {
      if (error.code === '23505') {
        //means is duplicate key, and that's correct
        //so the user's view will not be saved twice
        return true
      }
      console.log(error)
      return false
    }
    return true
  }
}


export async function checkAndInsertPublic(content,
  photos,
  receiver_channel
  ){
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const isPublic = await supabase.from('public_channels').select('id, channels!inner(id)').eq('channels.handle', receiver_channel);
    
    if(isPublic.data?.length > 0){
      const isModerator = await supabase.from('moderators').select('id').eq('id', session.user.id);
      
      if(isModerator.data?.length > 0){
          const inserted = await supabase.from('posts').insert({
              author : session.user.id,
              content: content,
              photos: photos,
              channel_id : isPublic?.data[0].id
          })
          if(inserted.error){
            console.log(inserted.error);
          }
          return true;
      } 

    } 

    return false;
  }


  export async function getChannelInfo(channel_id){
    const supabase = createServerComponentClient({ cookies })
   const result = await supabase.from('public_channels').select('name, avatar').eq('id', channel_id);

   return result.data[0];
  }