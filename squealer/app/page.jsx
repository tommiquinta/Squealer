import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth/auth-components/auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import { data } from "autoprefixer";
// import LikeButton from "./components/reaction/LikeButton";
// import DisLikeButton from "./components/reaction/DisLikeButton";

export default async function Home() {
  // Crea un oggetto supabase utilizzando createServerComponentClient e passa l'oggetto cookies come argomento
  const supabase = createServerComponentClient({ cookies });

  // Ottieni la sessione utente corrente da Supabase
  const { data: { session } } = await supabase.auth.getSession();

  // Se l'utente non ha effettuato l'accesso, reindirizza alla pagina di login
  if (!session) {
    redirect("/login");
  }

  // Ottieni tutti i post con dettagli aggiuntivi come profili utente associati e conteggio dei "mi piace"
  const squeals = await supabase
    .from("posts")
    .select("*")

  console.log(tweets.data);



  // Per ogni post, verifica se l'utente ha messo "mi piace" al post
  // const postsLiked =
  //   data?.map((post) => ({
  //     ...post,
  //     user_has_liked_post: !!post.likes.find(
  //       (like) => like.user_id === session.user.id
  //     ),
  //     likes: post.likes.length,
  //   })) ?? [];

  // Per ogni post nella variabile "squeal", verifica se l'utente ha messo "dislike" al post
  // const postsDisliked =
  //   squeal?.map((post) => ({
  //     ...post,
  //     user_has_disliked_post: !!post.dislikes.find(
  //       (dislike) => dislike.user_id === session.user.id
  //     ),
  //     dislikes: post.dislikes.length,
  //   })) ?? [];

  // Renderizza il componente Home con il pulsante di autenticazione, il componente per creare un nuovo tweet e la lista dei post
  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {squeals.data?.map((post) => (
        <div key={post.id}>
          {post?.profiles?.name} {post?.profiles?.username}
          {post?.content}
          {/* <LikeButton
            postsLiked={postsLiked}
            postsDisliked={postsDisliked}
          />
          <DisLikeButton
            postsLiked={postsLiked}
            postsDisliked={postsDisliked}
          /> */}
        </div>
      ))}
    </>
  );
}
