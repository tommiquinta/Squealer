import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import LikeButton from './LikeButton';
import "/styles/DisLikeButton.css"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from 'react';


function DisLikeButton(id) {

  const [isAlreadyDisLiked, setIsAlreadyDisLiked] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const thumbAnimation = useSpring({
    transform: isAlreadyDisLiked ? 'scale(1.2)' : 'scale(1)',
    color: isAlreadyDisLiked ? 'red' : 'gray',
  });

  const handleClick = () => {
    try {
      if (!isAlreadyDisLiked) {
        setDisLike();
        console.log("ciao");
        <LikeButton isAlreadyLiked={false} /> // Deselect Dislike
      } else {
        removeDisLike(); // Deselect Like

      }
      setIsAlreadyDisLiked(!isAlreadyDisLiked);
      console.log(!isAlreadyDisLiked + " dislikeButton -> handleClick ");
    } catch (error) {
      console.error("Errore al click " + error)
    }
  };


  async function checkIfIsAlreadyDisLiked() {
    try {
      await supabase
        .from('dislikes')
        .select()
        .eq('post_id', id)
        .eq('user_id', session.user.id)
        .then(() => {
        });
      setIsAlreadyDisLiked(true);
    } catch (error) {
      console.error("Errore nel prendere i dislike", error)
    }
  }

  function removeDisLike() {
    supabase
      .from('dislikes')
      .delete()
      .eq('post_id', id)
      .eq('user_id', session.user.id);
  }

  function setDisLike() {
    supabase
      .from('dislikes')
      .insert({
        post_id: id,
        user_id: session.user.id,
      })
  }
  return (
    <div>
      <animated.button
        style={thumbAnimation}
        onClick={handleClick}
        className="dislike-button"
      >
        <FaThumbsDown />
      </animated.button>
    </div>
  );
}

export default DisLikeButton;