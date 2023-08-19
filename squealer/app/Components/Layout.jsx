import { Children } from 'react'
import NavigationBar from './NavigationBar'
import postcssConfig from '@/postcss.config'

export default function Layout({ children, hidenavigation }) {

  let rightColumnClasses ='';

  if(hidenavigation){
      rightColumnClasses += 'w-full relative left-25% ';
  } else{
    rightColumnClasses += 'mx-2 relative top-10 md:top-0 md:left-1/4 md:mx-0 md:w-9/12';
  }

  return (
    <div className='md:flex mt-4 max-w-4xl mx-auto gap-6'>
      {!hidenavigation && (
        
          <div className='fixed'>
            <NavigationBar />
          </div>

          //questo deve esistere quando lo schermo è piccolo:
          /*
           <button style={{
          display : 'block' }}>
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="30" height="30" 
          viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" 
            stroke-linecap="round" stroke-miterlimit="10" 
            stroke-width="48" d="M88 152h336M88 256h336M88 360h336"/></svg>
        </button>
           */
        
      )} 
      
      <div className={rightColumnClasses}>
        {children}</div>
    </div>
  )
}
