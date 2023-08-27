import React from 'react';
import "/styles/personal-style.css";
import { useEffect, useState } from 'react'

export default function Header({updatePost}) {

  const [following, setFollowing] = useState(false);

  const classes = 'flex-col h-9 w-1/2 text-sm font-bold flex items-center justify-center text-gray-400 hover:bg-socialBlue/[0.6] hover:text-white cursor pointer'
  const selectedClasses = 'text-socialBlue/[1] hover:text-white ';

  function handleButton() {
    if(following){
      setFollowing(false);
      updatePost(false);
    } else {
      setFollowing(true);
      updatePost(true);
    }
  }
  
    return(
      <div id="header" className=' mb-4 -mt-4 bg-white md:my-0 md:w-[38%] md:fixed md:bg-white/[0.8] shadow shadow-gray-300 p-4"'>
        <p id="focus-page" className='text-gray-500 mt-2 mb-0 mx-3 text-xl hidden md:block'>Home</p>
        <div>
          <div className='flex flex-row items-center'>
            <button className={`${classes} border-r-slate-500 ${following == false ? selectedClasses : null}`} id="forYouBtn" 
                  onClick={() => handleButton()} > For you
              <div className={`${following == false ? 'blueBar' : 'hidden'}`}></div>
            </button>
  
            <button className= {`${classes} ${following  == true ? selectedClasses : null}`} id="followingBtn" 
                  onClick={() => handleButton()} >Following
              <div className={`${following == true ? 'blueBar': 'hidden'}`}></div>
            </button>
          </div>
        </div>
      </div>
    );

  

}
