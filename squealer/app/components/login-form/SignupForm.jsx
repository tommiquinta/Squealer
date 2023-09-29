import { useState } from "react";
import Card from "../Card";

export default function SignUpForm({ signUp }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');

    function handleBtn() {
        signUp(email, username, password, avatar, fullname);

        setEmail('');
        setPassword('');
        setFullname('');
    }

    const style = "shadow-sm shadow-slate-400 rounded-md leading-8 p-1 px-2 mb-2";

    return (
        <Card >
            <form className="flex flex-col py-4 px-8 gap-2">
                <label htmlFor="fullname" className="text-gray-500">Insert your full name:</label>
                <input value={fullname} type="text" id="fullname" onChange={(e) => setFullname(e.target.value)}
                    className={style} placeholder="Name Lastname" />

                <label htmlFor="email" className="text-gray-500">Insert your email:</label>
                <input value={email} type="text" id="email" onChange={(e) => setEmail(e.target.value)}
                    className={style} placeholder="Email" />

                <label htmlFor="email" className="text-gray-500">Insert your username:</label>
                <input value={username} type="text" id="username" onChange={(e) => setUsername(e.target.value)}
                    className={style} placeholder="Username" />

                <label htmlFor="password" className="text-gray-500">Insert your password:</label>
                <input value={password} type="password" id="pw" onChange={(e) => setPassword(e.target.value)}
                    className={style} placeholder="Password" />

                <label htmlFor="avatar" className="text-gray-500">Insert avatar url:</label>
                <input value={avatar} type="text" id="avatar" onChange={(e) => setAvatar(e.target.value)}
                    className={style} placeholder="Avatar URL" />

                <button type="button" onClick={handleBtn} className="shadow-sm shadow-slate-300 bg-socialBlue w-fit p-2 px-3 mt-3 -mb-3 rounded text-white self-center">Sing Up</button>
            </form>
        </Card>
    );
}