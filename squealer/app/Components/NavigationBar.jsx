
import Card from './Card'
import Link from 'next/link'
import loginPage from '@/pages/login'
import {useRouter} from "next/router"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function NavigationBar () {
  const session = useSession();
  const router = useRouter();
  const {pathname} = router;
  const {asPath} = router;
  var userpage = '';
  if(session){
    userpage = '/profile/' + session.user.id;
  }
  const supabase = useSupabaseClient()
  function logout () {
    supabase.auth.signOut()
  }

  const activePage = 'text-white flex gap-2 py-1 px-2 mx-1 md:gap-2 md:py-3 bg-socialBlue md:-mx-10 md:px-10 rounded-md shadow-md shadow-gray-300 '
  const nonActivePage = 'flex gap-2 mx-2 py-1 px-2 md:py-3 hover:bg-socialBlue hover:bg-opacity-20 md:-mx-10 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110'

  const isGuest = sessionStorage.guest === null ? false : true;

  return (
    
    <Card>
      <div className='px-4 py-2 w-screen md:w-fit '>
        <div className='flex gap-2 leading-9 justify-center mb-3'>
          <img src=".../public/yoshi-logo-empty.png" alt="logo" className='w-6 h-6'></img>
          <h2 className='text-gray-400 text-center text-3xl'>Squealer</h2>
        </div>
        
        <div className='flex gap-4 place-content-center place-items-center md:block '>
        <Link href='/' className={pathname === '/' ? activePage : nonActivePage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={pathname === '/' ? 'white' : 'currentColor'}
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          <p className='hidden md:block'>Home</p>
        </Link>
        {(!isGuest && 
          <div>
        <Link href='/usersList' className={pathname === '/usersList' ? activePage : nonActivePage}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
            />
          </svg>
          <p className='hidden md:block'>Users</p>
        </Link>
        <Link href={userpage} onClick={() => asPath === userpage ? fetchUser() : null} className={asPath === userpage ? activePage : nonActivePage}>
          <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              className="w-6 h-6">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className='hidden md:block'>Your Profile</p>
        </Link>
        <Link href='/' className={nonActivePage}>
        <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              stroke-width="1.5" 
              stroke="currentColor" 
              className="w-6 h-6">
          <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p className='hidden md:block'>Explore</p>
        </Link>
        <Link href='/' className={nonActivePage}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          className="w-6 h-6">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        <p className='hidden md:block'>Notifications</p>
        </Link>
         </div> )}
        <button onClick={logout} className={`${nonActivePage} `}>
          <Link href='#'className='flex gap-2 md:w-32 md:pr-36'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
              />
            </svg>
            <p className='hidden md:block'>Logout</p>
          </Link>
        </button>
        </div>
      </div>
    </Card>
  )
}
