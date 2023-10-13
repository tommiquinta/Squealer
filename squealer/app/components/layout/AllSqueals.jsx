import PostCard from '../media/PostCard'
import Reaction from '../reaction/Reaction'

export default function AllSqueals ({ squeals, profile, avatar }) {

  return (
    <div className='my-8'>
      {squeals?.length > 0 &&
        squeals?.map(post => (
          <PostCard key={post?.id} post={post}>
            <Reaction
              id={post.id}
              numLikes={post.likes}
              numDislikes={post.dislikes}
              hasLiked={post.hasliked}
              hasDisliked={post.hasdisliked}
              disable={false}
              views={post.views}
              profile={profile}
              avatar={avatar}
            />
          </PostCard>
        ))}
    </div>
  )
}
