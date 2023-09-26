import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Lougout(){
    const supabase = createServerComponentClient({cookies});

    await supabase.auth.signOut().then(
        redirect("/")
    );

    
}