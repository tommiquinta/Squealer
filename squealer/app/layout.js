import '@/styles/globals.css'


export const metadata = {
  title: 'Squealer',
  description: 'La nuova versione di Squealer, il social network per eccellenza.'
}
export default function RootLayout ({ children }) {
  return (
    <html>
      <body>
        <div className='md:mx-[20%] flex mt-4 gap-6'>
          {children}
        </div>
      </body>
    </html>
  )
}
