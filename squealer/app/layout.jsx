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
      
      <body className='mx-0 md:mx-[15%] 2xl:mx-[20%] flex flex-col md:flex-row mt-4 gap-9'>
        {children}
      </body>
    </html>
  )
}

