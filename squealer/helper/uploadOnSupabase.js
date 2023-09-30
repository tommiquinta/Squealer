import { resolve } from 'styled-jsx/css'

export async function uploadPhoto (
  supabase,
  userId,
  bucket,
  profileColumn,
  file
) {
  return new Promise(async (resolve, reject) => {
    const newName = Date.now() + file.name
    // console.log(data.path + " path  ");
    //not working need tommi 2:20
    const { data, error } = await supabase.storage.from(bucket).upload(newName)
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
        .eq('id', userId)
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
