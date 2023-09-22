//pagina che visualizza l'elenco di tutti gli utenti
//vecchia userList
import { useSession} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import UsersList from '../Components/profile/UsersList'

function UsersListPage() {
  const session = useSession()
  const router = useRouter()

  var loggedUser = null;

    if (session) {
        loggedUser = session.user.id;
        console.log("loggedUser "+ loggedUser);
    } else {
        router.push('/login')
    }

  return (
      <UsersList userId={loggedUser}/>
  )
}

export default UsersListPage;
