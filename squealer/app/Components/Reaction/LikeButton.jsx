import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import DisLikeButton from './DisLikeButton';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import "/styles/LikeButton.css"
import { useState } from 'react';



function LikeButton(id) {

    useEffect(() => {
        checkIfIsAlreadyLiked();
    }, []);

    const [isAlreadyLiked, setIsAlreadyLiked] = useState();
    const session = useSession();
    const supabase = useSupabaseClient();

    const thumbAnimation = useSpring({
        transform: isAlreadyLiked ? 'scale(1.2)' : 'scale(1)',
        color: isAlreadyLiked ? 'green' : 'gray',
    });

    const handleClick = () => {
        try {
            if (!isAlreadyLiked) {
                setLike();
                console.log("ciao");
                <DisLikeButton isAlreadyDisLiked={false} /> // Deselect Dislike
            } else {
                removeLike(); // Deselect Like

            }
            setIsAlreadyLiked(!isAlreadyLiked);
            console.log(!isAlreadyLiked + " likeButton -> handleClick ");
        } catch (error) {
            console.error("Errore al click " + error)
        }
    };

    function removeLike() {
        supabase
            .from('likes')
            .delete()
            .eq('post_id', id)
            .eq('user_id', session.user.id);
    }

    function setLike() {
        supabase
            .from('likes')
            .insert({
                post_id: id,
                user_id: session.user.id,
            })
    }

    async function checkIfIsAlreadyLiked() {
        try {
            await supabase
                .from('likes')
                .select()
                .eq('post_id', id)
                .eq('user_id', session.user.id)
                .then((result) => {
                    setIsAlreadyLiked(result?.length > 0);
                });
            console.log(isAlreadyLiked + " check ");
        } catch (error) {
            console.error("Errore nel prendere i like", error)
        }
    }

    return (
        <div className='flex inline'>
            <div>
                <animated.button
                    style={thumbAnimation}
                    onClick={handleClick}
                    className="like-button"
                >
                    <FaThumbsUp />
                </animated.button>
            </div>
            <div>

            </div>
        </div>
    );
}

export default LikeButton;