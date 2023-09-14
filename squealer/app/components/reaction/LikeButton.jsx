"use client"
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import "@/styles/LikeButton.css";
import { addLike, removeLike, removeDislike } from './reactions';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


function LikeButton({ postsLiked, postsDisliked }) {

    const router = useRouter();
    const [active, setActive] = useState(false);

    const thumbAnimation = useSpring({
        transform: active ? 'scale(1.2)' : 'scale(1)',
        color: active ? 'green' : 'gray',
    });

    useEffect(() => {
        if (postsLiked.user_has_liked_tweet) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [postsLiked.user_has_liked_tweet])

    const handleLikes = async () => {

        const supabase = createClientComponentClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            if (postsLiked.user_has_liked_tweet) {
                removeLike()
            } else if (postsDisliked.user_has_disliked_tweet) {
                removeDislike()
                addLike()
            }
            router.refresh();
        }
    };




    return (

        <button onClick={handleLikes}>
            <animated.button
                style={thumbAnimation}
                className="like-button"
            >
                <FaThumbsUp />
            </animated.button>
        </button>

    );
}

export default LikeButton;