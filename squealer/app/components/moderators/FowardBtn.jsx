'use client';
import { useState } from 'react';
import Card from '../Card';
import { addReceiver } from '../../../helper/moderatorServerActions';

export default function FowardBtn({post_id, channelList}){

    const [isOpen, setIsOpen]= useState(false);


    function foward(e, channel_id){
        e.preventDefault;
        console.log('condividi '+  post_id + ' su '+ channel_id);
        addReceiver(post_id, channel_id);
        setIsOpen(false);
    }


    return(
        <div>
            <button className='text-slate-400 absolute right-4 -translate-y-5' type='submit' onClick={() => setIsOpen((open) => !open)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="m20 12l-6.4-7v3.5C10.4 8.5 4 10.6 4 19c0-1.167 1.92-3.5 9.6-3.5V19l6.4-7z"/></svg>
            </button>

            {isOpen && (
                <Card add={'flex flex-col absolute right-[5%] md:-right-1/4 md:-translate-y-8 items-left z-30'}>
                    {channelList.map( channel =>
                        <button key={channel.id} onClick={(e) => foward(e, channel.id)}
                        className='text-left hover:bg-socialBlue/20 p-1 px-2 rounded'>§{channel.handle}</button>)}
                </Card>
            )}

        </div>
    );
}