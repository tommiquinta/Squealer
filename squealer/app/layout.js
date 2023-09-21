import '@/styles/globals.css'


export const metadata = {
  title: 'Squealer',
  description: 'La nuova versione di Squealer, il social network per eccellenza.'
}
export default function RootLayout ({ children }) {
  return (
    <html>
      <body>
        <div className='mx-[25%]'>
          {children}
        </div>
      </body>
    </html>
  )
}
