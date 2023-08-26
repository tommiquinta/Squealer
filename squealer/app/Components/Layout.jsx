import { Children } from 'react'
import NavigationBar from './NavigationBar'
import postcssConfig from '@/postcss.config'
import PublicChannelsList from './PublicChannelsList'



export default function Layout ({ children, hidenavigation }) {
  return (
    <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 '>
      {!hidenavigation && (
        <div className='fixed'>
          <NavigationBar />
        </div>
      )}
      <div
        className={
          hidenavigation
            ? 'w-full relative left-25%'
            : 'mx-2 relative top-36 md:top-0 md:left-1/4 md:mx-0 md:w-9/12'
        }
      >
        {children}
      </div>
    </div>
  )
}
