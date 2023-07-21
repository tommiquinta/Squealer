import React from "react";
import './Post.css';

import { Avatar } from "@mui/material";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// il Post è una componente che avrà un nome e/o username, avatar, immagine, campo di testo e le reazioni come like, commento e retweet 

// function Post({ props }) {
function Post({ username, img, text, avatar }) {
    return (
        <div className="post">
            <div className="avatar-container">
                <div className="avatar">
                    <Avatar src="https://download.seaicons.com/icons/ph03nyx/super-mario/256/Yoshis-Egg-icon.png" alt="Avatar"></Avatar>
                </div>
                <div className="avatar-username">Yoshi</div>
                {/* <div className="avatar-username">{username}</div> */}
            </div>
            <div className="tweet-content">
                SONO UN POST CARINISSIMO
            </div>
            {/* <div className="tweet-content">{text}</div> */}
            
            <div className="body">
                {/* <div className="img">{img}</div> */}
                <div className="img">
                    <img src="https://i.pinimg.com/originals/5a/3e/b0/5a3eb00df5875bd66cd2e9bc9abfd083.jpg" alt="Post Image"></img>
                </div>
            </div>
            <div className="footer">
                <FavoriteBorderIcon fontSize="small" className="icon" />
                <RepeatIcon fontSize="small" className="icon" />
                <ChatBubbleOutlineIcon fontSize="small" className="icon" />
                <BookmarkBorderIcon fontSize="small" className="icon" />
                <ShareIcon fontSize="small" className="icon" />
            </div>
        </div>
    )
};

export default Post;
