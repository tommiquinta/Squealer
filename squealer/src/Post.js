import React from "react";
import './Post.css';
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// il Post è una componente che avrà un nome e/o username, avatar, immagine, campo di testo e le reazioni come like, commento e retweet 

function Post(displayName, timestamp, img, text, avatar) {

    return (
        <div className="post">
            <div className="post-avatar">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcWlCcsgyfin38-AY6RkmLPTaVLoDTHWhRnACURoBJQ&s"></Avatar>
            </div>
            <div className="post-header">
                {/* <span className="username">username</span>
                <span className="timestamp">timestamp</span> */}
                <div>ormai è un meme spammare il simbolo di bitcoin ovunque, stacce</div>
            </div>
            {/* <div className="post-content">text</div> */}
            <div className="post-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwcWlCcsgyfin38-AY6RkmLPTaVLoDTHWhRnACURoBJQ&s"></img>
            </div>
            <div className="post-footer">
                <FavoriteBorderIcon fontsize="small" />
                <RepeatIcon fontsize="small" />
                <ChatBubbleOutlineIcon fontsize="small" />
                <BookmarkBorderIcon fontsize="small" />
                <ShareIcon fontsize="small" />
            </div>
        </div>
    )
};

export default Post;
