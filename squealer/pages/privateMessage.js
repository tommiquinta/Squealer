import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PrivateMessageForm from '@/app/Components/PrivateMessageForm'
import PrivateMessage from '@/app/Components/PrivateMessage'
import LoginPage from './login'
import Layout from '@/app/Components/Layout'
export default function PrivateMessagePage () {
  const session = useSession()
  const router = useRouter()
  const { username } = router.query
  const [receiver_id, setReceiver_id] = useState()
  const supabase = useSupabaseClient()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchData()
  }, [username]) // Fetch data when username changes

  async function fetchData () {
    try {
      const receiverIdResponse = await supabase
        .from('profiles')
        .select()
        .eq('username', username)

      if (receiverIdResponse.data.length > 0) {
        const receiverId = receiverIdResponse.data[0].id
        setReceiver_id(receiverId)

        // here we get the private message from the db --> the function is listed in the db f

        const { data, error } = await supabase.rpc('get_private_messages', {
          author_uuid: session?.user.id,
          receiver_uuid: receiverId
        })
        if (data.length > 0) {
          setMessages(data)
          console.log(messages[1])
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  if (!session) {
    return <LoginPage />
  }

  return (
    <Layout>
      <PrivateMessageForm onPost={fetchData} receiver={username} />
      {messages.length > 0 &&
        messages.map(message => (
          <PrivateMessage
            key={message?.id}
            {...message}
            author={{
              id: message?.author.id,
              avatar: message?.author.avatar,
              username: message?.author.username
            }}
          />
        ))}
    </Layout>
  )
}
