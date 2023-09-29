'use client'

import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import '/styles/DisLikeButton.css';



function DisLikeButton({ hasDisliked, handleDislike, count, toDisable }) {
  const thumbAnimation = useSpring({
    transform: hasDisliked ? 'scale(1.2)' : 'scale(1)',
    color: hasDisliked ? 'red' : 'gray',
  });

  function clickDislikes() {
    handleDislike(!hasDisliked);
  }

  return (
    <animated.button
      onClick={clickDislikes}
      style={thumbAnimation}
      className="dislike-button flex gap-1 items-center"
      disabled={toDisable}
    >
      <FaThumbsDown />
      {count}
    </animated.button>
  );
}

export default DisLikeButton;