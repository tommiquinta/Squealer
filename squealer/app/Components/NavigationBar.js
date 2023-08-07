import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Card from "./Card";
import Link from "next/link";
import loginPage from "@/pages/login";

export default function NavigationBar(){
    
    const supabase = useSupabaseClient();
    function logout(){
      supabase.auth.signOut();
    }

    return (
         <Card> 
            <div className="px-4 py-2">
            <h2 className='text-gray-400 mb-3'>Navigation</h2>
            <a href="" className="flex gap-2 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home</a>
            <a href="" className="flex gap-2 py-3">Friends</a>
            <a href="" className="flex gap-2 py-3">Saved posts</a>
            <a href="" className="flex gap-2 py-3">Notifications</a>
            <button onClick={logout}>
                <span className="flex gap-2 py-3">
                    Logout
                </span>
            </button>
          </div>
          </Card>

    );
}