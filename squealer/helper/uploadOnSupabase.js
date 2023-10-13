'use server'
import { resolve } from 'styled-jsx/css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function uploadPhoto (
  supabase,
  bucket,
  profileColumn,
  file
) {
  return new Promise(async (resolve, reject) => {
    const newName = Date.now() + file.name
    const { data, error } = await supabase.storage.from(bucket).upload(newName)
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session }
    } = await supabase.auth.getSession()
    
    if (error) throw error
    if (data) {
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/storage/v1/object/public/${bucket}/` +
        data.path
      supabase
        .from('profiles')
        .update({
          [profileColumn]: url
        })
        .eq('id', session.user.id)
        .then(result => {
          if (!result.error && onChange) {
            resolve()
          } else {
            throw error
          }
        })
    }
  })
}
