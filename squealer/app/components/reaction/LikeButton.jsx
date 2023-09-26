'use client'

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import '../../../styles/LikeButton.css';


function LikeButton({ hasLiked, handleLikes, count, toDisable }) {
    const [active, setActive] = useState();

    useEffect(() => {
        setActive(hasLiked);
    }, [hasLiked]);

    const thumbAnimation = useSpring({
        transform: active ? 'scale(1.2)' : 'scale(1)',
        color: active ? 'green' : 'gray',
    });

    function clickLike(){ 
        setActive(active => !active);
        handleLikes(!active);
    }

    return (
        <animated.button
            onClick={() => clickLike()}
            style={thumbAnimation}
            className="like-button flex gap-1 items-center"
            disabled={toDisable}
        >
            <FaThumbsUp />
            {count}
        </animated.button>
    );
}

export default LikeButton;