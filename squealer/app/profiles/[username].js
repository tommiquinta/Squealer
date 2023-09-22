import { useRouter } from 'next/router';
import ProfilePage from '../Components/profile/ProfilePage';

export default function Id(){
    const router = useRouter();
    console.log(router);

    return (
        <ProfilePage />
    );
}