'use client'

import Avatar from '../../components/Avatar'
import Card from '../../components/Card'
import Cover from './Cover'
import SectionButton from './SectionButton'
import DestinationRoutes from '../layout/DestinationRoutes'
import { BrowserRouter } from 'react-router-dom'

export default function ProfileContainer ({
  squeals,
  profile,
  user,
  isMyUser,
  isModerator
}) {
  const username = user?.username
  const basename = '/profiles/' + username
  const avatar = user?.avatar

  return (
    <div className='ml-2 md:ml-6 md:left-1/4 relative'>
      <BrowserRouter>
        <Card noPadding={true}>
          <div className='relative'>
            <div>
              <Cover url={user?.cover} editable={isMyUser} />
            </div>
            <div className='z-20'>
              <div className='absolute top-28 left-4 '>
                <Avatar
                  url={user?.avatar}
                  size={'big'}
                  editable={isMyUser}
                  update={() => updateAvatar}
                />
              </div>
              <div className='p-4 pb-2 items-left'>
                <div className='ml-28'>
                  <h1 className='font-bold text-2xl'>
                    {`${user && user.name} `}
                  </h1>
                  <div className='text-gray-500 leading-4'>
                    {' '}
                    {`@${user && user.username} `}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <SectionButton
                    name={'Squeals'}
                    isSelected={true}
                    destination={basename + '/allsqueals'}
                    icon={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 14 14'
                      >
                        <g
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect width='9' height='4' x='1.5' y='1' rx='1' />
                          <rect width='9' height='4' x='4.5' y='8.5' rx='1' />
                        </g>
                      </svg>
                    }
                  />

                  {isMyUser && (
                    <SectionButton
                      name={'Private Channels'}
                      isSelected={false}
                      destination={basename + '/channels'}
                      icon={
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                        >
                          <path
                            fill='currentColor'
                            d='M17.75 3a3.25 3.25 0 0 1 3.245 3.066L21 6.25v11.5a3.25 3.25 0 0 
                                1-3.066 3.245L17.75 21H6.25a3.25 3.25 0 0 1-3.245-3.066L3 17.75V9.372a2.247 2.247 0 0 0 1.5 
                                0v8.378a1.75 1.75 0 0 0 1.607 1.744l.143.006h11.5a1.75 1.75 0 0 0 1.744-1.607l.006-.143V6.25a1.75 
                                1.75 0 0 0-1.606-1.744L17.75 4.5H6.25c-.6 0-1.13.302-1.445.763a2.234 2.234 0 0 0-1.581-.201a3.253 
                                3.253 0 0 1 2.842-2.057L6.25 3h11.5Zm-4.504 10.003a.75.75 0 0 1 .102 1.493l-.102.007H8.748a.75.75 
                                0 0 1-.102-1.493l.102-.007h4.498Zm2.006-3.507a.75.75 0 0 1 .102 1.493l-.102.007H8.748a.75.75 0 0 
                                1-.102-1.493l.102-.007h6.504ZM3.75 6a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5Z'
                          />
                        </svg>
                      }
                    />
                  )}

                  {isMyUser && (
                    <SectionButton
                      name={'Settings'}
                      isSelected={false}
                      destination={basename + '/settings'}
                      icon={
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                        >
                          <g
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'
                          >
                            <circle cx='12' cy='12' r='3' />
                            <path
                              d='M13.765 2.152C13.398 2 12.932 2 12 2c-.932 0-1.398 0-1.765.152a2 2 0 0 
                                0-1.083 1.083c-.092.223-.129.484-.143.863a1.617 1.617 0 0 1-.79 1.353a1.617 1.617 
                                0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 
                                6.193 3.34 7c-.466.807-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 
                                1.361c0 .558-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 
                                1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.617 1.617 0 0 1 
                                1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22c.932 
                                0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.617 1.617 0 
                                0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453c.466-.807.7-1.21.751-1.605a2 
                                2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.617 1.617 0 0 1 19.562 
                                12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 
                                0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.617 
                                1.617 0 0 1-1.566-.008a1.617 1.617 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z'
                            />
                          </g>
                        </svg>
                      }
                    />
                  )}

                  {isModerator && (
                    <SectionButton
                      name={'Moderator'}
                      isSelected={false}
                      destination={basename + '/moderator'}
                      icon={
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='24'
                          viewBox='0 0 256 256'
                          strokeWidth='1.5'
                        >
                          <path
                            fill='currentColor'
                            d='M208 36H48a20 20 0 0 0-20 20v58.8c0 92.36 78.1 123 93.76 128.18a19.6 19.6 0 0 0 12.48 0C149.9 237.78 
                            228 207.16 228 114.8V56a20 20 0 0 0-20-20Zm-4 78.8c0 73.56-60.53 99.53-76 105c-15.47-5.42-76-31.39-76-104.95V60h152Z'
                          />
                        </svg>
                      }
                    />
                  )}

                  {isMyUser && (
                    <div className='mt-10 place-items-center self-center text-gray-400 float-right'>
                      <p>Remaining Quota: {`${user?.daily_quota}`}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <DestinationRoutes
          user={basename}
          squeals={squeals.data}
          isMyUser={isMyUser}
          profile={profile}
          avatar={avatar}
        />
      </BrowserRouter>
    </div>
  )
}
