'use client';
import { useState } from 'react';
import Card from '../Card';
import ChannelInfo from './ChannelInfo';
import ChannelProps from './ChannelProps';
import Link from 'next/link';
import {updatePublicChannel, deleteChannel} from '../../../helper/moderatorServerActions.js';
import { useRouter } from 'next/navigation';


export default function PublicChannelView({channel}){
    const router = useRouter();
    const [edit, setEdit] = useState(false);

    const buttonClasses = "text-white flex gap-2 py-1 px-2 md:px-4 mt-3 bg-socialBlue hover:bg-opacity-20 hover:text-black rounded-md hover:shadow-md shadow-gray-300 transition-all"

    async function saveProps(e, newName, newDescr){
        setEdit(false);
        const result = await updatePublicChannel(channel.id, newName, newDescr);
        if(result){
            alert("Updated Successfully!");
        } else {
            alert("Something went wrong!");
        }
    }


    async function deletingChannel(){
        const result = await deleteChannel(channel.id);
        if(result){
            alert("Deleted Successfully!");
            
            router.refresh();
        } else {
            alert("Something went wrong!");
        }
    }

    return(
        <Card>
            <ChannelInfo avatar={channel.avatar } banner ={channel.banner} editable={edit}>
               <ChannelProps channelName={channel.name} 
                    channelDescription={channel.description} 
                    handle={channel.channels.handle}
                    editable={edit}
                    save={saveProps}/>
            </ChannelInfo>
            <hr className='my-3'/>

            <div className='flex w-full gap-8 justify-center'>
                <button className={buttonClasses} onClick={() => setEdit(true)}>Edit</button>
                <Link className={buttonClasses} href={`/channels/${channel.id}`}>Go Squeal</Link>
                <button className={`${buttonClasses} hover:bg-red-700 hover:bg-opacity-70`} onClick={() => deletingChannel()}>Delete</button>
            </div>

        </Card>
    );
}