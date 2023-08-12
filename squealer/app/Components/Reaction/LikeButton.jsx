import { useSpring, animated } from 'react-spring';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSession } from '@supabase/auth-helpers-react'
import React, { useState } from 'react';

import "/styles/LikeButton.css"

function LikeButton({ liked, onLikeClick, onDisLikeClick }) {
    const thumbAnimation = useSpring({
        transform: liked ? 'scale(1.2)' : 'scale(1)',
        color: liked ? 'green' : 'gray',
    });

    const handleLikeClick = () => {
        if (!liked) {
            onLikeClick();
            onDisLikeClick(false); // Deselect Dislike
        } else {
            onLikeClick(false); // Deselect Like
        }
    };

    return (
        <div>
            <animated.button
                style={thumbAnimation}
                onClick={handleLikeClick}
                className="like-button"
            >
                <FaThumbsUp />
            </animated.button>
        </div>
    );
}
export default LikeButton;