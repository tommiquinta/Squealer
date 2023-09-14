import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import LikeButton from './LikeButton.jsx';
import DislikeButton from './DisLikeButton.jsx';
import dynamic from 'next/dynamic.js';

function Reaction({ post }) {
    const supabase = createClientComponentClient();
    const postId = post.id
    const userId = post.author

    let likeSelectedState = false;
    let dislikeSelectedState = false;


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
                        result?.data?.length > 0 ? setLikeSelected(true) : setLikeSelected(false);
                    })

                await supabase
                    .from('dislikes')
                    .select()
                    .eq('post_id', postId)
                    .eq('user_id', userId)
                    .then((result) => {
                        result?.data?.length > 0 ? setDislikeSelected(true) : setDislikeSelected(false);
                    })
            }
            fetchReactions();
        } catch (error) {
            console.log(error + 'Errore nel fetch dei like e dislike');
        }
    });

 
   

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
                onClick={likeClickHandler} />
            <DislikeButton
                active={dislikeSelected}
                onClick={dislikeClickHandler} />
        </div>
    );
}

export default Reaction;
