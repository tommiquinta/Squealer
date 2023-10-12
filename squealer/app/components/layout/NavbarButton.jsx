'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavbarButton ({ name, url, icon, logout }) {
  var pathname = usePathname()
  var isActive = pathname === url

  const activePage =
    'text-white flex gap-2 py-1 px-2 mx-1 md:gap-2 md:py-3 bg-socialBlue md:-mx-10 md:px-10 rounded-md shadow-md shadow-gray-300 '
  const nonActivePage =
    'text-black flex gap-2 mx-2 py-1 px-2 md:py-3 hover:bg-socialBlue hover:bg-opacity-20 md:-mx-10 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110'

  const supabase = createClientComponentClient()

  async function handleSignOut () {
    await supabase.auth.signOut()
    location.reload()
  }

  if (name == 'Logout') {
    return (
      <button className='nonActivePage flex gap-2 px-2 py-1 md:pl-0 md:mt-2' onClick={handleSignOut}>
        {icon}
        <p className='hidden md:block'>Logout</p>
      </button>
    )
  } else {
    return (
      <Link href={url} className={isActive ? activePage : nonActivePage}>
        {icon}
        <p className='hidden md:block'>{name}</p>
      </Link>
    )
  }
}

export default NavbarButton
