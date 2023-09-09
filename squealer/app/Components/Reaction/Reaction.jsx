import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LikeButton from './LikeButton';
import DisLikeButton from './DisLikeButton';

const Reaction = ({ id }) => {

    useEffect(() => {
        checkUpdate();
    }, []);

    const [likeStatus, setLikeStatus] = useState(false);
    const [dislikeStatus, setDislikeStatus] = useState(false);
    const supabase = useSupabaseClient();
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    const handleLikeClick = () => {
        setLikeStatus(!likeStatus);
        setDislikeStatus(false);
    };

    const handleDislikeClick = () => {
        setDislikeStatus(!dislikeStatus);
        setLikeStatus(false);
    };

    async function checkUpdate() {
        await supabase
            .from('likes')
            .select()
            .eq('post_id', id)
            .then((res) => {
                setLikes(res.data.length);

            })
        await supabase
            .from('dislikes')
            .select()
            .eq('post_id', id)
            .then((res) => {
                if (res.data.length > 0) {
                    setDislikes(res.data.length);
                }
            })
    }


    return (
        <div className='flex inline gap-1.5'>
            <LikeButton
                id={id}
                onClick={handleLikeClick}
                active={likeStatus}
                updateReaction={checkUpdate}
            />
            {likes?.length}

            <DisLikeButton
                id={id}
                onClick={handleDislikeClick}
                active={dislikeStatus}
                updateReaction={checkUpdate}
            />
            {dislikes?.length}
        </div>
    );
};

export default Reaction;
