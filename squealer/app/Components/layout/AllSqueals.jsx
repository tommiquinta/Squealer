import PostCard from "../media/PostCard";

export default function AllSqueals({squeals}){

    return(
        <div className='my-8'>
            {squeals?.length > 0 &&
            squeals?.map( post =>  <PostCard key={post?.id} post={post} />)}
        </div>
    );
}