import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import "/styles/DisLikeButton.css"

const DisLikeButton = ({ disliked, onDisLikeClick, onLikeClick }) => {
  const thumbAnimation = useSpring({
    transform: disliked ? 'scale(1.2)' : 'scale(1)',
    color: disliked ? 'red' : 'gray',
  });

  const handleDisLikeClick = () => {
    if (!disliked) {
      onDisLikeClick();
      onLikeClick(false); // Deselect Like
    } else {
      onDisLikeClick(false); // Deselect Dislike
    }
  };

  return (
    <div>
      <animated.button
        style={thumbAnimation}
        onClick={handleDisLikeClick}
        className="dislike-button"
      >
        <FaThumbsDown />
      </animated.button>
    </div>
  );
}

export default DisLikeButton;

