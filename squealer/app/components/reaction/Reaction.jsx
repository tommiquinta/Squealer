'use client'
import LikeButton from './LikeButton.jsx';
import DislikeButton from './DisLikeButton.jsx';
import dynamic from 'next/dynamic.js';
import { useEffect, useState } from 'react';

function Reaction({ numLikes, numDislikes, hasLiked, hasDisliked, like, dislike, disable }) {
    //per ora non quadra
    const [isLiked, setIsLiked] = useState(hasLiked ? true : false)
    const [isDisliked, setIsDisliked] = useState(hasDisliked ? true : false)

    function handleDislike(isDiliked){
        if(isDiliked){
            //console.log("qui gestisci che deve aggiungere un dislike");
            //aggiungi dislike
            handleLike(false)
        } else {
         //   console.log("qui gestisci il fatto che ha tolto il dislike");
            //rimuovi dislike
            setIsDisliked(false);
            console.log("dislike: "+isDiliked);
        }
    }

    function handleLike(isLiked){
        if(isLiked){
          //  console.log("qui gestisci che deve aggiungere un like");
            //aggiungi like
            handleDislike(false)
        } else {
         //   console.log("qui gestisci il fatto che ha tolto il like");
            //rimuovi like
            setIsLiked(false);
            console.log("like: "+isLiked);
        }
    }


    //tutta sta roba va passata nel componete che lo richiama, tramite like e dislike -> qui no supabase
   /* async function addLike() {
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
    } */

    return (
        <div className='w-full h-[30px] gap-2 flex items-center'>
            <LikeButton
                hasLiked={isLiked}
                handleLikes={() => handleLike(!isLiked)}
                count = {numLikes} 
                toDisable={disable}
               />
            <DislikeButton
                key={isDisliked}
                hasDisliked={isDisliked}
                handleDislike={() => handleDislike(!isDisliked)} 
                count={numDislikes}
                toDisable={disable}/>
            {/* inserisci views */}
        </div>
    );
}

export default Reaction;
