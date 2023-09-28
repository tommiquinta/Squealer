import Link from 'next/link'

export default function PublicChannelsWidget ({ channel }) {
  return (
    <div className='items-center'>
        <Link
        href={`/Channel?channelId=${channel.id}`}
        className='flex gap-2 py-3 px-2 h-15 rounded-sm shadow-sm'
        >
        {channel.name}
        </Link>
    </div>
  )
}