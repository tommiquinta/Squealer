
import PrivateChannelView from '../../components/moderators/PrivateChannelView'

export default function PrivChannelsList({channels, hasFilter, byName, byPosts}){

    if(hasFilter){
        return(
            <div className='w-9/12'>
                {channels.filter( channel => {
                    if(byName && byPosts){
                        return channel.creator.toLowerCase().includes(byName.toLowerCase) && channel.num >= byPosts;
                    }
                    if(byName){
                        return channel.creator.toLowerCase().includes(byName.toLowerCase);
                    }
                    if(byPosts){
                        return channel.num >= byPosts;
                    }
                }).map( channel => (<PrivateChannelView key={channel.id} channel={channel}/>))}
            </div>
        );

    }

    return(
        <div className='w-9/12'>
        {channels.map( channel => (<PrivateChannelView key={channel.id} channel={channel}/>))}
        </div>
    );

}
