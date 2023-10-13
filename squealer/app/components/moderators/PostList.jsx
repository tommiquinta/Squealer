'use client';
import PostCard from '../media/PostCard'
import PublicChannelsPost from '../media/PublicChannelsPost'
import Reaction from '../reaction/Reaction'
import FowardBtn from './FowardBtn';

export default function PostList ({
  squeals,
  loggedUser,
  hasFilter,
  filterByChannel,
  filterBySender,
  filterDate,
  allChannels
}) {


  if (hasFilter) {
    return (
      <div className='mt-80 md:mt-0'>
        {squeals
          ?.filter(post => {
            var c = new Date(post.created_at);
            var f = new Date(filterDate)

            if (filterByChannel && filterBySender && filterDate) {
              return post.channel_id == filterByChannel && 
                    post.username.toLowerCase().includes(filterBySender.toLowerCase()) &&
                    c < f
            } 
            
            return (filterByChannel != null ? post.channel_id == filterByChannel : true )&& 
                   (filterBySender == '' ? true : post.username.toLowerCase().includes(filterBySender.toLowerCase()))  &&
                   (filterDate == '' ? true : c < f);
            
          })
          .map(post =>
            post.channel_id != null && post.channel_name != null ? (
              <PublicChannelsPost
                key={post.id}
                post={post}
                disableReaction={false}
                profile={loggedUser}
              >
                <FowardBtn post_id={post.id} channelList={allChannels}/>
              </PublicChannelsPost>
            ) : (
              <PostCard key={post.id} post={post}>
                <Reaction
                  id={post.id}
                  numLikes={post.likes}
                  numDislikes={post.dislikes}
                  hasLiked={post.hasliked}
                  hasDisliked={post.hasdisliked}
                  disable={false}
                  views={post.views}
                  profile={loggedUser}
                />
                <FowardBtn post_id={post.id} channelList={allChannels}/>
                
              </PostCard>
            )
          )}
      </div>
    )
  }

  return (
    <div className='mt-80 md:mt-0'>
      {squeals?.map(post =>
        post.channel_id != null && post.channel_name != null ? (
        <PublicChannelsPost
            key={post.id}
            post={post}
            disableReaction={false}
            profile={loggedUser}
          >
            <FowardBtn post_id={post.id} channelList={allChannels}/>
          </PublicChannelsPost>
        ) : (
          <PostCard key={post.id} post={post}>
           
            <Reaction
              id={post.id}
              numLikes={post.likes}
              numDislikes={post.dislikes}
              hasLiked={post.hasliked}
              hasDisliked={post.hasdisliked}
              disable={false}
              views={post.views}
              profile={loggedUser}
            />

            <FowardBtn post_id={post.id} channelList={allChannels}/>

          </PostCard>
        )
      )}
    </div>
  )
}
