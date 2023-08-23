import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Preloader from "./Preloader";
import { uploadPhoto } from "./Helpers/uploadPhotos";

export default function Cover({url, editable, onChange}){
    const session = useSession();
    const supabase = useSupabaseClient();
    const [isUploading, setIsUploading] = useState(false);

    async function updateCover(ev){
        const file = ev.target.files?.[0];
        if(file){
            setIsUploading(true);
            await uploadPhoto(supabase, session.user.id, "covers", "cover_photo", file);
            setIsUploading(false);
            if(onChange) onChange();
        }
    }


    return(
        <div className="h-36 overflow-hidden flex justify-center items-center">
            <div>
                <img src= {url} alt="sfondo"></img>
            </div>
            {isUploading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center z-10">
                    <div className="inline-block mx-auto">
                        <Preloader />
                    </div>
                    
                </div>
            )

            }
            { editable && (
                <div className="absolute right-0 bottom-36 m-2 mb-4">
                    <label className="bg-white py-1 px-2 rounded-md shadow-md shadow-black flex gap-1 text-xs items-center">
                        <input type="file" onChange={updateCover} className="hidden"/>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>

                        Change cover imagine</label>
                </div>
           )}
        </div>
    );
}