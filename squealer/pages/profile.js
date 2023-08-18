import Layout from "@/app/Components/Layout";
import Card from "@/app/Components/Card";
import Avatar from "@/app/Components/Avatar";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'


export default function ProfilePage() {
  const session = useSession();

 return(
  <Layout>
    <Card noPadding={true}>
      <div className="relative">
        <div className="h-36 overflow-hidden flex justify-center items-center">
          <img src= "https://plus.unsplash.com/premium_photo-1669029181726-55086b0beeba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="sfondo"></img>
        </div>
        <div className="absolute top-28 left-4">
          <Avatar url={"https:images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"} size={'big'}/>
        </div>
        <div className="p-4 pb-24">
          <div className="ml-28">
            <h1 className="font-bold text-2xl"> 
              Nome Cognome </h1>
            <div className="text-gray-500 leading-4"> Stockholm, Sweden</div>
          </div>
          <div className="mt-10 flex gap-5"> 
            <Link href={"/"} className="">
              Posts
            </Link>
          </div>
        </div>
      </div>
    </Card>
  </Layout>
 );
}