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


/*
 //tolto da PstFormCard
  async function createPost () {
    if (content && content.trim() !== '') {
      if (content.includes('@')) {
        const regex = /@(\w+)/

        const match = regex.exec(content)
        if (match) {
          const receiverHandle = match[1]
          supabase
            .from('profiles')
            .select()
            .eq('username', receiverHandle)
            .then(response => {
              if (!response.error) {
                supabase
                  .from('direct_messages')
                  .insert({
                    author: profile.id,
                    receiver: response.data[0].id,
                    content: content,
                    photos: uploads
                  })
                  .then(response => {
                    if (!response.error) {
                      setContent('')
                      setUploads([])
                    }
                  })
              } else {
                console.log(response.error) // TO-DO: handle error
              }
            })
        }
      }

      if (content.includes('§')) {
        const regex = /§(\w+)/

        const match = regex.exec(content)

        if (match) {
          const receiverHandle = match[1]

          supabase
            .from('public_channels')
            .select()
            .eq('handle', receiverHandle)
            .then(response => {
              if (!response.error) {
                supabase
                  .from('posts')
                  .insert({
                    author: profile.id,
                    public_channel: response.data[0].id,
                    content: content,
                    photos: uploads
                  })
                  .then(response => {
                    if (!response.error) {
                      setContent('')
                      setUploads([])
                    }
                  })
              } else {
                console.log(response.error) // TO-DO: handle error
              }
            })
        }
      } else {
        // cheack if the post is not empty
        supabase
          .from('posts')
          .insert({
            author: profile.id, // in the database rules we have a check to control who actually clicks on "share"
            content,
            photos: uploads
          })
          .then(response => {
            if (!response.error) {
              setContent('')
              setUploads([])

              const newDailyQuota =
                profile.daily_quota - content.length - uploads.length * 125

              supabase
                .from('profiles')
                .update({
                  daily_quota: newDailyQuota
                })
                .eq('id', profile.id)
                .then(response => {
                  if (!response.error) {
                    setDaily_quota(newDailyQuota) // update local dailyQuota
                    location.reload() // penso si possa fare meglio di così
                  } else {
                    console.error('daily quota update error.', response.error)
                  }
                })

              if (onPost) {
                onPost() // function to fill home with posts in index.js
              }
            }
          })
      }
    } else {
      alert("A squeal with no content is a little useless, isn't it?")
    }
  }


 */
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
