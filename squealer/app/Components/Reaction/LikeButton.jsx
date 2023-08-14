import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import "/styles/LikeButton.css";

function LikeButton({ id, onClick, active }) {
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
    const [isAlreadyDisLiked, setIsAlreadyDisLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const session = useSession();
    const supabase = useSupabaseClient();

    useEffect(() => {
        checkIfIsAlreadyLiked();
        myClick();
    }, []);

    function myClick() {
        onClick();
    }

    const thumbAnimation = useSpring({
        transform: isAlreadyLiked ? 'scale(1.2)' : 'scale(1)',
        color: isAlreadyLiked ? 'green' : 'gray',
    });

    async function handleClick() {
        try {
            if (!isAlreadyLiked) {
                await setLike();
                if (isAlreadyLiked) {
                    setIsAlreadyLiked(false);
                }
                // myClick(likes?.length);
            } else {
                await removeDisLike();
            }
            setIsAlreadyDisLiked(!isAlreadyDisLiked);

            // Aggiungi questa parte per deselezionare automaticamente Like
            if (isAlreadyLiked) {
                await removeLike();
                setIsAlreadyLiked(false);
            }
        } catch (error) {
            console.error("Errore al click " + error);
        }
    }

    async function checkIfIsAlreadyLiked() {
        try {
            await supabase
                .from('likes')
                .select()
                .eq('post_id', id)
                .eq('user_id', session.user.id)
                .then((res) => {
                    setLikes(res);
                })

            setIsAlreadyLiked(likes?.length > 0);

        } catch (error) {
            console.error("Errore nel prendere i like", error);
        }
    }

    async function removeDisLike() {
        try {
            await supabase
                .from('dislikes')
                .delete()
                .eq('post_id', id)
                .eq('user_id', session.user.id);
        } catch (error) {
            console.error("Errore nella function di rimozione dei dislike " + error)
        }
    }

    async function setLike() {
        try {
            await supabase
                .from('likes')
                .insert({
                    post_id: id,
                    user_id: session.user.id,
                });

        } catch (error) {
            console.error("Errore nella function di aggiunta dei like " + error)
        }
    }

    async function removeLike() {
        try {
            await supabase
                .from('likes')
                .delete()
                .eq('post_id', id)
                .eq('user_id', session.user.id);
        } catch (error) {
            console.error("Errore nella function di rimozione dei like " + error)
        }
    }


    return (

        <animated.button
            style={thumbAnimation}
            className="like-button"
            onClick={handleClick}
        >
            <FaThumbsUp />
        </animated.button>

    );
}

export default LikeButton;
