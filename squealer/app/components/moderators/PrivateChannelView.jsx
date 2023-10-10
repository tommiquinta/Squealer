'use client'
import { useState } from 'react'
import Card from '../Card'
import ChannelInfo from './ChannelInfo'
import ChannelProps from './ChannelProps'
import Link from 'next/link'
import {
  updatePrivateChannel,
  deleteChannel
} from '../../../helper/moderatorServerActions.js'
import { useRouter } from 'next/navigation'
import ChannelsFilterContainer from '../channel/ChannelsFilterContainer'
import PrivateChannelProps from './PrivateChannelProps'
import Avatar from '../Avatar'

export default function PrivateChannelView ({ channel }) {
  const router = useRouter()
  const [edit, setEdit] = useState(false)

  const buttonClasses =
    'text-white flex gap-2 py-1 px-2 md:px-4 mt-3 bg-socialBlue hover:bg-opacity-20 hover:text-black rounded-md hover:shadow-md shadow-gray-300 transition-all'

  async function saveProps (e, newName, newCreator) {
    e.preventDefault;
    
    setEdit(false)
    const result = await updatePrivateChannel(channel.id, newName, newCreator)
    if(result == 400){
      alert('This username does not correspond to any of our users, plase check and try again');
      return;
    }
    if (result) {
      alert('Updated Successfully!')
    } else {
      alert('Something went wrong!')
    }
  }

  //da tenere?
  async function deletingChannel () {
    const result = await deleteChannel(channel.id)
    if (result) {
      alert('Deleted Successfully!')

      router.refresh()
    } else {
      alert('Something went wrong!')
    }
  }

  return (
    <Card>
      <div className='flex gap-8 items-center justify-center'>
        <Avatar url={channel.avatar} size={'big'}/>
        <PrivateChannelProps channelName={channel.name} channelCreator={channel.creator} 
      handle={channel.handle} numPost={channel.num} editable={edit} save={saveProps}/>
      </div>
     
      <hr className='my-3' />

      <div className='flex w-full gap-8 justify-center'>
        <button className={buttonClasses} onClick={() => setEdit(true)}>
          Edit
        </button>
        <button
          className={`${buttonClasses} hover:bg-red-700 hover:bg-opacity-70`}
          onClick={() => deletingChannel()}
        >
          Delete
        </button>
      </div>
    </Card>
  )
}
