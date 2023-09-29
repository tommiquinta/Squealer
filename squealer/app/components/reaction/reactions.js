
export async function removeLike() {
    try {
        await supabase
            .from('likes')
            .delete()
            .eq('post_id', postId)
            .eq('user_id', userId)
            .then(() => {
                setLikeSelected(!likeSelected);
            })
    } catch (error) {
        console.log(error, 'Errore nel like');
    }
}

export async function removeDislike() {
    try {
        await supabase
            .from('dislikes')
            .delete()
            .eq('post_id', postId)
            .eq('user_id', userId)

    } catch (error) {
        console.log(error, 'Errore nel like');
    }
}


export async function addLike() {
    try {
        await supabase
            .from('likes')
            .upsert([
                {
                    post_id: postId,
                    user_id: userId
                }])
            .then(() => {
                setLikeSelected(!likeSelected);
            })
    } catch (error) {
        console.log(error, 'Errore nel like');
    }
}

export async function addDislike() {
    try {
        await supabase
            .from('dislikes')
            .upsert([
                {
                    post_id: postId,
                    user_id: userId
                }])
    } catch (error) {
        console.log(error, 'Errore nel like');
    }
}