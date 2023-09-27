"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect, useRouter } from "next/navigation"
import Card from '../../components/Card';
import LoginForm from '../../components/login-form/LoginForm';
import { useState } from "react";
import SignUpForm from '../../components/login-form/SignupForm';

export default function AuthButtonClient({ session }) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [showLogIn, setShowLogin] = useState(true);

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    const handleProviderSignIn = async (provider) => {
        await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            }
        })
    }

    async function signUpWithEmail(email, username, password, avatar, fullname ) {
        if (!email) {
            alert('You can not sign in without an email!')
            return
        }
        if (!email.includes('@') && (!email.includes('.com') || !email.includes('.it'))) {
            alert('Please insert a valid email adress.')
            return
        }
        if (!username) {
            alert('You must choose an handler for your profile.')
            return
        }
        if (username.length < 4) {
            alert('Please insert an at least 4 carachters username long.')
            return
        }
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullname,
                    avatar_url: avatar,
                    username: username
                }
            }
        }) 

        if(error){
            alert(error);
        }

    }

    async function login(email, pw){
        if((!email) || (!pw)){
            alert("Insert your credentials please")
            return ; //probabilmente dovrebbe mostrare errore
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pw,
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            }
        });

        if(error){
            alert(error);
        }


    }

    if(session){
        return (<button onClick={handleSignOut}>Logout</button>);
    }



    return (
        <div className="flex-col gap-2.5 items-center justify-center w-8/12 h-full mx-auto">
            <h1 className="text-5xl subpixel-antialiased font-medium text-center text-gray-400 my-2 mt-20">Login or Signup</h1>

            { showLogIn && (
                <div className="py-3 w-10/12 mx-auto">
                    <LoginForm logIn={login}/>
                    <p onClick={()=> setShowLogin(false)} className="text-gray-400 text-center">You don't have an account? <u className="cursor-pointer text-socialBlue">Click here to sign up</u></p>
                </div>

            )

            }
            {!showLogIn && (
            <div className="py-3 w-10/12 mx-auto">
                <SignUpForm signUp={signUpWithEmail}/>
                <p onClick={()=> setShowLogin(true)} className="text-gray-400 text-center">Do you have an account already? <u className="cursor-pointer text-socialBlue">Click here to log in</u></p>
            </div>
            )

            }    

            <div className="flex gap-2 justify-center">
            <Card className="w-fit">
                <button
                    onClick={() => handleProviderSignIn("github")}
                    className='flex gap-5 items-center text-center text-stone-600'
                >
                    <svg
                        className='h-8'
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 24 24'
                    >
                        <path d='M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.206 11.385.6.111.82-.261.82-.58 0-.285-.01-1.04-.015-2.037-3.338.726-4.042-1.562-4.042-1.562-.547-1.387-1.332-1.758-1.332-1.758-1.088-.743.083-.728.083-.728 1.204.084 1.838 1.238 1.838 1.238 1.07 1.833 2.811 1.303 3.495.996.109-.776.418-1.303.761-1.603-2.665-.303-5.466-1.332-5.466-5.93 0-1.312.465-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.18 0 0 1.007-.324 3.3 1.23.957-.267 1.983-.399 3.004-.403 1.02.004 2.047.136 3.004.403 2.29-1.554 3.295-1.23 3.295-1.23.652 1.656.24 2.877.117 3.18.772.84 1.233 1.908 1.233 3.22 0 4.608-2.805 5.623-5.474 5.922.431.371.814 1.103.814 2.222 0 1.604-.014 2.898-.014 3.292 0 .32.216.697.826.577C20.566 21.797 24 17.3 24 12c0-6.628-5.372-12-12-12z' fill='#000' />
                    </svg>
                    Login with GitHub
                </button>
            </Card>

            <Card className="w-fit">
                <button
                    onClick={() => handleProviderSignIn("google")}
                    className='flex gap-5 items-center text-center text-stone-600'
                >
                    <svg
                        className='h-8'
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 488 512'
                    >
                        <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
                    </svg>
                    Login with Google
                </button>
            </Card>
            </div>
        </div >

    )
}