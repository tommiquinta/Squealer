import Card from '@/app/Components/Card'
import Layout from '@/app/Components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function LoginPage () {
  const supabase = useSupabaseClient()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showLogIn, setShowLogIn] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()

  async function loginWithGoogle () {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  async function signUpWithEmail () {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          avatar_url: avatar
        }
      }
    })

    if (!error) {
      // L'operazione è andata a buon fine, invia l'alert
      alert('A confirm link has been sent to your email!')
    } else {
      // L'operazione ha generato un errore, invia un alert di errore
      alert('An error occured during registration.')
      console.error('Errore durante la registrazione:', error)
    }
  }

  async function signInWithEmail () {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  return (
    <Layout hidenavigation={true}>
      <div className='h-screen flex items-center'>
        <div className='max-w-md mx-auto grow'>
          <h1 className='text-6xl mb-4 text-gray-300 text-center'>
            Login or Signup
          </h1>
          {showLogIn && (
            <Card>
              {/* login with email and password */}
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <button
                onClick={signInWithEmail}
                className='w-full bg-blue-500 text-white p-2 rounded'
              >
                Login
              </button>

              <div className='mt-3 text-center text-gray-500'>
                <p>
                  Don't have an account? Click{' '}
                  <span
                    className='underline cursor-pointer'
                    onClick={() => {
                      setShowSignUp(true),
                        setShowLogIn(false),
                        setEmail(''),
                        setPassword('')
                    }}
                  >
                    here
                  </span>
                  .
                </p>
              </div>
            </Card>
          )}

          {/* signUp module */}
          {showSignUp && (
            <Card>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <input
                type='text'
                placeholder='Avatar URL'
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                className='mb-4 p-2 rounded border w-full'
              />
              <button
                onClick={signUpWithEmail}
                className='w-full bg-green-500 text-white p-2 rounded'
              >
                Sign Up with Email
              </button>
              <div className='mt-3 text-center text-gray-500'>
                <p>
                  Already have an account? Click{' '}
                  <span
                    className='underline cursor-pointer'
                    onClick={() => {
                      setShowSignUp(false),
                        setShowLogIn(true),
                        setEmail(''),
                        setPassword('')
                    }}
                  >
                    here
                  </span>{' '}
                  to log in.
                </p>
              </div>
            </Card>
          )}

          {/* Login and signup with Google */}
          <Card>
            <button
              onClick={loginWithGoogle}
              className='flex gap-5 items-center justify-center'
            >
              <svg
                className='h-8'
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 488 512'
              >
                <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
              </svg>
              Login with Google
            </button>
          </Card>
          {/* end login with Google */}
        </div>
      </div>
    </Layout>
  )
}
