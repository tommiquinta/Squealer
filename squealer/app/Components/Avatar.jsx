export default function Avatar ({ url, size }) {
  let width = '75px'
  let height = '75px'

  if (size == 'big') {
    width = '110px'
    height = '110px'
  }

  return (
    <div className='relative rounded-full overflow-hidden'>
      <div
        style={{
          width: width,
          height: height,
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto' // Centra orizzontalmente
        }}
      >
        <img
          src={url}
          alt=''
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
