import PostCard from '@/app/Components/PostCard'

export default function AllSqueals({posts}){

    return(
    <div className="my-8">
    {posts?.length > 0 &&
      posts.map(
        (
          post // this is like a foreach to loop through the posts.
        ) => <PostCard key={post.id} {...post} />
      )}
  </div>);
}