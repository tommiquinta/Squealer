import PostCard from './PostCard'
import PublicChannelsPost from './PublicChannelsPost'
import Reaction from '../reaction/Reaction'

export default function PostList ({
  squeals,
  loggedUser,
  hasFilter,
  filterByChannel,
  filterByContent
}) {
  if (hasFilter) {
    return (
      <div className='w-full mt-28 md:mt-0'>
        {squeals
          ?.filter(post => {
            if (!filterByContent) {
              return post.channel_id == filterByChannel
            }
            if (!filterByChannel) {
              return post.content
                .toLowerCase()
                .includes(filterByContent.toLowerCase())
            }

            return (
              post.content
                .toLowerCase()
                .includes(filterByContent.toLowerCase()) &&
              post.channel_id == filterByChannel
            )
          })
          .map(post =>
            post.channel_id != null && post.channel_name != null ? (
              <PublicChannelsPost
                key={post.id}
                post={post}
                disableReaction={false}
                profile={loggedUser.id}
                userAvatar={loggedUser.avatar}
              ></PublicChannelsPost>
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
                  profile={loggedUser.id}
                  avatar={loggedUser.avatar}
                  comment_count={post.comment_count}
                />
              </PostCard>
            )
          )}
      </div>
    )
  }
  return (
    <div className='w-full mt-28 md:mt-0'>
      {squeals?.map(post =>
        post.channel_id != null && post.channel_name != null ? (
          <PublicChannelsPost
            key={post.id}
            post={post}
            disableReaction={false}
            profile={loggedUser.id}
            userAvatar={loggedUser.avatar}
          ></PublicChannelsPost>
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
              avatar={loggedUser.avatar}
              comment_count={post.comment_count}
            />
          </PostCard>
        )
      )}
    </div>
  )
}
