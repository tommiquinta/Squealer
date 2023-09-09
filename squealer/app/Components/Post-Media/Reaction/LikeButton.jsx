import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsUp } from 'react-icons/fa';
import "@/styles/LikeButton.css";

function LikeButton({ active, onClick }) {
    
    const thumbAnimation = useSpring({
        transform: active ? 'scale(1.2)' : 'scale(1)',
        color: active ? 'green' : 'gray',
    });

    return (

        <button onClick={onClick}>
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
