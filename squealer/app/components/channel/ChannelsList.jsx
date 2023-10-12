import Card from '../Card'
import Avatar from '../Avatar'
import Link from 'next/link'

export default function ChannelsList ({ channels, hasFilter, nameFilter }) {
  if (hasFilter && nameFilter != null) {
    return (
      <div className='flex flex-col gap-2 md:w-full'>
        {channels
          ?.filter(channel => {
            return channel.name.toLowerCase().includes(nameFilter.toLowerCase())
          })
          .map(pChannel => (
            <Link href={`/channels/${pChannel.id}`} key={pChannel.id}>
              <Card add={'w-full flex gap-2 items-center'}>
                <Avatar url={pChannel.avatar} size='medium' />
                <div className='flex flex-col gap-1'>
                  <div className='flex gap-3 items-center'>
                    <p className='text-lg font-semibold'>{pChannel.name}</p>
                    <p className='text-slate-500'>
                      §{pChannel.channels.handle}
                    </p>
                  </div>
                  <p className='text-slate-600 break-normal'>
                    {pChannel.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 md:w-full'>
      {channels?.map(pChannel => (
        <Link href={`/channels/${pChannel.id}`} key={pChannel.id}>
          <Card add={'w-full md:w-10/12 flex gap-2 items-center'}>
            <Avatar url={pChannel.avatar} size='medium' />
            <div className='flex flex-col gap-1'>
              <div className='flex gap-3 items-center'>
                <p className='text-lg font-semibold'>{pChannel.name}</p>
                <p className='text-slate-500'>§{pChannel.channels.handle}</p>
              </div>
              <p className='text-slate-600 break-normal'>
                {pChannel.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
