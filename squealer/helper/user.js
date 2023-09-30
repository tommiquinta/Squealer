export async function uploadUserProfileImage (
  supabase,
  userId,
  buckets,
  bucket,
  file
) {
  return new Promise(async (resolve, reject) => {
    try {
      const newName = Date.now() + file.name.trim()
      const uploadResult = await supabase.storage
        .from(buckets)
        .upload(newName, file)

      if (uploadResult.error) {
        console.error('Error uploading file:', uploadResult.error)
        resolve() // Resolve without further processing
        return
      }

      //  console.log("Upload result:", uploadResult);

      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/storage/v1/object/public/${buckets}/` +
        uploadResult.data.path

      const updateResult = await supabase
        .from('profiles')
        .update({
          [bucket]: url
        })
        .eq('id', userId)

      if (!updateResult.error) {
        console.log('Profile update successful:', updateResult)
        resolve()
      } else {
        console.error('Error updating profile:', updateResult.error)
        throw updateResult.error
      }
    } catch (error) {
      console.error('An error occurred:', error)
      reject(error) // Reject the promise with the error
    }
  })
}
