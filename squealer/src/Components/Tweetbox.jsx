import React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Avatar } from '@mui/material';
import './CSS/Tweetbox.css';


// Queste enità servono per creare la StyledTextarea, ovvero una componente che si estende da sola qunado raggiunge la dimensione massima
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    background-color: inherit;
    border: none;
    color: inherit;        
    // firefox
    &:focus-visible {
        outline: 0;
    }
    // per evitare che compaia il simbolo per modificare manualmente la grandezza della textarea
    resize: none;
`
);

function Tweetbox() {
    return (
        <div className='TweetBox'>
            <form>
                <div className='text'>
                    <Avatar src='https://download.seaicons.com/icons/ph03nyx/super-mario/256/Yoshis-Egg-icon.png' />
                    <StyledTextarea aria-label="empty textarea" placeholder="What's happening?" />
                </div>
                <div className='box'>
                    <StyledTextarea aria-label="empty textarea" placeholder="Enter image URL" />
                </div>

            </form>

            <button className="bottone">TWEET</button>
        </div>
    );
}

export default Tweetbox;
