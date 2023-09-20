'use client'

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import "@/styles/DisLikeButton.css";



function DisLikeButton({ hasDisliked, handleDislike, count, toDisable }) {

  const [active, setActive] = useState(hasDisliked);


  // Aggiorna lo state 'active' quando 'hasDisliked' cambia
  useEffect(() => {
      setActive(hasDisliked);
  }, [hasDisliked]);


  const thumbAnimation = useSpring({
    transform: active ? 'scale(1.2)' : 'scale(1)',
    color: active ? 'red' : 'gray',
  });

  function clickDislikes() {
    setActive(active => !active);
    handleDislike(!active);

  }

  /*const router = useRouter();

  

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
  };*/

  return (
    <button onClick={() => clickDislikes()} disabled ={toDisable}>
      <animated.button
        style={thumbAnimation}
        className="dislike-button flex gap-1 items-center"
      >
        <FaThumbsDown />
        {count}
      </animated.button>
    </button>
  );
}

export default DisLikeButton;