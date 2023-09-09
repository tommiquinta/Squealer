import Card from '@/app/Components/Card'
import Layout from '@/app/Components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Preloader from '@/app/Components/Preloader'

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
  const [loading, setLoading] = useState(false) // loading è a true per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader
  const [user, setUser] = useState(null) // user è a null per evitare che venga mostrato il contenuto della pagina prima che venga caricato il componente Preloader


  

  async function loginWithGoogle() {
    async function loginHandler() {
      await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      localStorage.setItem('userId', session.user.id)
      await checkLocalStorage()
      console.log(localStorage)
      console.log(session);
      console.log("terzo porco dio");
    }
    loginHandler()
  }

  async function checkLocalStorage() {
    if (!(localStorage.getItem('userId') === undefined)) {
      console.log("porco dio")
      await supabase
        .from('profiles')
        .select()
        .eq('id', localStorage.getItem('userId'))
        .single()
        .then(result => {
          setUsername(result.data.username)
          console.log(result.data.username);
          console.log("secondo porco dio");
          localStorage.setItem('username', username)
          console.log(localStorage.getItem('username'));
          localStorage.setItem('isLogged', true)
        })
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    if (!email) {
      alert('You can not sign in without an email!')
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
    router.push('/')
  }

  if (loading) {
    return <Preloader />
  }

  async function withoutLoginMode(){
    const { data, error } = await supabase.auth.signInWithPassword({
      email : "guest@squeal.it",
      password : "guest"
    })
    sessionStorage.guest = true;
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

          <p className='text-socialBlue hover:underline cursor-pointer text-center' onClick={(withoutLoginMode)}>Continue without logging...</p>

        </div>
      </div>
    </Layout>
  )
}
