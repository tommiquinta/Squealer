import React from 'react';
import "/styles/personal-style.css";
import { useEffect, useState } from 'react'

export default function Header() {
  const [activeButton, setActiveButton] = useState()

  function select(buttonName) {
    if (activeButton === buttonName) {
      setActiveButton(null); // Disattiva il bottone se è già attivo
    } else {
      setActiveButton(buttonName);
    }
  };


  const classes = 'flex-col h-9 w-1/2 text-sm font-bold flex items-center justify-center text-gray-400 hover:bg-socialBlue/[0.6] hover:text-white cursor pointer'
  const selectedClasses = 'text-socialBlue/[1] hover:text-white '
  
  useEffect(() => {
    //definisco come selezionato il primo bottone
    setActiveButton('forYouBtn');
  }, []);
  
  console.log(activeButton);

return(
    <div id="header" className=' mb-4 -mt-4 bg-white md:my-0 md:w-[38%] md:fixed md:bg-white/[0.8] shadow shadow-gray-300 p-4"'>
      <p id="focus-page" className='text-gray-500 mt-2 mb-0 mx-3 text-xl hidden md:block'>Home</p>
      <div>
        <div className='flex flex-row items-center'>
          <button className={`${classes} border-r-slate-500 ${activeButton === 'forYouBtn' ? selectedClasses : null}`} id="forYouBtn" onClick={() => select('forYouBtn')} >For you
            <div className={`${activeButton === 'forYouBtn' ? 'blueBar': 'hidden'}`}></div>
          </button>

          <button className= {`${classes} ${activeButton === 'followingBtn' ? selectedClasses : null}`} id="followingBtn" onClick={() => select('followingBtn')} >Following
            <div className={`${activeButton === 'followingBtn' ? 'blueBar': 'hidden'}`}></div>
          </button>
        </div>
      </div>
    </div>
);
}
