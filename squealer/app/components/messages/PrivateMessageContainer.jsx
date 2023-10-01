'use client'
import PostCard from '../media/PostCard'
export default function PrivateMessageComtainer ({ squeals }) {
  {
    return squeals.data.map(post => (
      <PostCard key={post.id} post={post}></PostCard>
    ))
  }
}
