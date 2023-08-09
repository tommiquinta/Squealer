import { Children } from 'react'
import NavigationBar from './NavigationBar'
import postcssConfig from '@/postcss.config'

export default function Layout({ children, hidenavigation }) {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      {!hidenavigation && (
        
          <div className='w-3/12'>
            <NavigationBar />
          </div>
        
      )}
      <div className={hidenavigation ? 'w-full' : 'w-9/12'}>{children}</div>
    </div>
  )
}
