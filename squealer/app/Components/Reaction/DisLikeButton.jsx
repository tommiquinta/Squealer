import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaThumbsDown } from 'react-icons/fa';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import "/styles/DisLikeButton.css";

function DisLikeButton({ id, onClick, updateReaction }) {
  const [isAlreadyDisLiked, setIsAlreadyDisLiked] = useState(false);
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    checkIfIsAlreadyDisLiked();
    myClick();
    update();
  }, []);


  function myClick() {
    onClick();
  }

  function update() {
    updateReaction();
  }

  const thumbAnimation = useSpring({
    transform: isAlreadyDisLiked ? 'scale(1.2)' : 'scale(1)',
    color: isAlreadyDisLiked ? 'red' : 'gray',
  });

  async function handleClick() {
    try {
      if (!isAlreadyDisLiked) {
        await setDisLike();
        if (isAlreadyLiked) {
          setIsAlreadyLiked(false);
        }
        // myClick();
      } else {
        await removeDisLike();
      }
      setIsAlreadyDisLiked(!isAlreadyDisLiked);

      // Aggiungi questa parte per deselezionare automaticamente Like
      if (isAlreadyLiked) {
        await removeLike();
        setIsAlreadyLiked(false);
      }
    } catch (error) {
      console.error("Errore al click " + error);
    }
  }

  async function checkIfIsAlreadyDisLiked() {
    try {
      await supabase
        .from('dislikes')
        .select()
        .eq('post_id', id)
        .eq('user_id', session.user.id)
          .then((res) => {
            setDislikes(res);
          });

      setIsAlreadyDisLiked(dislikes?.length > 0);
    } catch (error) {
      console.error("Errore nel prendere i dislike", error);
    }
  }

  async function removeDisLike() {
    try {
      await supabase
        .from('dislikes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', session.user.id);
    } catch (error) {
      console.error("Errore nella function di rimozione dei dislike " + error)
    }
  }

  async function setDisLike() {
    try {
      await supabase
        .from('dislikes')
        .insert({
          post_id: id,
          user_id: session.user.id,
        });
    } catch (error) {
      console.error("Errore nella function di aggiunta dei dislike " + error)
    }
  }

  async function removeLike() {
    try {

      await supabase
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', session.user.id);
    } catch (error) {
      console.error("Errore nella function di rimozione dei like " + error)
    }
  }

  return (

    <animated.button
      style={thumbAnimation}
      className="dislike-button"
      onClick={handleClick}
    >
      <FaThumbsDown />
    </animated.button>
  );
}

export default DisLikeButton;