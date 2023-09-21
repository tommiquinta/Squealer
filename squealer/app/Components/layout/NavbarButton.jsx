import Link from "next/link";

function NavbarButton({name, isActive, url, icon}){

    const activePage = 'text-white flex gap-2 py-1 px-2 mx-1 md:gap-2 md:py-3 bg-socialBlue md:-mx-10 md:px-10 rounded-md shadow-md shadow-gray-300 '
    const nonActivePage = 'text-black flex gap-2 mx-2 py-1 px-2 md:py-3 hover:bg-socialBlue hover:bg-opacity-20 md:-mx-10 md:px-10 rounded-md hover:shadow-md shadow-gray-300 transition-all hover:scale-110'


    return(
        <div>
            <Link href={url} className={isActive ? activePage : nonActivePage}>
                {icon}
            <p className='hidden md:block'>{name}</p>
          </Link>
        </div>
    );
}

export default NavbarButton;