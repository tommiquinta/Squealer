import { useState, useEffect } from 'react';
import LikeButton from './LikeButton';
import DislikeButton from './DisLikeButton';
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Reaction({ postId, userId }) {
    const [likeSelected, setLikeSelected] = useState(false);
    const [dislikeSelected, setDislikeSelected] = useState(false);
    const supabase = useSupabaseClient();

    useEffect(() => {
        try {
            // Controllo che ci siano già like o dislike
            async function fetchReactions() {
                await supabase
                    .from('likes')
                    .select()
                    .eq('post_id', postId)
                    .eq('user_id', userId)
                    .then((result) => {
                        result.data.length > 0 ? setLikeSelected(true) : setLikeSelected(false);
                    })

                await supabase
                    .from('dislikes')
                    .select()
                    .eq('post_id', postId)
                    .eq('user_id', userId)
                    .then((result) => {
                        result.data.length > 0 ? setDislikeSelected(true) : setDislikeSelected(false);
                    })
            }
            fetchReactions();
        } catch (error) {
            console.log(error + 'Errore nel fetch dei like e dislike');
        }
    });

    const likeClickHandler = async () => {
        try {
            if (likeSelected)
                await removeLike();
            else
                await addLike();

            if (dislikeSelected)
                await removeDislike();

        } catch (error) {
            console.log(error, 'Errore nel like');
        }
    };

    const dislikeClickHandler = async () => {
        try {
            if (dislikeSelected)
                await removeDislike();
            else
                await addDislike();

            console.log(dislikeSelected);
            if (likeSelected)
                await removeLike();

            console.log('dislike cliccato');
        } catch (error) {
            console.log(error, 'Errore nel dislike');
        }
    };

    async function addLike() {
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

    async function addDislike() {
        try {
            await supabase
                .from('dislikes')
                .upsert([
                    {
                        post_id: postId,
                        user_id: userId
                    }])
                .then(() => {
                    setDislikeSelected(!dislikeSelected);
                })
        } catch (error) {
            console.log(error, 'Errore nel like');
        }
    }

    async function removeLike() {
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

    async function removeDislike() {
        try {
            await supabase
                .from('dislikes')
                .delete()
                .eq('post_id', postId)
                .eq('user_id', userId)
                .then(() => {
                    setDislikeSelected(!dislikeSelected);
                })
        } catch (error) {
            console.log(error, 'Errore nel like');
        }
    }

    return (
        <div className='w-full h-[30px] flex inline gap-2.5'>
            <LikeButton
                active={likeSelected}
                onClick={likeClickHandler}
            />
            <DislikeButton
                active={dislikeSelected}
                onClick={dislikeClickHandler}
            />
        </div>
    );
}

export default Reaction;
