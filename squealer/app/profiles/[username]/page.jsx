import NavigationBar from '@/app/Components/layout/Navbar';
import ProfilePage from '@/app/Components/profile/ProfilePage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";


/* export const getServerSideProps = async ({query}) =>{

    
    return{
        props: {
            username : query,
            info: loggedUserInfo.data,
        },
    };
} */


export default async function Username({username}){
    const supabase = createServerComponentClient({ cookies });

    const { data: { session }, } = await supabase.auth.getSession();
    const loggedUserInfo = await supabase.from('profiles').select('id, username').eq('id', session.user.id)

    //inserisci controllo session
    return (
        <ProfilePage >
            <NavigationBar hasLoggedIn={true} sessionUsername={loggedUserInfo.data[0].username}/>
        </ProfilePage>
    );
}