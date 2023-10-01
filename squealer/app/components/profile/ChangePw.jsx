'use client'

import { useState } from "react";


export default function ChangePw({ changePw }) {

    const [newPassword, setNewPassword] = useState('');

    function handleClick() {
        setNewPassword('');
    }

    return (
        <div className="flex gap-3 items-center">
            <label htmlFor="newPw" className="">Insert your new password:</label>
            <input value={newPassword} name="newPassword" type="password" id="pw" onChange={(e) => setNewPassword(e.target.value)}
                className="shadow-sm shadow-slate-400 rounded-md leading-6 p-1 mr-3" />
            <button type="submit" onClick={handleClick} className="shadow-sm shadow-slate-300 bg-socialBlue w-fit p-2 px-3 rounded text-white self-center">Change your password</button>
        </div>
    );
}