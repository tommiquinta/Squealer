//pagina che visualizza l'elenco di tutti gli utenti
//vecchia userList
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UsersList from '../Components/profile/UsersList'
import Layout from "../layout";
import NavigationBar from "../Components/layout/Navbar";

async function UsersListPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session },
  } = await supabase.auth.getSession();

  var userId = null;
  if (session) {
      userId= session.user.id;
  } else {
    redirect("/");
  }

  const profiles = await supabase.from('profiles').select('id, name, avatar, username').neq('id', userId);
  const username = await supabase.from('profiles').select('username').eq('id', userId);
  
    return (
      <Layout>
        <NavigationBar hasLoggedIn={true} sessionUsername={username.data[0].username}/>
        <UsersList profiles={profiles.data}/>
      </Layout>
    );
}

export default UsersListPage;
