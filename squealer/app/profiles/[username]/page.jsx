import NavigationBar from '@/app/Components/layout/Navbar';
import ProfilePage from '@/app/Components/profile/ProfilePage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from "next/headers";


async function Username({username}){
   
    const supabase = createServerComponentClient({ cookies });
    const { data: { session }, } = await supabase.auth.getSession();
    if(!session){
        redirect("/");
    }

    //giro immenso per ottenere il profilo
    var headersList = headers();
    var fullurl= headersList.get('referer') || "";
    var broken = fullurl.split('/');
    var index =broken.length -1;
    var profile = broken[index];

    console.log(profile);

    var loggedUserInfo = null;

    try{
        if(! loggedUserInfo){
            loggedUserInfo = await supabase.from('profiles').select('id, username').eq('id', session.user.id)
        }
    } catch(error){
        return(
            <p>Error! {error}</p>
        );
    }
    
    return (
        /*<ProfilePage profile={profile} isMyUser={loggedUserInfo?.data[0]?.username === profile}>
            <NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo?.data[0]?.username}/>
        </ProfilePage>*/
        //<NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo?.data[0]?.username}/>
        <p>{broken.map((br)=> br+"11")} {index}</p>
    );
}


export default Username;