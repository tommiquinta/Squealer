'use client'

import LikeButton from './LikeButton.jsx';
import DislikeButton from './DisLikeButton.jsx';
import { useState } from 'react';
import {addLike, addDislike} from '../../../helper/reactionServerActions.js';


function Reaction({id, numLikes, numDislikes, hasLiked, hasDisliked, disable, removeLike, removeDislike }) {

    const [isLiked, setIsLiked] = useState(hasLiked ? true : false)
    const [isDisliked, setIsDisliked] = useState(hasDisliked ? true : false)
    const [counterLikes, setCounterLikes] = useState(numLikes);
    const [counterDislikes, setCounterDislikes] = useState(numDislikes);

    //like
    async function handleLike(toLike){
        if(toLike){
            console.log("qui gestisci che deve aggiungere un like");
            if(!isLiked){
                setIsLiked(true);
                setCounterLikes(counterLikes => counterLikes + 1);
                handleDislike(false);   
                //aggiungi like
                await addLike(id); 
            }  
        } else {
            console.log("qui gestisci il fatto che ha tolto il like");
            //rimuovi like
            if (isLiked) {
                setCounterLikes(counterLikes => counterLikes - 1);
            }
            setIsLiked(false);
        }
    }
    //dislike
    async function handleDislike(toDislike){
        if(toDislike){
            console.log("qui gestisci che deve aggiungere un dislike");
            if(!isDisliked){
                setIsDisliked(true);
                setCounterDislikes(counterDislikes => counterDislikes + 1);
                handleLike(false);  
                //aggiungi dislike
                await addDislike(id);  
            }    
        } else {
            console.log("qui gestisci il fatto che ha tolto il dislike");
            //rimuovi dislike
            if (isDisliked) {
                setCounterDislikes(counterDislikes => counterDislikes - 1);
            }
            setIsDisliked(false);
        }
    }

    return (
        <div className='w-full h-[30px] gap-2 flex items-center'>
            <form action={handleLike}>
                <LikeButton
                    hasLiked={isLiked}
                    handleLikes={handleLike}
                    count = {counterLikes} 
                    toDisable={disable}
                />
            </form>
            
            <form action={handleDislike}>
                <DislikeButton
                    key={isDisliked}
                    hasDisliked={isDisliked}
                    count={counterDislikes}
                    toDisable={disable}/>
            </form>
            {/* inserisci views */}
        </div>
    );
}

export default Reaction;
