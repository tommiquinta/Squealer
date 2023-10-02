import '../styles/globals.css'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Squealer',
  description:
    'La nuova versione di Squealer, il social network per eccellenza.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      {/*   {}
      <head /> */}
      <body className='md:mx-[15%] 2xl:mx-[20%] flex mt-4 gap-9'>
        {children}
      </body>
    </html>
  )
}

/* old layout code, may be useful to restore layout graphics
export default function RootLayout (
  return (
    <html>
      <div className='md:mx-[15%] 2xl:mx-[20%] flex mt-4 gap-9'>{children}</div>
    </html>
  )
}
 */
