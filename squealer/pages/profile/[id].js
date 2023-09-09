import { useRouter } from 'next/router';
import ProfilePage from '../Profile.jsx';

export default function Id(){
    const router = useRouter();
    // console.log(router);
    //1:44:57
    return <ProfilePage/>;
}