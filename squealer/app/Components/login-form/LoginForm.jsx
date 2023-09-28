import { useState } from "react";
import Card from "../Card";

export default function LoginForm({ logIn }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleLogin(){
        logIn(email, password);

        setEmail('');
        setPassword('');
    }


    return(
       <Card >
        <form className="flex flex-col py-4 px-8 gap-2.5">
            <label htmlFor="email" className="text-gray-500">Insert your email:</label>
            <input value={email} type="text" id="email" onChange={(e) => setEmail(e.target.value)} 
            className="shadow-sm shadow-slate-400 rounded-md leading-8 p-1"/>

            <label htmlFor="password" className="text-gray-500">Insert your password:</label>
            <input value={password} type="password" id="pw" onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm shadow-slate-400 rounded-md leading-8 p-1"/>

            <button type="button" onClick={handleLogin} className="shadow-sm shadow-slate-300 bg-socialBlue w-fit p-2 px-3 mt-3 -mb-3 rounded text-white self-center">Login</button>
        </form>
       </Card>
    );
}