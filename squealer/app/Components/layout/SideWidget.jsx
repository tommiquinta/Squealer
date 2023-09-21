import Card from '../Card';
import PublicChannelsWidget from './PublicChannelsWidget'

export default function SideWidget({ publicChannels }) {
    console.log(publicChannels);
  return (
    <Card>
      <h2 className='text-gray-500'>Public Channels</h2>
      <ul>
        {publicChannels.map(channel => (
          <li key={channel.id}>
            <PublicChannelsWidget channel={channel}/>
          </li>
        ))}
      </ul>
    </Card>
  )
}