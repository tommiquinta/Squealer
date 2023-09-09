import Card from './Card'
import Link from 'next/link'

export default function PublicChannelsList ({ publicChannels }) {
  return (
    <Card>
      <h2 className='text-gray-500'>Public Channels</h2>
      <ul>
        {publicChannels.map(channel => (
          <li key={channel.id}>
            <div className='items-center'>
              <Link
                href={`/Channel?channelId=${channel.id}`}
                className='flex gap-2 py-3 px-2 h-15 rounded-sm shadow-sm'
              >
                {channel.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
