'use client'

import MessageCard from '../messages/MessageCard'
export default function PrivateMessageComtainer ({ squeals, author_uuid }) {
  {
    return squeals.data.map(post => (
      <MessageCard
        key={post.id}
        post={post}
        author_uuid={author_uuid}
      ></MessageCard>
    ))
  }
}
