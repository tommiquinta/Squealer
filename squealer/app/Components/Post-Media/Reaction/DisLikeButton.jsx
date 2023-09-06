import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import "@/styles/DisLikeButton.css";

function DisLikeButton({ active, onClick }) {

  const thumbAnimation = useSpring({
    transform: active ? 'scale(1.2)' : 'scale(1)',
    color: active ? 'red' : 'gray',
  });

  return (

    <button onClick={onClick}>
      <animated.button
        style={thumbAnimation}
        className="dislike-button"
      >
        <FaThumbsDown />
      </animated.button>
    </button>
  );
}

export default DisLikeButton;