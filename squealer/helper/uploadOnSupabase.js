export async function uploadPhoto(
  supabase,
  user,
  bucket,
  profileColumn,
  file
) {
  try {

    let url = ''
    const newName = Date.now() + file.name
    const result = await supabase.storage.from(bucket).upload(newName, file)

    if (result?.data) { url = process.env.NEXT_PUBLIC_SUPABASE_URL + `/storage/v1/object/public/${bucket}/` + result?.data.path }

    await supabase
      .from('profiles')
      .update({ [profileColumn]: url })
      .eq('id', user)
      .then((result) => {
        console.log(result, 'result')
      })
  } catch (error) {
    console.log(error, 'error in uploadPhoto')
  }
}
