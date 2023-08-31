import Card from '@/app/Components/Card'
import Layout from '@/app/Components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const supabase = useSupabaseClient()
  const session = useSession()
  const router = useRouter()


  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showLogIn, setShowLogIn] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()
  const [username, setUsername] = useState()


  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    localStorage.setItem('userId', session.user.id)
    checklocalStorage()
    console.log(localStorage)
  }

  async function checklocalStorage() {
    if (session?.user.id) {
      await supabase
        .from('profiles')
        .select()
        .eq('id', localStorage.getItem('userId'))
        .single()
        .then(result => {
          setUsername(result.data.username)
          localStorage.setItem('username', username)
          localStorage.setItem('isLogged', true)
        })
    }
  }

  async function signUpWithEmail() {
    if (!email) {
      alert('You can not sign in without an eamil!')
      return
    }
    if (!email.includes('@') && (!email.includes('.com') || !email.includes('.it'))) {
      alert('Please insert a valid email adress.')
      return
    }
    if (!username) {
      alert('You must choose an handler for your profile.')
      return
    }
    if (username.length < 4) {
      alert('Please insert an at least 4 carachters username long.')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          avatar_url: avatar,
          username: username
        }
      }
    })

    if (!error) {
      alert('A confirmation link has been sent to your email!')
    } else {
      alert('An error occured during registration.')
      console.error('Errore durante la registrazione:', error)
    }
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    localStorage.setItem('username', username)
    localStorage.setItem('userId', session.user.id)
    router.push('/userlist')
  }

  return (
    <Layout hidenavigation={true}>
      <div className='h-screen flex items-center'>
        <div className='max-w-md mx-auto grow'>
          <h1 className='text-4xl mb-4 text-gray-300 text-center font-sans'>
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
                  Do not have an account? Click{' '}
                  <span
                    className='underline cursor-pointer ml-1'
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
                placeholder='@username'
                value={username}
                onChange={e => setUsername(e.target.value)}
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
              className='flex gap-5 items-center text-center'
            >
              <svg
                className='h-8'
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 488 512'
              >
                <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
              </svg>
              Continue with Google
            </button>
          </Card>
          {/* end login with Google */}

          {/* Login and signup with GitHub */}
          {/*  <Card>
            <button
              onClick={loginWithGithub}
              className='flex gap-5 items-center text-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
              Continue with Github
            </button>
          </Card> */}
          {/* end login with GitHub */}
        </div>
      </div>
    </Layout>
  )
}
