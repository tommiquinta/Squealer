'use client'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ChangePw from "./ChangePw"


export default function Settings() {
    const supabase = createServerComponentClient();

    async function hanldeClick() {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        }).then(error ? alert(error) : alert("Password changed successfully"));
    }

    return (
        <ChangePw changePw={hanldeClick} />
    );
}