import Link from "next/link";
import Avatar from "../Avatar";
import Card from "../Card";
import Cover from "./Cover";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export default async function ProfilePage ({children, profile, isMyUser}) {

    const supabase = createServerComponentClient({cookies});
    var user = await supabase.from('profiles').select('*').eq('username', profile)

    user = user.data[0];
    console.log(user);
 
    return(
       <div className="w-[85%]">
            {children}
           <div className="ml-2 left-1/4 relative">       
                <Card noPadding={true}>
                    <div className='relative'>
                    <div>
                        <Cover
                        url={user?.cover}
                        editable={isMyUser}
                        />
                    </div>
                    <div className='z-20'>
                        <div className='absolute top-28 left-4 '>
                        <Avatar
                            url={user?.avatar}
                            size={'big'}
                            editable={isMyUser}
                            update={() => updateAvatar}
                        />
                        </div>
                        <div className='p-4 pb-2 items-left'>
                        <div className='ml-28'>
                            <h1 className='font-bold text-2xl'>
                            {`${user && user.name} `}
                            </h1>
                            <div className='text-gray-500 leading-4'>
                            {' '}
                            {`@${user && user.username} `}
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='mt-10 flex flex-col gap-0 items-center'>
                            <Link
                                href={'/#squeals'}
                                className={`flex gap-1 px-4 py-1 items-center`}
                            >
                                <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 14 14'
                                >
                                <g
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <rect width='9' height='4' x='1.5' y='1' rx='1' />
                                    <rect width='9' height='4' x='4.5' y='8.5' rx='1' />
                                </g>
                                </svg>
                                Squeals
                            </Link>
                            {/*<div className={`${selected}`}></div>*/}
                            </div>

                            {isMyUser && (
                            <div className='mt-10 place-items-center self-center text-gray-400 float-right'>
                                <p>Remaining Quota: {`${user?.daily_quota}`}</p>
                            </div>
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
                </Card>
                {
                    //TODO: farli comparire solo quando sono nel link #squeals
                }
                <div className='my-8'>
                    {/*posts?.length > 0 &&
                    posts.map(
                        (
                        post // this is like a foreach to loop through the posts.
                        ) => <PostCard key={post.id} {...post} />
                        )*/}
                </div>
         </div>
    </div>
    );
}