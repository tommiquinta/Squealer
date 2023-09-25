import NavigationBar from '@/app/Components/layout/Navbar';
import ProfilePage from '@/app/Components/profile/ProfilePage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


async function Username({ params }){
   
    const supabase = createServerComponentClient({ cookies });
    const { data: { session }, } = await supabase.auth.getSession();
    if(!session){
        redirect("/");
    }

    //prendo l'username per creare la pagina profilo
    var profile = params.username;
    var loggedUserInfo = null;

    try{
        if(! loggedUserInfo){
            loggedUserInfo = await supabase.from('profiles').select('id, username').eq('id', session.user.id);
            loggedUserInfo = loggedUserInfo?.data[0]?.username;
        }
    } catch(error){
        return(
            <p>Error! {error}</p>
        );
    }
    

    return (
        <ProfilePage profile={profile} isMyUser={loggedUserInfo === profile}>
            <NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo}/>
        </ProfilePage>
    );
}


export default Username;