import { useRouter } from 'next/router';
import ProfilePage from '../profile';

export default function Id(){
    const router = useRouter();
    console.log(router);
    //1:44:57
    return <ProfilePage/>;
}