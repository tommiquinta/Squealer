'use client'
import ChangePw from "./ChangePw"
import {changePassword} from '../../../helper/settingsServerActions';
import { usePathname } from "next/navigation";

export default function Settings() {

    const path = usePathname();
    const username = path.split('/')[2];

    async function handleClick(newPw) {
        const result =await changePassword(newPw);
    }

    return (
        <form action={handleClick} className="p-3 gap-3 flex-column">
            <p className="m-1 text-center text-slate-400">{username}&apos;s settings:</p>
            <hr className="my-3"/>
            <ChangePw/>
        </form>
    );
}