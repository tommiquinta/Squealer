import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import LikeButton from './Reaction/LikeButton';
import DisLikeButton from './Reaction/DisLikeButton';
import Card from './Card';
import Avatar from './Avatar';
import Link from 'next/link';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


export default function PostCard(
  {
    id,
    content,
    created_at,
    photos,
    profiles: authorProfiles
  }
) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [likes, setLikes] = useState([]);
  const [dislikes, setDisLikes] = useState([]);
  const profile = {
    id,
    content,
    created_at,
    photos,
    profiles: authorProfiles
  };



  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      await checkUpdate()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // setInterval(checkUpdate, 5000); // Esegui checkUpdate ogni 5000 millisecondi (5 secondi)

  /** Aggiorna il numero di like e dislike */
  async function checkUpdate() {
    try {
      const likesResponse = await supabase
        .from('likes')
        .select()
        .eq('post_id', id)
      setLikes(likesResponse.data)

      const disLikeResponse = await supabase
        .from('dislikes')
        .select()
        .eq('post_id', id)
      setDisLikes(disLikeResponse.data)
    } catch (error) {
      console.error("Errore nel prendere i like e i dislike", error);
    }
  }

  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile'}>
            <span className='cursor-pointer'>
              <Avatar url={authorProfiles?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p>
            <Link href={'/profile'}>
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
          <div className=''>

            <LikeButton
              id={id}
            />
          </div>

          <span className=''>
            {likes?.length}
          </span>
        </div>

        <div className='flex inline gap-1.5'>
          <DisLikeButton
            supabase={supabase}
            session={session}
            profile={profile.id}
          />

          <span className=''>
            {dislikes?.length}
          </span>
        </div>
      </div>
    </Card>
  );
} 