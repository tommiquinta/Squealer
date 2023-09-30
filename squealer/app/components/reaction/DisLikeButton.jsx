'use client'

import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import '/styles/DisLikeButton.css';



function DisLikeButton({ hasDisliked, count, toDisable }) {
  const thumbAnimation = useSpring({
    transform: hasDisliked ? 'scale(1.2)' : 'scale(1)',
    color: hasDisliked ? 'red' : 'gray',
  });


  return (
      <animated.button
        style={thumbAnimation}
        className="dislike-button flex gap-1 items-center"
        disabled={toDisable}
        type="submit" value={!hasDisliked}
      >
        <FaThumbsDown />
        {count}
      </animated.button>
  );
}

export default DisLikeButton;