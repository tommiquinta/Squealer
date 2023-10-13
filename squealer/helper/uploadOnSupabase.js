'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function uploadPhoto (
  bucket,
  profileColumn,
  formFile
) {
  const supabase = createServerComponentClient({ cookies })
  const file = formFile.get('fileUpload');
  console.log('file')
  console.log(file)
  const {
    data: { session }
  } = await supabase.auth.getSession()
  const newName = Date.now() + file.name
  const { data, error } = await supabase.storage.from(bucket).upload(newName)
    
  
   
  console.log('data')
  console.log(data)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/storage/v1/object/public/${bucket}/` +
        data.path
      

  await supabase
        .from('profiles')
        .update({
          [profileColumn]: url
        })
        .eq('id', session.user.id)
        .then(result => {
          if (!result.error) {
            return true;
          } else {
            console.log(error);
          }
        })
}
