'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function changePassword(formData, username){

    const supabase = createServerComponentClient({ cookies });
    const {newPassword} = Object.fromEntries(formData);
    
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });
    error ? console.log(error) : console.log("Password changed successfully");
    redirect(`/profiles/${username}/allsqueals`);
}