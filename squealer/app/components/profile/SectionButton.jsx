'use client'

import { BrowserRouter, Link } from 'react-router-dom'

export default function SectionButton({ name, destination, icon, isSelected }) {
  const selected = 'bg-blue w-[5px]'

  return (
    <div className='mt-10 flex flex-col gap-0 items-center'>
      <Link
        to={`${destination}`}
        className={`flex gap-1 px-4 py-1 items-center`}
      >
        {icon}
       <p className='hidden md:block'> {name} </p>
      </Link>
      <div className={isSelected ? `${selected}` : null}></div>
    </div>
  )
}
