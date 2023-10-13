import UpdateAvatarBtn from './profile/UpdateAvatarBtn'

export default function Avatar({ url, size, editable, onChange }) {
  let sizeWidth = 'w-12 h-12'

  if (size === 'small') { sizeWidth = 'w-8 h-8' }

  if (size === 'big') { sizeWidth = 'w-24 h-24' }

  if (size === 'medium') { sizeWidth = 'w-20 h-20' }

  return (
    <div className='h-30 flex justify-center items-center relative'>
      <div className={`${sizeWidth} relative rounded-full overflow-hidden`}>
        <div
          className='items-center justify-center'
          style={{
            overflow: 'hidden',
            margin: '0 auto' // Centra orizzontalmente
          }}
        >
          <img
            src={url}
            alt='aggiungi una foto profilo'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {editable && <UpdateAvatarBtn add={'right-[unset]'} />}
    </div>
  )
}
