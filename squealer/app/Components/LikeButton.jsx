import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'styles/LikeButton.css'; // Importa il file CSS dalla cartella corretta

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            {liked ? 'Liked' : 'Like'}
        </button>
    );
};


export default LikeButton;
