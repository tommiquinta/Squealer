import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth/auth-components/auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import LikeButton from "./components/reaction/LikeButton";
import DisLikeButton from "./components/reaction/DisLikeButton";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("posts")
    .select("*, profiles(*), likes(*)");

  const postsLiked =
    data?.map((post) => ({
      ...post,
      user_has_liked_post: !!post.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: post.likes.length,
    })) ?? [];

  const postsDisliked =
    data?.map((post) => ({
      ...post,
      user_has_disliked_post: !!post.dislikes.find(
        (dislike) => dislike.user_id === session.user.id
      ),
      dislikes: post.dislikes.length,
    })) ?? [];

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {posts?.map((post) => (
        <div key={post.id}>
          {post?.profiles?.name} {post?.profiles?.username}
          {post?.content}
          <LikeButton
            postsLiked={postsLiked}
            postsDisliked={postsDisliked}
          />
          <DisLikeButton
            postsLiked={postsLiked}
            postsDisliked={postsDisliked}
          />
        </div>
      ))
      }
    </>
  );
}