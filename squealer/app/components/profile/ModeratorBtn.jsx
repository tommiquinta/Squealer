'use client';

import Link from "next/link";


export default function ModeratorBtn(){

    return(
        <div className="w-full text-center my-8">
            <Link href="/moderators" replace className="shadow-sm shadow-slate-300 bg-socialBlue w-fit p-3 rounded text-white self-center mx-auto">
                Go to your Moderator Section</Link>
        </div>
    )
}