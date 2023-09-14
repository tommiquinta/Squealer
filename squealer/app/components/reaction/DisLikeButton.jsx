"use client"

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import "@/styles/DisLikeButton.css";
import { removeLike, addDislike, removeDislike } from './reactions';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';


function DisLikeButton({ postsLiked, postsDisliked }) {

  const [active, setActive] = useState(false);
  const router = useRouter();

  const thumbAnimation = useSpring({
    transform: active ? 'scale(1.2)' : 'scale(1)',
    color: active ? 'red' : 'gray',
  });

  useEffect(() => {
    if (postsDisliked.user_has_disliked_tweet) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [postsDisliked.user_has_disliked_tweet])

  const handleDislikes = async () => {

    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (postsDisliked.user_has_disliked_tweet) {
        removeDislike()
      } else if (postsLiked.user_has_liked_tweet) {
        removeLike()
        addDislike()
      }
      router.refresh();
    }
  };

  return (

    <button onClick={handleDislikes}>
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