import Card from '../Card'
import PublicChannelsWidget from './PublicChannelsWidget'

export default function SideWidget({ publicChannels }) {
  return (
    <Card >
      <h2 className='text-gray-500 text-sm md:text-base'>Public Channels</h2>
      <ul className='flex md:flex-col flex-row text-xs md:text-base'>
        {publicChannels?.map(channel => (
          <li key={channel.id}>
            <PublicChannelsWidget channel={channel} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
