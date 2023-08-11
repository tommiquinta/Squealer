import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PrivateMessageForm from '@/app/Components/PrivateMessageForm'
import PrivateMessage from '@/app/Components/PrivateMessage'
import LoginPage from './login'
import Layout from '@/app/Components/Layout'

export default function PrivateMessagePage() {
  const session = useSession()
  const router = useRouter()
  const { username } = router.query
  const [receiver_id, setreceiver_id] = useState()
  const [messages, setMessages] = useState([])
  const supabase = useSupabaseClient()

  useEffect(() => {
    fetchreceiver_id()
    fetchMessages()
  }, [username]) // Fetch messages when username changes

  function fetchreceiver_id() {
    supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .then(result => {
        if (result.data.length) {
          setreceiver_id(result.data[0].id)
        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error)
      })
  }

  function fetchMessages() {
    if (session && receiver_id) {
      supabase
        .from('direct_messages')
        .select('id, content, created_at, author, receiver')
        .eq('author', session.user.id)
        .eq('receiver', receiver_id)
        .order('created_at', { ascending: false })
        .then(result => {
          //console.log('Message result:', result)
          setMessages(result.data)
        })
        .catch(error => {
          console.error('Error fetching messages:', error)
        })
    }
  }

  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout>
      <PrivateMessageForm onPost={fetchMessages} receiver={username} />
      {/* {messages.length > 0 && messages.map(message => (
        <PrivateMessage key={message.id} {...message} />
      ))} */}
    </Layout>
  )
}
