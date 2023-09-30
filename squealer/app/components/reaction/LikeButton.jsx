'use client'

import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import '/styles/LikeButton.css';


function LikeButton({ hasLiked, handleLikes, count, toDisable }) {

    const thumbAnimation = useSpring({
        transform: hasLiked ? 'scale(1.2)' : 'scale(1)',
        color: hasLiked ? 'green' : 'gray',
    });

    return (
            <animated.button
                style={thumbAnimation}
                className="like-button flex gap-1 items-center"
                disabled={toDisable}
                type="submit" value={!hasLiked}
            >
                <FaThumbsUp />
                {count}
            </animated.button>
    );
}

export default LikeButton;