import '@/styles/globals.css'


export const metadata = {
  title: 'Squealer',
  description: 'La nuova versione di Squealer, il social network per eccellenza.'
}
export default function RootLayout ({ children }) {
  return (
    <html>
      <body>
      <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 '>
        <div className={'mx-2 relative top-36 md:top-0  md:mx-0 md:w-9/12 md:left-1/4'}>

          {children}

        </div>
      </div>
      </body>
      </html>
  )
}
