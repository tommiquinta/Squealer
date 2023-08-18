import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import LikeButton from './Reaction/LikeButton';
import DisLikeButton from './Reaction/DisLikeButton';
import Card from './Card';
import Avatar from './Avatar';
import Link from 'next/link';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function PostCard({
  id,
  content,
  created_at,
  photos,
  profiles: authorProfiles
}) {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDisLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisliked] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (isLiked && isDisLiked) {
      setIsDisliked(false);
    } else if (isDisLiked && isLiked) {
      setIsLiked(false);
    }
    checkUpdate()
    // console.log(session);
  }, [isLiked, isDisLiked]);


  // setInterval(checkUpdate, 50000); // Esegui checkUpdate ogni 5000 millisecondi (5 secondi)


  /** Aggiorna il numero di like e dislike */
  function checkUpdate() {
    // console.log(session.id);
    supabase
      .from('likes')
      .select()
      .eq('post_id', id)
      .then(result => setLikes(result.data))

    supabase
      .from('dislikes')
      .select()
      .eq('post_id', id)
      .then(result => setDisLikes(result.data))
  }

  function onLikeClick() {

    if (isLiked) {
      supabase
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', session.user.id)
        .then(() => {
          checkUpdate();
        });
      return; 
    }

    if (!isLiked) {
      supabase
        .from('likes')
        .insert({
          post_id: id,
          user_id: session.user.id,
        })
        .then(result => {
          checkUpdate();
        })
    }

  }

function onDisLikeClick() {
    if (isDisLiked) {
      supabase
        .from('dislikes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', session.user.id)
        .then(() => {
          checkUpdate();
        });
      return;
    }

    if (!isDisLiked) {
      supabase
        .from('dislikes')
        .insert({
          post_id: id,
          user_id: session.user.id,
        })
        .then(
          checkUpdate()
        )
    }
  }

  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile/'+ authorProfiles?.id}>
            <span className='cursor-pointer'>
              <Avatar url={authorProfiles?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={'/profile/'+ authorProfiles?.id}>
              <span className='font-semibold hover:underline cursor-pointer '>
                {authorProfiles?.name}
              </span>{' '}
              shared a squeal
            </Link>
          </p>
          <p className='text-gray-500 text-sm'>
            {moment(created_at).fromNow()}
          </p>
        </div>
      </div>

      <div className='my-4'>
        <p className='my-3 text-md'>
          {content}
        </p>

        <div className=''>
          {photos.length > 0 && (
            <div className='mt-4 flex justify-center items-center'>
              {photos.length === 4 ? (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        <img src={photos[0]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[1]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <img src={photos[2]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[3]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  <div className='flex justify-center items-center'>
                    <img src={photos[0]} className="w-auto rounded-md object-cover" alt="" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      <div className='flex inline gap-2.5'>

        <div className='flex inline gap-1.5'>

          <div className='' onClick={onLikeClick}>
            <LikeButton
              liked={isLiked}
              onLikeClick={() => setIsLiked(!isLiked)}
              onDisLikeClick={setIsDisliked}
            />
          </div>
          <span className=''>
            {likes?.length}
          </span>
        </div>

        <div className='flex inline gap-1.5'>

          <div className='' onClick={onDisLikeClick}>
            <DisLikeButton
              disliked={isDisLiked}
              onDisLikeClick={() => setIsDisliked(!isDisLiked)}
              onLikeClick={setIsLiked}
            />

          </div>
          <span className=''>
            {dislikes?.length}
          </span>
        </div>

      </div>

    </Card>
  );
} 